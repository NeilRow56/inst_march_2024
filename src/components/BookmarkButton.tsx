'use client'

import { PostWithExtras } from '@/lib/definitions'
import { cn } from '@/lib/utils'
import ActionIcon from '@/components/ActionIcon'
import { SavedPost } from '@prisma/client'
import { Bookmark } from 'lucide-react'
// ts-ignore because experimental_useOptimistic is not in the types
// @ts-ignore
import { experimental_useOptimistic as useOptimistic } from 'react'
import { bookmarkPost } from '@/actions/post-actions'

type Props = {
  post: PostWithExtras
  userId?: string
}

function BookmarkButton({ post, userId }: Props) {
  const predicate = (bookmark: SavedPost) =>
    bookmark.userId === userId && bookmark.postId === post.id
  const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic<
    SavedPost[]
  >(
    post.savedBy,
    // @ts-ignore
    (state: SavedPost[], newBookmark: SavedPost) =>
      state.find(predicate)
        ? //   here we check if the bookmark already exists, if it does, we remove it, if it doesn't, we add it
          state.filter((bookmark) => bookmark.userId !== userId)
        : [...state, newBookmark]
  )

  return (
    <form
      action={async (formData: FormData) => {
        const postId = formData.get('postId')
        addOptimisticBookmark({ postId, userId })
        await bookmarkPost(postId)
      }}
      className="ml-auto"
    >
      <input type="hidden" name="postId" value={post.id} />

      <ActionIcon>
        <Bookmark
          className={cn('h-6 w-6', {
            'fill-black dark:fill-white': optimisticBookmarks.some(predicate),
          })}
        />
      </ActionIcon>
    </form>
  )
}

export default BookmarkButton
