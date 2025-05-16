
use QTOS;

SELECT * FROM materials
order by description ASC;

SELECT * FROM profit_center;
SELECT cod_profit, profit_value FROM profit_center
ORDER BY cod_profit ASC;

SELECT * FROM costing_report LIMIT 5;
SELECT * FROM profit_center LIMIT 5;
SELECT * FROM materials LIMIT 5;
SELECT * FROM material_cost LIMIT 5;

SELECT count(costing_date) FROM cost_total
WHERE costing_date = costing_date;

SELECT CONSTRAINT_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_NAME = 'material_cost'
  AND TABLE_SCHEMA = 'qtos'
  AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT costing_date,cost,cost_total_value FROM materials_cost
WHERE cod_cost =(SELECT cod_cost FROM materials WHERE material_number = '000000000001025905');

SELECT * FROM costing_report WHERE material_number = '000000000008018891';
