'use server'

import { db } from '@/lib/db'
import { getUserId } from '@/lib/utils'
import { CreatePostSchema } from '@/schemas/posts'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
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
