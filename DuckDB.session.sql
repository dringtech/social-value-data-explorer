INSTALL spatial;
LOAD spatial;


-- SELECT *, geometry as 
-- FROM ST_Read('static/lad22.parquet')
-- WHERE
-- LAD22NM ILIKE 'calderdale'
-- ;

-- SELECT * FROM ST_Drivers();


SELECT
{ 'lat': LAT, 'lng': LONG }
FROM 'static/lad22.parquet'
WHERE
LAD22NM ILIKE 'Bradford%';
