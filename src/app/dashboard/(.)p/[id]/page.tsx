import PostView from '@/components/Postview'

import { fetchPostById } from '@/lib/data'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}
// params: {id} is the name of the p/[id]
async function PostModal({ params: { id } }: Props) {
  const post = await fetchPostById(id)

  if (!post) {
    notFound()
  }

  return <PostView id={id} post={post} />
}

export default PostModal
