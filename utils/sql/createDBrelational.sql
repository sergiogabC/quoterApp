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

SELECT * FROM profit_center;

CREATE TABLE materials (
	material_number VARCHAR(225) NOT NULL,
    cod_profit INT NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY(material_number),
    FOREIGN KEY(cod_profit) REFERENCES profit_center(cod_profit)
);

CREATE TABLE material_cost(
	cod_cost INT AUTO_INCREMENT NOT NULL,
    material_number VARCHAR(225) NOT NULL,
    cost DECIMAL(10,2) NOT NULL,
    costing_date DATE NOT NULL,
    pls DECIMAL(4,3) NOT NULL,
    cost_total_value DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(cod_cost),
    FOREIGN KEY(material_number) REFERENCES materials(material_number)
);

