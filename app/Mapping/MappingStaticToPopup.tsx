"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import type { Article } from "../data/articles";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MappingStaticToPopup({ article }: { article: Article }) {
  const [showPopup, setShowPopup] = useState(false);
  const mapContainer = useRef<HTMLDivElement | null>(null);

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
    if (!showPopup || !mapContainer.current) return;

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
  }, [showPopup]);

  return (
    <>
      {/* Static preview thumbnail */}
      <div
        className={`relative rounded-lg shadow-md mt-6 cursor-pointer ${
          article.size === "large" ? "w-full h-96" : "w-[200px] h-[200px]"
        }`}
        onClick={() => setShowPopup(true)}
      >
        <img
          src={staticUrl}
          alt="Static map preview"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-medium">
          Click to view map
        </div>
      </div>

      {/* Dynamic popup modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[90vw] h-[80vh] relative overflow-hidden">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 bg-gray-800 text-white px-3 py-1 rounded-md z-10"
            >
              ✕ Close
            </button>
            <div ref={mapContainer} className="w-full h-full" />
          </div>
        </div>
      )}
    </>
  );
}
