import Image from 'next/image'
import Link from 'next/link'

import { Card } from './ui/card'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PostWithExtras } from '@/lib/definitions'
import UserAvatar from './UserAvatar'
import Timestamp from './Timestamp'
import PostOptions from './PostOptions'

async function Post({ post }: { post: PostWithExtras }) {
  const session = await getServerSession(authOptions)

  const userId = session?.user?.id

  const username = post.user.firstName

  if (!session?.user) return null

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex items-center space-x-3">
          <UserAvatar user={post.user} />
          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold">{username}</span>
              <span
                className="text-xs font-medium text-neutral-500
                    dark:text-neutral-400
                  "
              >
                •
              </span>
              <Timestamp createdAt={post.createdAt} />
            </p>
            <p className="text-xs font-medium text-black dark:text-white">
              Dubai, United Arab Emirates
            </p>
          </div>
        </div>

        <PostOptions post={post} userId={userId} />
      </div>

      <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
        <Image
          src={post.fileUrl}
          alt="Post Image"
          fill
          className="object-cover sm:rounded-md"
        />
      </Card>

      {post.caption && (
        <div className="flex items-center space-x-2 px-3 text-sm font-medium leading-none sm:px-0">
          <Link href={`/dashboard/${username}`} className="font-bold">
            {username}
          </Link>
          <p>{post.caption}</p>
        </div>
      )}
    </div>
  )
}

export default Post
