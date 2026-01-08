"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { wireCommonMap } from "./MapCommon";
import type { Article } from "../data/articles";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MappingStaticToDynamic({ article, place_id }: { article: Article, place_id: string }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  const [minLon, minLat] = article.bbox[0];
  const [maxLon, maxLat] = article.bbox[1];
  const mapId =
    article.origin === "india"
      ? "019981e0-e17c-71b2-88c7-30c1b0eb8c2c"
      : "019981be-496a-7bae-b225-a418c34d5d49";
  const key = "yyuND61jYywaYRD458Fx";
  const w = article.size === "large" ? 800 : 300;
  const h = article.size === "large" ? 384 : 300;
  const staticUrl = `https://api.maptiler.com/maps/${mapId}/static/${minLon},${minLat},${maxLon},${maxLat}/${w}x${h}.png?key=${key}`;

  useEffect(() => {
    if (!isInteractive || !mapRef.current) return;
    const style = `https://api.maptiler.com/maps/${mapId}/style.json?key=${key}`;
    const map = new maplibregl.Map({ container: mapRef.current, style, attributionControl: false });
    wireCommonMap(map, article, place_id);
    return () => map.remove();
  }, [isInteractive, article]);

  return (
    <div
      className={`relative rounded-lg shadow-md mt-6 cursor-pointer ${
        article.size === "large" ? "w-full h-96" : "w-[300px] h-[300px]"
      }`}
      onClick={() => setIsInteractive(true)}
    >
      {!isInteractive ? (
        <>
          <img src={staticUrl} alt="Static map preview" className="w-full h-full object-cover rounded-lg" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-medium">
            Click to view interactive map
          </div>
        </>
      ) : (
        <div ref={mapRef} className="w-full h-full" />
      )}
    </div>
  );
}
