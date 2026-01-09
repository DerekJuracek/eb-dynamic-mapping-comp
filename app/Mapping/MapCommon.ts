import maplibregl, {
  MapMouseEvent,
  MapGeoJSONFeature,
} from "maplibre-gl";
import type { Article } from "../data/articles";

interface FeatureProperties {
  place_id?: string;
  title?: string;
  identifier?: string;
  name?: string;
  bbox?: string;
  url?: string;
  geom?: string;
  cluster_id?: number;
  [key: string]: unknown;
}

type EBFeature = GeoJSON.Feature<GeoJSON.Point, any>;
type EBFC = GeoJSON.FeatureCollection<GeoJSON.Point, any>;

let ebCache: { fc: EBFC; byPlaceId: Map<string, EBFeature> } | null = null;

async function loadEbIndex(): Promise<{ fc: EBFC; byPlaceId: Map<string, EBFeature> }> {
  if (ebCache) return ebCache;

  const res = await fetch("/gis/eb_locations_mendel.geojson");
  const fc = (await res.json()) as EBFC;

  const byPlaceId = new Map<string, EBFeature>();
  for (const f of fc.features as EBFeature[]) {
    const pid = f.properties?.place_id;
    if (typeof pid === "string" && pid) byPlaceId.set(pid, f);
  }

  ebCache = { fc, byPlaceId };
  return ebCache;
}


export function wireCommonMap(map: maplibregl.Map, article: Article, place_id: string, article_type: string) {

  let isPanning = false;
  let panStartTs = 0;
  let popupHoverStart = 0;
  let popupHoverCount = 0;
  let popupHoverMeta: { title?: string; url?: string } = {};

  map.on("load", async () => {
    map.getCanvas().tabIndex = 0;

    // Tracks whether user interacted before enabling hover popups
    let hasUserInteracted = false;
    const markInteraction = () => (hasUserInteracted = true);

    map.on("mousedown", markInteraction);
    map.on("wheel", markInteraction);
    map.on("touchstart", markInteraction);

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

    const { fc, byPlaceId } = await loadEbIndex();

    map.addSource("eb", {
      type: "geojson",
      data: fc,          
      cluster: true,
      clusterMaxZoom: 9,
      clusterRadius: 40,
    });

    function featureToLngLat(f: any): [number, number] {
      return (f.geometry as GeoJSON.Point).coordinates as [number, number];
    }

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


  let activePopup: maplibregl.Popup | null = null;
  let isOverSymbol = false;
  let isOverPopup = false;
  let closeTimer: ReturnType<typeof setTimeout> | null = null;

  const getPopupMeta = (el: HTMLElement) => ({
    title: el.getAttribute("data-title") || undefined,
    url: el.getAttribute("data-url") || undefined,
  });
  // Track entering popup DOM
  document.addEventListener("mouseover", (e) => {
    if ((e.target as HTMLElement).closest(".popup-card")) {
      isOverPopup = true;
    }

    const card = (e.target as HTMLElement).closest(".popup-card") as HTMLElement | null;
    if (!card) return;
    popupHoverStart = Date.now();
    popupHoverMeta = getPopupMeta(card);

    track({
      name: "popup_hover_enter",
      ts: popupHoverStart,
      featureTitle: popupHoverMeta.title,
      featureUrl: popupHoverMeta.url,
    });
  });

// Track leaving popup DOM
  document.addEventListener("mouseout", (e) => {
    if ((e.target as HTMLElement).closest(".popup-card")) {
      isOverPopup = false;
      schedulePopupClose();
    }
  popupHoverMeta = {};
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
        lngLat = (e.features![0].geometry as GeoJSON.Point).coordinates as [number, number];

      } else {
        lngLat = (e.features[0].geometry as GeoJSON.Point)
          .coordinates as [number, number];
      }

      if (activePopup) activePopup.remove();

      activePopup = new maplibregl.Popup({
        closeButton: false,
        offset: [20, 0],
        anchor: "left",
      })
        .setLngLat(lngLat)
        .setHTML(`
          <div class="popup-card" data-title="${props.title ?? ""}" data-url="${props.url ?? ""}" role="dialog" aria-label="Map popup for ${props.title}">
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

  const hit = byPlaceId.get(place_id) ?? null;

  if (hit) {
    const props = hit.properties as FeatureProperties;
    const lngLat = featureToLngLat(hit);


      const initialPopup = new maplibregl.Popup({
        offset: [20, 0],
        anchor: "left",
      })
        .setLngLat(lngLat)
        .setHTML(`
        <div class="popup-card" data-title="${props.title ?? ""}"
        data-url="${props.url ?? ""}"
        role="dialog" role="dialog" aria-label="Map popup for ${props.title}">
            <div class="popup-title">${props.title}</div>
            <a href="${props.url}" target="_blank" class="popup-link">
              <strong>Read Article</strong>
            </a>
          </div>
        `)
        .addTo(map);

        
       


if (article_type != "event" && article_type != "poi" && props.bbox) {
    let bboxRaw: any = (props as any).bbox;
    if (typeof bboxRaw === "string") {
      try {
        bboxRaw = JSON.parse(bboxRaw);
      } catch {
        const parts = bboxRaw.split(",").map((s: string) => s.trim());
        if (parts.length === 4 && parts.every(Boolean)) {
          bboxRaw = parts.map(Number);
        }
      }
    }

    let swLng: number | undefined, swLat: number | undefined, neLng: number | undefined, neLat: number | undefined;

    if (Array.isArray(bboxRaw) && bboxRaw.length === 4) {
      [swLng, swLat, neLng, neLat] = bboxRaw.map(Number);
    } else if (bboxRaw && typeof bboxRaw === "object") {
      if (bboxRaw.southwest && bboxRaw.northeast) {
        swLng = Number(bboxRaw.southwest.lng ?? bboxRaw.southwest[0]);
        swLat = Number(bboxRaw.southwest.lat ?? bboxRaw.southwest[1]);
        neLng = Number(bboxRaw.northeast.lng ?? bboxRaw.northeast[0]);
        neLat = Number(bboxRaw.northeast.lat ?? bboxRaw.northeast[1]);
      } else if (bboxRaw.bbox && Array.isArray(bboxRaw.bbox) && bboxRaw.bbox.length === 4) {
        [swLng, swLat, neLng, neLat] = bboxRaw.bbox.map(Number);
      }
    }

    const invalid = [swLng, swLat, neLng, neLat].some((v) => v == null || Number.isNaN(v));
    if (!invalid) {
      map.fitBounds(
        [
          [swLng as number, swLat as number],
          [neLng as number, neLat as number],
        ],
        {
          padding: 60,
          maxZoom: 10,
          duration: 2500,
          easing: (t) => t * t * (3 - 2 * t),
        }
      );
    } else {
      // fallback: center on point (ensure lngLat is [lng, lat] numbers)
      map.easeTo({
        center: lngLat as [number, number],
        zoom: 9,
        duration: 2500,
        easing: (t) => t * t * (3 - 2 * t),
      });
    }
  } else {
    map.easeTo({
      center: lngLat as [number, number],
      zoom: 9,
      duration: 2500,
      easing: (t) => t * t * (3 - 2 * t),
    });
  }
}

    function track(data: Record<string, unknown>) {
      // Placeholder tracking function
      // console.log("Map Interaction Track:", data);
    }


    map.on("dragstart", () => {
      isPanning = true;
      panStartTs = Date.now();
      // const { zoom, center } = getMapState(map);
      track({ name: "pan_start", ts: panStartTs });
    });

    map.on("dragend", () => {
      if (!isPanning) return;
      isPanning = false;
      const ts = Date.now();
      // const { zoom, center } = getMapState(map);
      track({
        name: "pan_end",
        ts,
        durationMs: ts - panStartTs,
      });
    });
  });
}
