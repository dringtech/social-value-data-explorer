-- INSTALL spatial;
-- LOAD spatial;


-- SELECT *, geometry as 
-- FROM ST_Read('static/lad22.parquet')
-- WHERE
-- LAD22NM ILIKE 'calderdale'
-- ;

-- SELECT * FROM ST_Drivers();


-- SELECT
-- { 'lat': LAT, 'lng': LONG }
-- FROM 'static/lad22.parquet'
-- WHERE
-- LAD22NM ILIKE 'Bradford%';

PIVOT (
    SELECT
      geo_code,
      CAST(value AS INTEGER) AS value,
      strftime(date, '%d/%m/%Y') AS date
    FROM read_parquet('static/data.parquet')
    WHERE geo_code == 'E08000035'
    AND variable == 'starts'
  )
  ON geo_code
  USING SUM(value)
  AS starts GROUP BY date;

-- SELECT * FROM glob('static/*');