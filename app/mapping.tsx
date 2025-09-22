"use client";

import { useEffect, useRef } from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Mapping({ article }) {
    const mapContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=ZLi0vxKp10mvDCBQCwjK',
        // style: 'https://demotiles.maplibre.org/globe.json', // free demo style
        center: article.lnglat,
        zoom: 6
        });

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