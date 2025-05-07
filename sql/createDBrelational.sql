DROP  DATABASE IF EXISTS QTOS;

CREATE DATABASE QTOS;

USE qtos;

CREATE TABLE costing_report 
(
	material_number VARCHAR(225) NOT NULL,
    description VARCHAR(225) NOT NULL,
    profit_center VARCHAR(50) NOT NULL,
    costing_date DATE NOT NULL,
    material_cost DECIMAL(10,2) NOT NULL,
    pls DECIMAL(4,3) NOT NULL,
    cost_total DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(material_number)
);

select * FROM costing_report;

CREATE TABLE profit_center(
	cod_profit INT AUTO_INCREMENT NOT NULL,
    profit_value VARCHAR(15) UNIQUE NOT NULL,
    PRIMARY KEY(cod_profit)
);

CREATE TABLE material_cost(
	cod_cost INT AUTO_INCREMENT NOT NULL,
    cost_value DECIMAL(8,2) NOT NULL,
    costing_date DATE NOT NULL,
    pls DECIMAL(4,3) NOT NULL,
    cost_total_value DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(cod_cost)
);

CREATE TABLE materials (
	material_number VARCHAR(225) NOT NULL,
    cod_cost INT NOT NULL,
    cod_profit INT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY(cod_profit) REFERENCES profit_center,
    FOREIGN KEY(cod_cost) REFERENCES material_cost,
    PRIMARY KEY(material_number)
);

-- ALTER TABLE materials 
-- ADD material_number BINARY(16)
