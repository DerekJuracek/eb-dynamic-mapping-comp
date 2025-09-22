"use client";
import Link from "next/link";
import { Article } from "./data/articles";

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{article.title}</h2>
      <p className="text-gray-600 mb-4">{article.excerpt}</p>
      <Link href={`/articles/${article.id}`} className="text-blue-600 hover:underline">
        Read More →
      </Link>
    </div>
  );
}
