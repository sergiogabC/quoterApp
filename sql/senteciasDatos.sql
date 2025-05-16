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
INSERT INTO materials(material_number, description,cod_profit)
SELECT CR.material_number, CR.description , PC.cod_profit
FROM costing_report AS CR
INNER JOIN profit_center PC ON CR.profit_center = PC.profit_value
WHERE PC.profit_value = CR.profit_center;

-- DROP TABLE materials;

SELECT * FROM materials;

-- Insertar datos en material_cost
INSERT INTO material_cost(material_number, cost, costing_date, pls, cost_total_value)
SELECT material_number, material_cost, costing_date, pls, cost_total
FROM costing_report;

SELECT * FROM material_cost;

-- Alterar la tabla materials
ALTER TABLE materials ADD cod_cost INT;

UPDATE materials AS M
inner join material_cost MC ON MC.material_number = M.material_number
SET M.cod_cost = MC.cod_cost
WHERE MC.material_number = M.material_number;

ALTER TABLE materials 
MODIFY cod_cost INT NOT NULL;

ALTER TABLE materials 
ADD constraint cod_cost
FOREIGN KEY(cod_cost)
REFERENCES material_cost(cod_cost);

SELECT * FROM materials;

-- ALTERAR la tabla cost_total

ALTER TABLE material_cost
DROP FOREIGN KEY material_cost_ibfk_1;

ALTER TABLE material_cost
DROP material_number;
