use QTOS;

SELECT * FROM costing_report;

SELECT COUNT(DISTINCT material_number) FROM costing_report;

-- Insertar Datos en profit_center
INSERT INTO profit_center(profit_value)
SELECT DISTINCT profit_center
from costing_report;

-- DROP TABLE cost_total;
-- DROP TABLE materials;
-- DROP TABLE profit_center; 

SELECT * FROM profit_center;
SELECT cod_profit, profit_value FROM profit_center
ORDER BY cod_profit ASC;

-- Insertar datos de materials
INSERT INTO materials(material_number, cost_value, description,cod_profit)
SELECT CR.material_number, CR.material_cost, CR.description , PC.cod_profit
FROM costing_report AS CR
INNER JOIN profit_center PC ON CR.profit_center = PC.profit_value
WHERE PC.profit_value = CR.profit_center;

-- DROP TABLE materials;

SELECT * FROM materials;

-- Insertar datos en cost_total
INSERT INTO cost_total(material_number, costing_date, pls, cost_total_value)
SELECT material_number, costing_date, pls, cost_total
FROM costing_report;

SELECT * FROM cost_total




