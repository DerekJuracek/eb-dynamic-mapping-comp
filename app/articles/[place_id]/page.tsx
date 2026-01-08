"use client";
import React from "react";
import { useEffect, useState } from "react";
import { articles } from "../../data/articles";
import Mapping from "../../mapping";

interface Props {
  params: { place_id: string };
}

export default function ArticlePage({ params }: Props) {
  const article = articles.find(a => a.place_id === params.place_id);
  const place_id = params.place_id;
  // const [hasLocation, setHasLocation] = useState(false);
  // const [data, setData] = useState(null);


  // useEffect(() => {
  //   fetch('/api/getLocation', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ uniqueid: id}),
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     if (data) {
  //       console.log(data)
  //       setHasLocation(true);
  //       setData(data);
  //     } else {
  //       setHasLocation(false);
  //       setData(null);
  //     }
  //     console.log('Article location data:', data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching article location data:', error);
  //   });
  // }, [])

  //   if (!article) {
  //   return <h1 className="text-center mt-10 text-red-600">Article not found</h1>;
  // }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{article?.title}</h1>
      <p className="text-gray-700">{article?.content}</p>
      {article ? <Mapping article={article} place_id={place_id} /> : ''}
    </main>
  );
}
