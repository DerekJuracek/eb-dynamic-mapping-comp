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
        map.on('load', () => {
            map.addSource('eb', {
                type: "geojson",
                data: '/gis/eb_locations_all.geojson'
                
            });

         map.addLayer({
            id: 'city-points',
            type: 'circle',
            source: 'eb',
            paint: {
            'circle-radius': 7,
            'circle-color': '#0078ff',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
            },
        })

         const popupHTML = `
            <div class="popup-card">
            <div class="popup-title">Lollapalooza</div>
            <div class="popup-subtitle">Chicago, Illinois</div>
            <strong><a href="https://www.britannica.com/art/Lollapalooza" target="_blank" class="popup-link">
                View Britannica Article
            </a>
            </strong>
            </div>
        `;
     

      // Add popup on click
      map.on('click', 'city-points', (e) => {
        if (e.features && e.features.length > 0) {
          const name = e.features[0].properties.site_url;
          new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(popupHTML)
            .addTo(map);
        }
      });

        map.on('mouseenter', 'city-points', () => map.getCanvas().style.cursor = 'pointer');
        map.on('mouseleave', 'city-points', () => map.getCanvas().style.cursor = '');
    
        })

        return () => map.remove(); 
    })
  return (
   <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-lg mt-6">
       <div ref={mapContainer} className="w-full h-64 rounded-lg shadow-md" />;
    </div>
  );
}