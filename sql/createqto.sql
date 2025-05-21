USE qto;

CREATE Table Monthly_Cost(
	id_monthly_cost INT AUTO_INCREMENT NOT NULL,
    month_cost_per_site DECIMAL(10,2) NOT NULL,
    month_cost_per_mbps DECIMAL(10,2) NOT NULL
);

CREATE TABLE Cost_Qto(
	id_cost INT AUTO_INCREMENT NOT NULL,
    id_monthly_cost INT NOT NULL,
    unit_cost DECIMAL(10,2) NOT NULL,
    ext_cost DECIMAL(10,2) NOT NULL
);

CREATE TABLE Monthly_Price(
	id_monthly_price INT AUTO_INCREMENT NOT NULL,
    month_price_per_site DECIMAL(10,2) NOT NULL,
    month_price_per_mbps DECIMAL(10,2) NOT NULL,
    financed_month_price_per_site DECIMAL(10,2) NOT NULL
);

CREATE TABLE Price_Qto(
	id_price INT AUTO_INCREMENT NOT NULL,
    id_monthly_price INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    unit_disc_price DECIMAL(10,2) NOT NULL,
    ext_disc_price DECIMAL(10,2) NOT NULL
)