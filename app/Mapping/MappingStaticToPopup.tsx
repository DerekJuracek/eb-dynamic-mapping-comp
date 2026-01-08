"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { wireCommonMap } from "./MapCommon";
import type { Article } from "../data/articles";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MappingStaticToPopup({ article, place_id }: { article: Article, place_id: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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
    if (!open || !ref.current) return;
    const style = `https://api.maptiler.com/maps/${mapId}/style.json?key=${key}`;
    const map = new maplibregl.Map({ container: ref.current, style, attributionControl: false });
    wireCommonMap(map, article, place_id);
    return () => map.remove();
  }, [open, article]);

  return (
    <>
      <div
        className={`relative rounded-lg shadow-md mt-6 cursor-pointer ${
          article.size === "large" ? "w-full h-96" : "w-[300px] h-[300px]"
        }`}
        onClick={() => setOpen(true)}
      >
        <img src={staticUrl} alt="Static map preview" className="w-full h-full object-cover rounded-lg" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-medium">
          Click to open map
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[90vw] h-[80vh] relative overflow-hidden">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 bg-gray-800 text-white px-3 py-1 rounded-md z-10"
            >
              ✕ Close
            </button>
            <div ref={ref} className="w-full h-full" />
          </div>
        </div>
      )}
    </>
  );
}
