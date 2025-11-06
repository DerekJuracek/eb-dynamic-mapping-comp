"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { Article } from "../data/articles";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MappingDynamic({ article }: { article: Article }) {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style:
        article.origin === "india"
          ? "https://api.maptiler.com/maps/019981e0-e17c-71b2-88c7-30c1b0eb8c2c/style.json?key=yyuND61jYywaYRD458Fx"
          : "https://api.maptiler.com/maps/019981be-496a-7bae-b225-a418c34d5d49/style.json?key=yyuND61jYywaYRD458Fx",
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
  }, [article]);

  return (
    <div
      className={`rounded-lg shadow-md mt-6 ${
        article.size === "large" ? "w-full h-96" : "w-[200px] h-[200px]"
      }`}
    >
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
}
