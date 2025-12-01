import maplibregl, {
  MapMouseEvent,
  MapGeoJSONFeature,
} from "maplibre-gl";
import type { Article } from "../data/articles";

interface FeatureProperties {
  title?: string;
  url?: string;
  geom?: string;
  cluster_id?: number;
  [key: string]: unknown;
}

export function wireCommonMap(map: maplibregl.Map, article: Article) {
  map.on("load", async () => {
    // Allow keyboard focus
    map.getCanvas().tabIndex = 0;

    // Tracks whether user interacted before enabling hover popups
    let hasUserInteracted = false;
    const markInteraction = () => (hasUserInteracted = true);

    map.on("mousedown", markInteraction);
    map.on("wheel", markInteraction);
    map.on("touchstart", markInteraction);

    // ---------------------------------------------------------
    // 1. Language Label Support
    // ---------------------------------------------------------
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

    // ---------------------------------------------------------
    // 2. Cluster Source
    // ---------------------------------------------------------
    map.addSource("eb", {
      type: "geojson",
      data: "/gis/eb_locations_all.geojson",
      cluster: true,
      clusterMaxZoom: 9,
      clusterRadius: 40,
    });

    // ---------------------------------------------------------
    // 3. Cluster Layers
    // ---------------------------------------------------------
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

    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "eb",
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count_abbreviated"],
        "text-size": 12,
      },
      paint: { "text-color": "#333" },
    });

    // ---------------------------------------------------------
    // 4. Individual Points
    // ---------------------------------------------------------
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

    // ---------------------------------------------------------
    // 5. Cluster Expansion
    // ---------------------------------------------------------
    map.on("click", "clusters", async (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
      markInteraction();

      if (!e.features?.length) return;

      const clusterFeature = e.features[0];
      const props = clusterFeature.properties as FeatureProperties;
      const clusterId = props.cluster_id;

      if (typeof clusterId !== "number") return;

      const source = map.getSource("eb") as maplibregl.GeoJSONSource;
      const zoom = await source.getClusterExpansionZoom(clusterId);
      const coords = (clusterFeature.geometry as GeoJSON.Point).coordinates as [number, number];

      map.easeTo({ center: coords, zoom });
    });

    // ---------------------------------------------------------
    // 6. Highlight Pin
    // ---------------------------------------------------------
    map.addSource("highlight", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: { type: "Point", coordinates: article.lnglat },
            properties: {
              title: article.title,
              url: article.url,
              excerpt: article.excerpt,
            },
          },
        ],
      },
    });

    const pinImage = await map.loadImage("/icons/brand_pin_large.png");
    if (!map.hasImage("thumbtack-pin")) {
      map.addImage("thumbtack-pin", pinImage.data);
    }

    map.addLayer({
      id: "highlight-pin",
      type: "symbol",
      source: "highlight",
      layout: {
        "icon-image": "thumbtack-pin",
        "icon-size": 0.5,
        "icon-anchor": "bottom",
        "icon-allow-overlap": true,
      },
    });

  // ---------------------------------------------------------
// 7. Stable Hover Popup System (Correct Feature-Based Hover)
// ---------------------------------------------------------

let activePopup: maplibregl.Popup | null = null;
let isOverSymbol = false;
let isOverPopup = false;
let closeTimer: ReturnType<typeof setTimeout> | null = null;

// Track entering popup DOM
document.addEventListener("mouseover", (e) => {
  if ((e.target as HTMLElement).closest(".popup-card")) {
    isOverPopup = true;
  }
});

// Track leaving popup DOM
document.addEventListener("mouseout", (e) => {
  if ((e.target as HTMLElement).closest(".popup-card")) {
    isOverPopup = false;
    schedulePopupClose();
  }
});

const schedulePopupClose = () => {
  if (closeTimer) clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    if (!isOverSymbol && !isOverPopup && activePopup) {
      activePopup.remove();
      activePopup = null;
    }
  }, 150);
};

// -----------------------------------------------
// Helper to attach proper hover logic
// -----------------------------------------------
function attachHoverHandlers(layerId: string) {
  map.on(
    "mouseenter",
    layerId,
    (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
      isOverSymbol = true;
      if (!hasUserInteracted) return;
      if (!e.features?.length) return;

      const props = e.features[0].properties as FeatureProperties;

      // Get coordinates
      let lngLat: [number, number];
      if (props.geom) {
        const { lat, lng } = JSON.parse(props.geom);
        lngLat = [lng, lat];
      } else {
        // fallback for highlight pin
        lngLat = (e.features[0].geometry as GeoJSON.Point)
          .coordinates as [number, number];
      }

      // Remove any prior popup
      if (activePopup) activePopup.remove();

      // Create popup
      activePopup = new maplibregl.Popup({
        closeButton: false,
        offset: [20, 0],
        anchor: "left",
      })
        .setLngLat(lngLat)
        .setHTML(`
          <div class="popup-card" role="dialog" aria-label="Map popup for ${props.title}">
                <div class="popup-title" aria-label="Map popup for ${props.title}">${props.title}</div>
                <a href="${props.url}" target="_blank" class="popup-link">
                  <strong>Read Article</strong>
                </a>
              </div>
        `)
        .addTo(map);
    }
  );

  map.on("mouseleave", layerId, () => {
    isOverSymbol = false;
    schedulePopupClose();
  });
}

// Attach for both layers
attachHoverHandlers("unclustered-point");
attachHoverHandlers("highlight-pin");


    // ---------------------------------------------------------
    // 8. Auto-open popup on load
    // ---------------------------------------------------------
    const [lng, lat] = article.lnglat;

    const initialPopup = new maplibregl.Popup({
      offset: [20, 0],
      anchor: "left",
    })
      .setLngLat([lng, lat])
      .setHTML(`
       <div class="popup-card" role="dialog" aria-label="Map popup for ${article.title}">
          <div class="popup-title">${article.title}</div>
          <a href="${article.url}" target="_blank" class="popup-link">
            <strong>Read Article</strong>
          </a>
        </div>
      `)
      .addTo(map);

    // ---------------------------------------------------------
    // 9. Zoom to location
    // ---------------------------------------------------------
    if (article.bbox) {
      map.fitBounds(article.bbox as maplibregl.LngLatBoundsLike, {
        padding: 60,
        maxZoom: 10,
        duration: 2500,
        easing: (t) => t * t * (3 - 2 * t),
      });
    } else {
      map.easeTo({
        center: article.lnglat as [number, number],
        zoom: 9,
        duration: 2500,
        easing: (t) => t * t * (3 - 2 * t),
      });
    }
  });
}
