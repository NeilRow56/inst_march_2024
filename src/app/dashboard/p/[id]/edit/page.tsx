import { fetchPostById } from '@/lib/data'

import { notFound } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}

async function EditPostPage({ params: { id } }: Props) {
  const post = await fetchPostById(id)

  if (!post) {
    notFound()
  }

  return <div>Edit Post</div>
}

export default EditPostPage
