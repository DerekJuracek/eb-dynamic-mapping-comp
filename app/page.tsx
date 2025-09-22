import ArticleCard from "./articlecard";
import { articles } from "./data/articles";

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Article Website</h1>
      <div className="space-y-4">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}
