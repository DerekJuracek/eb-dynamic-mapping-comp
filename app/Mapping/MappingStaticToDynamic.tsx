"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import type { Article } from "../data/articles";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MappingStaticToDynamic({ article }: { article: Article }) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  const [minLon, minLat] = article.bbox[0];
  const [maxLon, maxLat] = article.bbox[1];
  const mapId =
    article.origin === "india"
      ? "019981e0-e17c-71b2-88c7-30c1b0eb8c2c"
      : "019981be-496a-7bae-b225-a418c34d5d49";
  const key = "yyuND61jYywaYRD458Fx";

  const width = article.size === "large" ? 800 : 200;
  const height = article.size === "large" ? 384 : 200;

  const staticUrl = `https://api.maptiler.com/maps/${mapId}/static/${minLon},${minLat},${maxLon},${maxLat}/${width}x${height}.png?key=${key}`;

  useEffect(() => {
    if (!isInteractive || !mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/${mapId}/style.json?key=${key}`,
      attributionControl: false,
    });

    map.on("load", () => {
      map.addSource("eb", {
        type: "geojson",
        data: "/gis/eb_locations_all_identifier.geojson",
      });

      map.addLayer({
        id: "city-points",
        type: "circle",
        source: "eb",
        paint: {
          "circle-radius": 7,
          "circle-color": "#0070F0",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });

      map.fitBounds(article.bbox, { padding: 40, maxZoom: 9, duration: 1500 });
    });

    return () => map.remove();
  }, [isInteractive]);

  return (
    <div
      className={`relative rounded-lg shadow-md mt-6 cursor-pointer ${
        article.size === "large" ? "w-full h-96" : "w-[200px] h-[200px]"
      }`}
      onClick={() => setIsInteractive(true)}
    >
      {!isInteractive ? (
        <>
          <img src={staticUrl} alt="Static map preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-medium">
            Click to view interactive map
          </div>
        </>
      ) : (
        <div ref={mapContainer} className="w-full h-full" />
      )}
    </div>
  );
}
