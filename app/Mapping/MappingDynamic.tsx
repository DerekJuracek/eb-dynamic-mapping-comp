"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { wireCommonMap } from "./MapCommon";
import type { Article } from "../data/articles";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MappingDynamic({ article }: { article: Article }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const style =
      article.origin === "india"
        ? "https://api.maptiler.com/maps/019981e0-e17c-71b2-88c7-30c1b0eb8c2c/style.json?key=yyuND61jYywaYRD458Fx"
        : "https://api.maptiler.com/maps/019981be-496a-7bae-b225-a418c34d5d49/style.json?key=yyuND61jYywaYRD458Fx";

    const map = new maplibregl.Map({ container: ref.current, style, attributionControl: false });
    wireCommonMap(map, article);
    return () => map.remove();
  }, [article]);

  return (
    <div className={`rounded-lg shadow-md mt-6 ${article.size === "large" ? "w-full h-96" : "w-[300px] h-[300px]"}`}>
      <div ref={ref} className="w-full h-full rounded-lg" />
    </div>
  );
}
