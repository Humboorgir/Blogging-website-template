import { ArticleEditor } from '@/components/article-editor'
import { getPost } from '@/lib/field-notes'

export default async function ArticleEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ArticleEditor post={getPost(slug)} />
}
