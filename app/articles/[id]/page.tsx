import { articles } from "../../data/articles";
import Mapping from "../../mapping";

interface Props {
  params: { id: string };
}

export default function ArticlePage({ params }: Props) {
  const article = articles.find(a => a.id === params.id);

  if (!article) {
    return <h1 className="text-center mt-10 text-red-600">Article not found</h1>;
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-700">{article.content}</p>
      {article.hasMap ? <Mapping article={article} /> 
      : ''}
    </main>
  );
}
