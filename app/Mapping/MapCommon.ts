import maplibregl, { MapMouseEvent, MapGeoJSONFeature } from "maplibre-gl";
import type { Article } from "../data/articles";

interface FeatureProperties {
  title?: string;
  url?: string;
  geom?: string;
  [key: string]: unknown;
}

export function wireCommonMap(map: maplibregl.Map, article: Article) {
  map.on("load", () => {
    // Allow keyboard users to focus the map
  map.getCanvas().tabIndex = 0;

    // 🔹 1. Localized label language
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
      "Road labels",
    ];

    labelLayers.forEach((id) => {
      if (map.getLayer(id)) {
        map.setLayoutProperty(id, "text-field", [
          "coalesce",
          ["get", `name:${article.language}`],
          ["get", "name:en"],
          ["get", "name"],
        ]);
      }
    });

    // 🔹 2. Clustered source for all Britannica points
    map.addSource("eb", {
      type: "geojson",
      data: "/gis/eb_locations_all.geojson",
      cluster: true,
      clusterMaxZoom: 9,
      clusterRadius: 40,
    });

    // 🔹 3. Cluster circles
    map.addLayer({
      id: "clusters",
      type: "circle",
      source: "eb",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#51bbd6",
          5,
          "#f1f075",
          15,
          "#f28cb1",
        ],
        "circle-radius": [
          "step",
          ["get", "point_count"],
          15,
          5,
          20,
          15,
          25,
        ],
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    });

    // 🔹 4. Cluster count labels
    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "eb",
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count_abbreviated"],
        "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        "text-size": 12,
      },
      paint: { "text-color": "#333333" },
    });

    // 🔹 5. Unclustered individual points
    map.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "eb",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#0070F0",
        "circle-radius": 6,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    });

    // 🔹 6. Popup for unclustered points
    map.on("click", "unclustered-point", (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
      if (!e.features?.length) return;
      const feature = e.features[0];
      const p = feature.properties as FeatureProperties;

      if (!p.geom) return;
      let geom: { lat: number; lng: number };

      try {
        geom = JSON.parse(p.geom);
      } catch {
        console.error("Invalid geometry format:", p.geom);
        return;
      }

      new maplibregl.Popup({
          offset: [20, 0],  // 20px to the right
          anchor: 'left'
      })
        .setLngLat([geom.lng, geom.lat])
        .setHTML(`
          <div class="popup-card" role="dialog" aria-label="Map popup for ${p.title}">
            <div class="popup-title" aria-label="Map popup for ${p.title}">${p.title}</div>
            <a href="${p.url}" target="_blank" class="popup-link">
              <strong>Read Article</strong>
            </a>
          </div>
        `)
        .addTo(map);
    });

// 🔹 7. Expand clusters on click
map.on("click", "clusters", async (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
  if (!e.features?.length) return;
  const features = map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
  const clusterId = (features[0].properties as FeatureProperties)?.cluster_id;

  const source = map.getSource("eb") as maplibregl.GeoJSONSource;

  // ✅ Ensure clusterId is numeric
  if (typeof clusterId !== "number") return;

  try {
    // ✅ Await the zoom (it’s a Promise<number>)
    const zoom = await source.getClusterExpansionZoom(clusterId);
    const coords = (features[0].geometry as GeoJSON.Point).coordinates as [number, number];
    map.easeTo({ center: coords, zoom });
  } catch (err) {
    console.error("Error expanding cluster:", err);
  }
});





    // Cursor feedback
    map.on("mouseenter", "clusters", () => (map.getCanvas().style.cursor = "pointer"));
    map.on("mouseleave", "clusters", () => (map.getCanvas().style.cursor = ""));
    map.on("mouseenter", "unclustered-point", () => (map.getCanvas().style.cursor = "pointer"));
    map.on("mouseleave", "unclustered-point", () => (map.getCanvas().style.cursor = ""));

// 🔹 8. Highlight source (current article)
map.addSource("highlight", {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: article.lnglat,
        },
        properties: {
          title: article.title,
          url: article.url,
          excerpt: article.excerpt,
        },
      },
    ],
  },
});

// 🔹 9. Load and add the custom thumbtack pin icon
(async () => {
  try {
    const image = await map.loadImage("/icons/brand_pin_large.png");

    if (!map.hasImage("thumbtack-pin")) {
      map.addImage("thumbtack-pin", image.data, { sdf: false });
    }

    // 🔹 10. Add symbol layer using the thumbtack pin
    map.addLayer({
      id: "highlight-pin",
      type: "symbol",
      source: "highlight",
      layout: {
        "icon-image": "thumbtack-pin",
        "icon-size": 0.50,
        "icon-anchor": "bottom",
        "icon-allow-overlap": true,
      },
    });

    let pointerOverHighlightPin = false;

    map.on("mouseenter", "highlight-pin", () => {
      pointerOverHighlightPin = true;
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "highlight-pin", () => {
      pointerOverHighlightPin = false;
      map.getCanvas().style.cursor = "";
    });

    

    map.getCanvas().addEventListener("keydown", (e) => {
  if (!pointerOverHighlightPin) return; // Only activate when "on" the pin

  if (e.key === "Enter" || e.key === " ") {
    const [lng, lat] = article.lnglat;

    new maplibregl.Popup({
      offset: [20, 0],
      anchor: "left"
    })
      .setLngLat([lng, lat])
      .setHTML(`
        <div class="popup-card" role="dialog">
          <div class="popup-title">${article.title}</div>
          <a href="${article.url}" target="_blank" class="popup-link">
            <strong>Read Article</strong>
          </a>
        </div>
      `)
      .addTo(map);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const popups = document.getElementsByClassName("maplibregl-popup");
    if (popups.length > 0) popups[0].remove();
  }
});




    // 🔹 11. Popup for the highlighted article
    map.on("click", "highlight-pin", () => {
      const [lng, lat] = article.lnglat;
    
      new maplibregl.Popup({
         offset: [20, 0],  // 20px to the right
        anchor: 'left'   // ← move popup to the right of the icon
      })
        .setLngLat([lng, lat])
        .setHTML(`
          <div class="popup-card">
            <div class="popup-title">${article.title}</div>
            <a href="${article.url}" target="_blank" class="popup-link">
              <strong>Read Article</strong>
            </a>
          </div>
        `)
        .addTo(map);
    });

    

    // ✅ 12. Zoom to bbox now that everything is ready + auto popup
if (article.bbox && Array.isArray(article.bbox)) {
  map.fitBounds(article.bbox as maplibregl.LngLatBoundsLike, {
    padding: 60,
    maxZoom: 13,
    // zoom: 9,
    duration: 2500,  // slower zoom
    easing: (t) => t * t * (3 - 2 * t), // smooth ease
  });
} else {
  map.setCenter(article.lnglat as [number, number]);
  map.setZoom(9);
}

// 🔹 Auto-open popup for the highlighted article
const [lng, lat] = article.lnglat;

new maplibregl.Popup({
  offset: [20, 0],
  anchor: "left"
})
  .setLngLat([lng, lat])
  .setHTML(`
    <div class="popup-card">
      <div class="popup-title">${article.title}</div>
      <a href="${article.url}" target="_blank" class="popup-link">
        <strong>Read Article</strong>
      </a>
    </div>
  `)
  .addTo(map);


  } catch (err) {
    console.error("Error loading pin icon:", err);
  }

})();


})
}
