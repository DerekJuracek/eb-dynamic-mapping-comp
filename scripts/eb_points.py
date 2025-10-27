from sqlalchemy import create_engine
from geopandas import gpd

db_connection_url = "postgresql://postgres:derek@localhost:5432/eb"

con = create_engine(db_connection_url)
sql = "SELECT title, geom, formatted_address, place_id, url, show, lang, zoom, display_type FROM update_map_location"
# sql = "SELECT name, location, show, geom, zoom, lang, top_article, site_url, unique_id FROM locations"
df = gpd.read_postgis(sql, con, geom_col='geom')

df.to_file('../public/gis/eb_locations_all.geojson', driver='GeoJSON')


print('geojson updated!')
