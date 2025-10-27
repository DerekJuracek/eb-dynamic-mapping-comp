"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from 'maplibre-gl';
import type { Article } from "./data/articles";
import turf from 'turf';
import wellknown from 'wellknown';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Mapping({ article, articledata } : { article: Article, articledata: any }) {
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
        // center: articledata.lnglat,
        // zoom: 6
        });
        map.on('load', () => {
        map.fitBounds(article.bbox, {
            padding: 40,
            maxZoom: 9,
            duration: 1500
        });
        });


       

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
                        ["get", `name:${articledata.lang}`],
                        ["get", "name"]
                    ]);
                }
            });
        });
        map.on('load', () => {
            map.addSource('eb', {
                type: "geojson",
                data: '/gis/eb_locations_all_identifier.geojson'
                // data: '/gis/eb_locations_all.geojson'
                
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

        function getPopupHTML(features: any) {

        // Example: convert WKT → bbox
        const wkt = features.properties.bbox_geom;
        const geom = wellknown.parse(wkt);
        const bbox = turf.bbox(geom);

        // Now bbox = [minX, minY, maxX, maxY]
        map.fitBounds([
            [bbox[0], bbox[1]], // southwest
            [bbox[2], bbox[3]]  // northeast
        ]);
        // map.fitBounds(features.properties.bbox_geom)
            console.log('features', features);
         const popupHTML = `
            <div class="popup-card">
            <div class="popup-title">${features.properties.title}</div>
            <div class="popup-subtitle">${features.properties.formatted_address}</div>
            <strong><a href="${features.properties.url}" target="_blank" class="popup-link">
                View Britannica Article
            </a>
            </strong>
            </div>
        `;
            return popupHTML;
        }

      // Add popup on click
      map.on('click', 'city-points', (e) => {
        if (e.features && e.features.length > 0) {
          const name = e.features[0].properties.site_url;
          const geomString = e.features[0].properties.geom;
          const geom = JSON.parse(geomString);

        const lat = geom.lat;
        const lng = geom.lng;
          new maplibregl.Popup()
            .setLngLat([lng, lat])
            .setHTML(getPopupHTML(e.features[0]))
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
       <div ref={mapContainer} className="w-full h-64 rounded-lg shadow-md" />
    </div>
  );
}