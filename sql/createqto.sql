USE qtos;

CREATE Table Monthly_Cost(
	id_monthly_cost INT AUTO_INCREMENT NOT NULL,
    month_cost_per_site DECIMAL(10,2) NOT NULL,
    month_cost_per_mbps DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(id_monthly_cost)
);

CREATE TABLE Cost_Qto(
	id_cost INT AUTO_INCREMENT NOT NULL,
    id_monthly_cost INT NOT NULL,
    unit_cost DECIMAL(10,2) NOT NULL,
    ext_cost DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(id_cost),
    FOREIGN KEY(id_monthly_cost) REFERENCES Monthly_Cost
);

CREATE TABLE Monthly_Price(
	id_monthly_price INT AUTO_INCREMENT NOT NULL,
    month_price_per_site DECIMAL(10,2) NOT NULL,
    month_price_per_mbps DECIMAL(10,2) NOT NULL,
    financed_month_price_per_site DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(id_monthly_price)
);

CREATE TABLE Price_Qto(
	id_price INT AUTO_INCREMENT NOT NULL,
    id_monthly_price INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    unit_disc_price DECIMAL(10,2) NOT NULL,
    ext_disc_price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(id_price),
    FOREIGN KEY(id_monthly_price) REFERENCES Monthly_Price
);

CREATE TABLE Cost_Price_Qto(
	id_cost_price_qto INT AUTO_INCREMENT NOT NULL,
    id_cost INT NOT NULL,
    id_price INT NOT NULL,
    PRIMARY KEY(id_cost_price_qto),
    FOREIGN KEY(id_cost) REFERENCES Cost_Qto,
    FOREIGN KEY(id_price) REFERENCES Price_Qto
);

CREATE TABLE Category(
	id_category INT AUTO_INCREMENT NOT NULL,
    category VARCHAR(100)
);

CREATE TABLE Subcategory(
	id_subcategory INT AUTO_INCREMENT NOT NULL,
    subcategory VARCHAR(100)
);

CREATE TABLE Cat_Sub_Qto(
	id_cat_sub_qto INT AUTO_INCREMENT NOT NULL,
    id_category INT NOT NULL,
    id_subcategory INT NOT NULL,
    PRIMARY KEY(id_cat_sub_qto),
    FOREIGN KEY(id_category) REFERENCES Category,
    FOREIGN KEY(id_subcategory) REFERENCES Subcategory
);

CREATE TABLE Qto(
	id_qto INT AUTO_INCREMENT NOT NULL,
    id_cat_sub_qto INT NOT NULL,
    id_cost_price_qto INT NOT NULL,
    id_group_manufacturer INT NOT NULL,
    type VARCHAR(25) NOT NULL,
    product_code VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    finance VARCHAR(25) NOT NULL,
    owner VARCHAR(25) NOT NULL,
    profit_margin INT NOT NULL,
    unit_measure VARCHAR(25) NOT NULL,
	qty INT NOT NULL,
    discount INT NOT NULL,
    financed_capex DECIMAL(10,2) NOT NULL
);

CREATE TABLE Group_Manufacturer_Qto(
	id_group_manufacturer INT NOT NULL,
    manufacturer_part VARCHAR(225) NOT NULL,
    FOREIGN KEY(manufacturer_part) REFERENCES materials(material_number)
);

CREATE TABLE Group_Qto_File(
	id_group_qto_file INT NOT NULL,
    id_qto INT NOT NULL,
    FOREIGN KEY(id_qto) REFERENCES Qto
);



CREATE TABLE Group_Input_Qto(
	id_group_input_qto INT AUTO_INCREMENT NOT NULL,
    
)