use QTOS;

SELECT * FROM costing_report;

-- Insertar Datos en profit_center
INSERT INTO profit_center(profit_value)
SELECT DISTINCT profit_center
from costing_report;

DROP TABLE materials;
DROP TABLE profit_center; 

SELECT * FROM profit_center;

-- Insertar datos de material_cost
INSERT INTO material_cost(cost_value, costing_date, pls, cost_total_value)
SELECT material_cost, costing_date, pls, cost_total
FROM costing_report;

SELECT * FROM material_cost;

-- Insertar datos en materials
INSERT INTO materials(material_number, description, cod_cost, cod_profit)
SELECT
(SELECT material_number, description FROM costing_report), 
(SELECT cod_cost FROM material_cost WHERE material_cost.cost_total_value = costing_report.cost_total AND material_cost.costing_date = costing_report),
(SELECT cod_profit FROM profit_center);


-- USE QTOS;

-- SELECT count(distinct cost_total) as costo_total_distinct, count(cost_total) as costo_total FROM costing_report;

-- SELECT count(distinct costing_date ) as costo_total_distinct, count(costing_date) as costo_total FROM costing_report;

-- SELECT COUNT(DISTINCT cost_total) FROM costing_report
-- WHERE cost_total in(
-- 	SELECT distinct costing_date FROM costing_report
-- );

