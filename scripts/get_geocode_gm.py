import googlemaps
import pandas as pd
import geopandas as gpd
from datetime import datetime
from shapely.geometry import Point, box


gmaps = googlemaps.Client(key='AIzaSyC5UVpf6Zs7vWw4Pa_XXnoinoePOSR4iAQ')
# geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')

# this can be uploaded to a database or saved as a postgis table to ingest
# keep as csv for now
df = pd.read_csv('../app/data/dynamic_map_locations.csv')
print(df.head())

titles = df["title"]
title_dict = titles.to_dict()
results = []
for i, row in df.iterrows():
    title = row['title']
    identifier = row['identifier']
    geocode_val = f"{title}, {identifier}"
    
    geocode_result = gmaps.geocode(geocode_val)
    failed_geocodes = []

    if geocode_result:
        result = {}
        result['title'] = title
        result['identifier'] = identifier
        result['name'] = geocode_result[0]["address_components"][0]['long_name']
        result["geom"] = geocode_result[0]['geometry']['location']
        result["bbox"] = geocode_result[0]['geometry']['viewport']
        result["formatted_address"] = geocode_result[0]['formatted_address']
        result["place_id"] = geocode_result[0]['place_id']
        result["url"] = df['URL'].iloc[i]
        results.append(result)
    else:
        failed_geocodes.append(geocode_val)
        print(f"Geocode failed for: {geocode_val}")

if len(results) > 0:
    df = pd.DataFrame(results)
    # print(df.head())

    # --- 1️⃣ Create point geometries ---
    df["point_geom"] = df["geom"].apply(lambda g: Point(g["lng"], g["lat"]))

    # --- 2️⃣ Create bbox polygon geometries (if bbox exists) ---
    if "bbox" in df.columns:
        df["bbox_geom"] = df["bbox"].apply(
            lambda b: box(
                b["southwest"]["lng"],
                b["southwest"]["lat"],
                b["northeast"]["lng"],
                b["northeast"]["lat"],
            ) if isinstance(b, dict) and "southwest" in b and "northeast" in b else None
        )
        # print(df["bbox_geom"].head())
    else:
        df["bbox_geom"] = None

    # --- 3️⃣ Build GeoDataFrame ---
    gdf = gpd.GeoDataFrame(
        df,
        geometry="point_geom",  # Default geometry
        crs="EPSG:4326"
    )


    gdf.to_file('../public/gis/eb_locations_all.geojson', driver='GeoJSON')
    gdf.to_csv('map_locations.csv', index=False)
# next work on converting to geojson
# df to geodf then geojson with geopandas?
# store and reference in app and compare the twofiles