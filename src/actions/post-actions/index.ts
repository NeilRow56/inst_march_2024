'use server'

import { db } from '@/lib/db'
import { getUserId } from '@/lib/utils'
import { CreatePostSchema, DeletePostSchema, LikeSchema } from '@/schemas/posts'
import { revalidatePath } from 'next/cache'
import * as z from 'zod'

export const createPost = async (values: z.infer<typeof CreatePostSchema>) => {
  const userId = await getUserId()

  const validatedFields = CreatePostSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Post.',
    }
  }

  const { fileUrl, caption } = validatedFields.data

  await db.post.create({
    data: {
      caption,
      fileUrl,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })

  return { success: 'Successfully created post' }
}

export async function deletePost(formData: FormData) {
  const userId = await getUserId()

  const { id } = DeletePostSchema.parse({
    id: formData.get('id'),
  })

  const post = await db.post.findUnique({
    where: {
      id,
      userId,
    },
  })

  if (!post) {
    throw new Error('Post not found')
  }

  try {
    await db.post.delete({
      where: {
        id,
      },
    })
    revalidatePath('/dashboard')
    return { message: 'Deleted Post.' }
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Post.' }
  }
}

export async function likePost(value: FormDataEntryValue | null) {
  const userId = await getUserId()

  const validatedFields = LikeSchema.safeParse({ postId: value })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Like Post.',
    }
  }

  const { postId } = validatedFields.data

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!post) {
    throw new Error('Post not found')
  }

  const like = await db.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  })

  if (like) {
    try {
      await db.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      })
      revalidatePath('/dashboard')
      return { message: 'Unliked Post.' }
    } catch (error) {
      return { message: 'Database Error: Failed to Unlike Post.' }
    }
  }

  try {
    await db.like.create({
      data: {
        postId,
        userId,
      },
    })
    revalidatePath('/dashboard')
    return { message: 'Liked Post.' }
  } catch (error) {
    return { message: 'Database Error: Failed to Like Post.' }
  }
}