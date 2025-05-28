USE Qtos;

DROP TABLE IF EXISTS Parameters;

CREATE TABLE Parameters(
	id_input INT AUTO_INCREMENT NOT NULL,
    client VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL,
    proposal_manager VARCHAR(100) NOT NULL,
    hughes_T19_sites INT NOT NULL,
    sites_out_coverage INT NOT NULL,
    number_sites INT NOT NULL,
    remote_spares DECIMAL(5,2) NOT NULL,
    total_spares INT NOT NULL,
    service_plan VARCHAR(50) NOT NULL,
    total_capacity_SES_17_mbps INT NOT NULL,
    average_mbps_per_site DECIMAL(3,1) NOT NULL,
    value_sol_dolar DECIMAL(4,2) NOT NULL,
    terminal_unit_price_ex_works_usa DECIMAL(4,1) NOT NULL,
    cost_SES_ka_band_mbps_month_usd INT NOT NULL,
    cost_hughes_ka_band_mbps_month_usd INT NOT NULL,
    contract INT NOT NULL,
    sites_with_penalties_month DECIMAL(5,2) NOT NULL,
    capex_financing_rate DECIMAL(5,2) NOT NULL,
    uit INT NOT NULL,
    PRIMARY KEY(id_input)
);