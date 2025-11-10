import maplibregl from "maplibre-gl";
import type { Article } from "../data/articles";

export function wireCommonMap(map: maplibregl.Map, article: Article) {
  map.on("load", () => {
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
    map.on("click", "unclustered-point", (e) => {
      if (!e.features?.length) return;
      const feature = e.features[0];
      const p = feature.properties as any;

      let geom;
      try {
        geom = JSON.parse(p.geom);
      } catch {
        geom = { lng: feature.geometry.coordinates[0], lat: feature.geometry.coordinates[1] };
      }

      new maplibregl.Popup()
        .setLngLat([geom.lng, geom.lat])
        .setHTML(`
          <div class="popup-card">
            <div class="popup-title">${p.title}</div>
            <a href="${p.url}" target="_blank" class="popup-link">
              <strong>View Britannica Article</strong>
            </a>
          </div>
        `)
        .addTo(map);
    });

    // 🔹 7. Expand clusters on click
    map.on("click", "clusters", (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
      const clusterId = features[0].properties?.cluster_id;
      const source = map.getSource("eb") as maplibregl.GeoJSONSource;

      source.getClusterExpansionZoom(clusterId, (err) => {
        if (err) return;
        map.easeTo({
          center: (features[0].geometry as any).coordinates
        });
      });
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
              url: article.url, // ✅ use directly from Article data
              excerpt: article.excerpt,
            },
          },
        ],
      },
    });

    // 🔹 9. Highlight layer (red pulsing dot)
    map.addLayer({
      id: "highlight-point",
      type: "circle",
      source: "highlight",
      paint: {
        "circle-radius": 10,
        "circle-color": "#e63946",
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    });

    // 🔹 10. Popup for highlighted article
    map.on("click", "highlight-point", (e) => {
      const [lng, lat] = article.lnglat;
      console.log(e.features)
      new maplibregl.Popup()
        .setLngLat([lng, lat])
        .setHTML(`
          <div class="popup-card">
            <div class="popup-title">${article.title}</div>
            <a href="${article.url}" target="_blank" class="popup-link">
              <strong>View Britannica Article</strong>
            </a>
          </div>
        `)
        .addTo(map);
    });

    // 🔹 11. Pulse animation for highlight
    const minRadius = 8;
    const maxRadius = 14;
    const duration = 1200;
    const start = performance.now();

    function animatePulse(ts: number) {
      const elapsed = (ts - start) % duration;
      const t = elapsed / duration;
      const radius = minRadius + (maxRadius - minRadius) * Math.abs(Math.sin(t * Math.PI));
      map.setPaintProperty("highlight-point", "circle-radius", radius);
      requestAnimationFrame(animatePulse);
    }
    requestAnimationFrame(animatePulse);

    // 🔹 12. Fit to article bounding box
    map.fitBounds(article.bbox as any, { padding: 40, maxZoom: 5, duration: 1200 });
  });
}
