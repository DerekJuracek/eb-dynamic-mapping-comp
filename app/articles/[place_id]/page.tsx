import { articles } from "../../data/articles";
import Mapping from "../../mapping";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ place_id: string }>;
};

export default async function ArticlePage({ params }: Props) {
  const { place_id } = await params;

  const article = articles.find((a) => a.place_id === place_id);
  if (!article) notFound();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-700">{article.content}</p>
      <Mapping article={article} place_id={place_id} article_type={article.type} />
    </main>
  );
}
