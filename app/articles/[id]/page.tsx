"use client";
import React from "react";
import { useEffect, useState } from "react";
import { articles } from "../../data/articles";
import Mapping from "../../mapping";

interface Props {
  params: { id: string };
}

export default function ArticlePage({ params }: Props) {
  const article = articles.find(a => a.id === params.id);
  const resolvedParams = React.use(params)
  const id = resolvedParams.id;
  console.log(id)
  const [hasLocation, setHasLocation] = useState(false);
  const [data, setData] = useState(null);

  if (!article) {
    return <h1 className="text-center mt-10 text-red-600">Article not found</h1>;
  }
  let articledata = null;
  console.log('Rendering article:', article);
  useEffect(() => {
    fetch('/api/getLocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uniqueid: id}),
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        setHasLocation(true);
        setData(data);
      } else {
        setHasLocation(false);
        setData(null);
      }
      console.log('Article location data:', data);
    })
    .catch(error => {
      console.error('Error fetching article location data:', error);
    });
  }, [])

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-700">{article.content}</p>
      {data ? <Mapping article={article} articledata={data}/> 
      : ''}
    </main>
  );
}
