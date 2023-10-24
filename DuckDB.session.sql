SELECT *
FROM 'static/places.parquet'
WHERE
name ILIKE 'HEBDEN BRIDGE%'
AND
"feature code" LIKE 'PPL%'
;