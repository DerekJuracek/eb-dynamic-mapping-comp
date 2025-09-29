"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from 'maplibre-gl';
import type { Article } from "./data/articles";
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Mapping({ article } : { article: Article }) {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const [origin, setOrigin] = useState('default')
    const [currentMap, setCurrentMap] = useState('')

    useEffect(() => {
        
        if (origin == 'default' || origin == '') {
            setCurrentMap('https://api.maptiler.com/maps/019981be-496a-7bae-b225-a418c34d5d49/style.json?key=yyuND61jYywaYRD458Fx')
        } else if (origin == 'india') {
            setCurrentMap('https://api.maptiler.com/maps/019981e0-e17c-71b2-88c7-30c1b0eb8c2c/style.json?key=yyuND61jYywaYRD458Fx')
        }
    }, [])
       

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new maplibregl.Map({
        container: mapContainer.current,
        style: currentMap,
        // style: 'https://demotiles.maplibre.org/globe.json', // free demo style
        center: article.lnglat,
        zoom: 6
        });

        console.log(currentMap)

        map.fitBounds(article.bbox);

        map.on("load", () => {
            const labelLayers = [
                "Continent labels",
                "Country labels",
                "State labels",
                "City labels",
                "Capital city labels",
                "Town labels",
                "Place labels",
                "Ocean labels",
                "River labels",
                "Lake labels",
                "Road labels"
            ];


            labelLayers.forEach(layerId => {
                if (map.getLayer(layerId)) {
                    map.setLayoutProperty(layerId, "text-field", [
                        "coalesce",
                        ["get", `name:${article.language}`],
                        ["get", "name"]
                    ]);
                }
            });
        });

      
         console.log(article)

        return () => map.remove(); 
    })
  return (
   <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-lg mt-6">
       <div ref={mapContainer} className="w-full h-64 rounded-lg shadow-md" />;
    </div>
  );
}