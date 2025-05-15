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

SELECT * FROM cost_total;

-- Alterar la tabla materials
ALTER TABLE materials ADD cod_cost INT;

UPDATE materials AS M
inner join cost_total CT ON CT.material_number = M.material_number
SET M.cod_cost = CT.cod_cost
WHERE CT.material_number = M.material_number;

ALTER TABLE materials 
MODIFY cod_cost INT NOT NULL;

ALTER TABLE materials 
ADD constraint cod_cost
FOREIGN KEY(cod_cost)
REFERENCES cost_total(cod_cost);

ALTER TABLE materials
DROP cost_value;

-- ALTERAR la tabla cost_total
ALTER TABLE cost_total
ADD cost DECIMAL(10,2);

UPDATE cost_total AS CT
inner join costing_report CR ON CR.material_number = CT.material_number
SET CT.cost = CR.material_cost
WHERE CR.material_number = CT.material_number;

ALTER TABLE cost_total
MODIFY cost DECIMAL(10,2) NOT NULL;

ALTER TABLE cost_total
DROP FOREIGN KEY cost_total_ibfk_1;

ALTER TABLE cost_total
DROP material_number;

RENAME TABLE cost_total TO materials_cost;
