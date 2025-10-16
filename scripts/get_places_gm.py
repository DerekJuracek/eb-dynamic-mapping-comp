import googlemaps
import pandas as pd
import geopandas as gpd
from datetime import datetime



# geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')

# this can be uploaded to a database or saved as a postgis table to ingest
# keep as csv for now
df = pd.read_csv('../app/data/map_locations.csv')

titles = df["title"]
title_dict = titles.to_dict()
results = []

for i,v in title_dict.items():
    # if i == 0:
    geocode_result = gmaps.geocode(v)
    # print(geocode_result)
    # print(type(geocode_result))
# need to get results in a list of dicts
# dicts can contain keys such as location, lat, lng, name, address, bbox, place_id
    if geocode_result:
        result = {}
        result['title'] = geocode_result[0]["address_components"][0]['long_name']
        result["geometry"] = geocode_result[0]['geometry']['location']
        result["bbox"] = geocode_result[0]['geometry']['viewport']
        result["formatted_address"] = geocode_result[0]['formatted_address']
        result["place_id"] = geocode_result[0]['place_id']
        results.append(result)

if len(results) > 0:
    df = pd.DataFrame(results)
    print(df.head())
gdf = gpd.GeoDataFrame(
    df, geometry=gpd.points_from_xy(df['geometry'].apply(lambda x: x['lng']), df['geometry'].apply(lambda x: x['lat'])))


gdf.to_file('../public/gis/eb_locations_all.geojson', driver='GeoJSON')
# next work on converting to geojson
# df to geodf then geojson with geopandas?
# store and reference in app and compare the twofiles