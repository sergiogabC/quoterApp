export class Operations {
  static unitPrice(unitCost, marg) {
    if (unitCost === 0) {
      console.log("fUnitPrice:El costo recibido es 0");
      return 0;
    }
    let margin = (100 - marg) / 100;
    let unitPrice = unitCost / margin;
    return unitPrice;
  }

  static unitDiscPrice(unitPrice, dis) {
    if (unitPrice === 0) {
      console.log("fUnitDiscPrice: el unitPrice recibido es 0");
      return 0;
    }
    let discount = dis / 100;
    let unitDiscPrice = unitPrice * (1 - discount);
    return unitDiscPrice;
  }

  static extDiscPrice(tipo, qty, unitDiscPrice, contract) {
    if (unitDiscPrice === 0) {
      console.log(
        "fExtDiscPric: El Precio Unitario con descuento recibido es 0"
      );
      return 0;
    }
    if (tipo !== "") {
      switch (tipo) {
        case "OPEX": {
          let extDiscPrice = contract * unitDiscPrice * qty;
          return extDiscPrice;
        }
        case "CAPEX": {
          let extDiscPrice = unitDiscPrice * qty;
          return extDiscPrice;
        }
        default: {
          console.log("fExtDiscPrice: No se encuentra el tipo");
          return 0;
        }
      }
    }

    console.log("fExtDiscPrice: No se a especificado el tipo");
    return 0;
  }

  static extCost(tipo, qty, unitCost, contract) {
    if (unitCost === 0) {
      console.log("fExtCost: El Costo Unitario recibido es 0");
      return 0;
    }
    if (tipo !== "" || tipo !== null || typeof tipo !== "undefined") {
      switch (tipo) {
        case "OPEX": {
          let extCost = contract * unitCost * qty;
          return extCost;
        }
        case "CAPEX": {
          let extCost = unitCost * qty;
          return extCost;
        }
      }
      console.log("fExtCost: No se encuentra el tipo");
      return 0;
    }
    console.log("fExtCost: No se a especificado el tipo");
    return 0;
  }

  static monthlyPriceSite(extDiscPrice, numSites, contract) {
    if (extDiscPrice === 0) {
      console.log(
        "fMonthlyPriceSite: El precio con descuento extendido recibido es 0"
      );
      return 0;
    }
    let monthlyPriceSite = extDiscPrice / numSites / contract;
    return monthlyPriceSite;
  }

  static monthlyCostSite(extCost, numSites, contract) {
    if (extCost === 0) {
      console.log("fMonthlyCostSite: El costo extendido recibido es 0");
      return 0;
    }
    let monthlyCostSite = extCost / numSites / contract;
    return monthlyCostSite;
  }

  static monthlyPriceMbps(extDiscPrice, cTotalBandaKa, contract) {
    if (extDiscPrice === 0) {
      console.log(
        "fMonthlyPriceMbps: El precio con descuento extendido recibido es 0"
      );
      return 0;
    }
    let monthlyPriceMbps = extDiscPrice / cTotalBandaKa / contract;

    return monthlyPriceMbps;
  }

  static monthlyCostMbps(extCost, cTotalBandaKa, contract) {
    if (extCost === 0) {
      console.log("fMontlhyCostMbps: El costo extendido recibido es 0");
      return 0;
    }
    let monthlyCostMbps = extCost / cTotalBandaKa / contract;
    return monthlyCostMbps;
  }

  static financedCapex(
    type,
    finance,
    rateFinancingCapex,
    contract,
    extDiscPrice
  ) {
    if (extDiscPrice === 0) {
      console.log("fFinancedCapex: El precio extendido recibido es 0");
      return 0;
    }
    if (rateFinancingCapex <= 0) {
      console.log("fFinancedCapex: La tasa de financiamiento de es 0");
      return 0;
    }
    switch (type) {
      case "": {
        if (finance === "") {
          console.log("fFinancedCapex: No se a especificado el finance");
          return 0;
        }
        console.log("fFinancedCapex: No se a especificado el tipo");
        return 0;
      }
      case "CAPEX": {
        if (finance === "MRC") {
          let paymentPeriod = rateFinancingCapex / 12;
          let financedCapex =
            (extDiscPrice * rateFinancingCapex) /
            (1 - (1 + paymentPeriod) ** -contract);
          return financedCapex;
        }
        console.log("fFinancedCapex: No se a especificado el finance");
        return 0;
      }
      default: {
        console.log("fFinancedCapex: El tipo no encontrado");
        return 0;
      }
    }
  }

  static financedMonthlyPriceSite(
    type,
    finance,
    rateFinancingCapex,
    contract,
    extDiscPrice,
    numSites
  ) {
    if (extDiscPrice === 0) {
      console.log(
        "fFinancedMonthlyPriceSite: El precio con descuento extendido es 0"
      );
      return 0;
    }

    switch (type) {
      case "": {
        if (finance === "") {
          console.log(
            "fFinancedMonthlyPriceSite: No se a especificado  el finance"
          );
          return 0;
        }
        console.log("fFinancedMonthlyPriceSite: No se a especificado  el tipo");
        return 0;
      }
      case "CAPEX": {
        if (finance === "MRC") {
          let paymentPeriod = rateFinancingCapex / 12;
          let financedCapex =
            (extDiscPrice * rateFinancingCapex) /
            (1 - (1 + paymentPeriod) ** -contract);
          let finalValue = financedCapex / numSites;
          return finalValue;
        }
        return 0;
      }
      case "OPEX": {
        let finalValue = extDiscPrice / numSites / contract;
        return finalValue;
      }
      default: {
        console.log("fFinancedMonthlyPriceSite: Tipo no encontrado");
        return 0;
      }
    }
  }
}
