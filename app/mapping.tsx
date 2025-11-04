"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from 'maplibre-gl';
import type { Article } from "./data/articles";
// import * as turf from '@turf/turf';
// import wellknown from 'wellknown';
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
    attributionControl: false,
   
  });

  map.on("load", () => {
    // ✅ 1. Update label languages
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
        ["get", `name:${article.language}`], // 👈 use dynamic language key
        ["get", "name:en"],
        ["get", "name"]
      ]);
    }
  });

    // ✅ 2. Add GeoJSON source
    map.addSource("eb", {
      type: "geojson",
      data: "/gis/eb_locations_all_identifier.geojson",
    });

    // ✅ 3. Add circle layer
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

    // ✅ 4. Zoom ONCE here
    map.fitBounds(article.bbox, {
      padding: 40,
      maxZoom: 9,
      duration: 1500,
    });

    // Custom attribution
    // map.addControl(
    // new maplibregl.AttributionControl({
    //   compact: true,
    //   customAttribution: "© Britannica / OpenStreetMap"
    // }),
    // 'bottom-right'
    // );

    // ✅ 5. Add popups and hover behavior
    map.on("click", "city-points", (e) => {
      if (!e.features?.length) return;
      const feature = e.features[0];
      const geom = JSON.parse(feature.properties.geom);
      const lat = geom.lat;
      const lng = geom.lng;

      const popupHTML = `
        <div class="popup-card">
          <div class="popup-title">${feature.properties.title}</div>
          <div class="popup-subtitle">${feature.properties.formatted_address}</div>
          <strong><a href="${feature.properties.url}" target="_blank" class="popup-link">
            View Britannica Article
          </a></strong>
        </div>
      `;

      new maplibregl.Popup()
        .setLngLat([lng, lat])
        .setHTML(popupHTML)
        .addTo(map);
    });

    map.on("mouseenter", "city-points", () => map.getCanvas().style.cursor = "pointer");
    map.on("mouseleave", "city-points", () => map.getCanvas().style.cursor = "");
  });

  return () => map.remove();
}, [currentMap]);

  return (
  <>
    {article.size === 'large' ? (
      <div className="w-full h-96 bg-gray-300 flex items-center justify-center rounded-lg mt-6">
        <div ref={mapContainer} className="w-full h-96 rounded-lg shadow-md" />
      </div>
    ) : (
      <div
        className="bg-gray-300 flex items-center justify-center rounded-lg mt-6"
        style={{ width: '200px', height: '200px' }}
      >
        <div ref={mapContainer} className="w-full h-full rounded-lg shadow-md" />
      </div>
    )}
  </>
);

}