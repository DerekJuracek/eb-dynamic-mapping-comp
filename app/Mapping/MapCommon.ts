import maplibregl from "maplibre-gl";
import type { Article } from "../data/articles";

export function wireCommonMap(map: maplibregl.Map, article: Article) {
  map.on("load", () => {
    // 🔹 Label language
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

    // 🔹 Clustered source
    map.addSource("eb", {
      type: "geojson",
      data: "/gis/eb_locations_all.geojson",
      cluster: true,
      clusterMaxZoom: 9, // max zoom to cluster points
      clusterRadius: 40, // radius of each cluster (pixels)
    });

    // 🔹 Cluster circles
    map.addLayer({
      id: "clusters",
      type: "circle",
      source: "eb",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#51bbd6", // small
          5,
          "#f1f075", // medium
          15,
          "#f28cb1", // large
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

    // 🔹 Cluster count labels
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
      paint: {
        "text-color": "#333333",
      },
    });

    // 🔹 Unclustered points
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

    // 🔹 Popup on click (single points only)
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
            <a href="${p.url}" target="_blank" class="popup-link"><strong>View Britannica Article</strong></a>
          </div>
        `)
        .addTo(map);
    });

    // 🔹 Zoom into clusters when clicked
    map.on("click", "clusters", (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
      const clusterId = features[0].properties?.cluster_id;
      const source = map.getSource("eb") as maplibregl.GeoJSONSource;

      source.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;
        map.easeTo({
          center: (features[0].geometry as any).coordinates,
          zoom,
        });
      });
    });

    map.on("mouseenter", "clusters", () => (map.getCanvas().style.cursor = "pointer"));
    map.on("mouseleave", "clusters", () => (map.getCanvas().style.cursor = ""));
    map.on("mouseenter", "unclustered-point", () => (map.getCanvas().style.cursor = "pointer"));
    map.on("mouseleave", "unclustered-point", () => (map.getCanvas().style.cursor = ""));

    // 🔹 Fit to bounding box once
    map.fitBounds(article.bbox as any, { padding: 40, maxZoom: 5, duration: 1200 });
  });
}
