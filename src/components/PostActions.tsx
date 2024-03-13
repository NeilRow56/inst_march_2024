import { PostWithExtras } from '@/lib/definitions'
import { cn } from '@/lib/utils'
import ActionIcon from '@/components/ActionIcon'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import LikeButton from './LikeButton'

type Props = {
  post: PostWithExtras
  userId?: string
  className?: string
}

function PostActions({ post, userId, className }: Props) {
  return (
    <div className={cn('relative flex w-full items-start gap-x-2', className)}>
      <LikeButton post={post} userId={userId} />
      <Link href={`/dashboard/p/${post.id}`}>
        <ActionIcon>
          <MessageCircle className={'h-6 w-6'} />
        </ActionIcon>
      </Link>
    </div>
  )
}

export default PostActions
