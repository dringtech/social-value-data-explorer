INSTALL spatial;
LOAD spatial;


-- SELECT *, geometry as 
-- FROM ST_Read('static/lad22.parquet')
-- WHERE
-- LAD22NM ILIKE 'calderdale'
-- ;

-- SELECT * FROM ST_Drivers();


SELECT
*,
ST_AsGeoJSON(geom) as shape
FROM ST_Read('static/lad22.geojson')
WHERE
LAD22NM ILIKE 'Bradford%';
