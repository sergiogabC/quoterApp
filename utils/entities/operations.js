import { verified } from "../verified.js";

export class Operations {
  static unitPrice(unitCost, marg) {
    if (verified(unitCost)) {
      console.warn("fUnitPrice:El valor recibido recibido es 0");
      return 0;
    }

    let margin = marg === 0 ? 0 : marg / 100;
    let unitPrice = unitCost / (1 - margin);
    return unitPrice;
  }

  static unitDiscPrice(unitPrice, dis) {
    if (verified(unitPrice)) {
      console.warn("fUnitDiscPrice: el valor recibido es 0");
      return 0;
    }
    let discount = dis / 100;
    let unitDiscPrice = unitPrice * (1 - discount);
    return unitDiscPrice;
  }

  static extDiscPrice(tipo, qty, unitDiscPrice, contract) {
    if (verified(qty, unitDiscPrice, contract)) {
      console.warn("fExtDiscPric: El valor recibido es 0");
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
          console.warn("fExtDiscPrice: No se encuentra el tipo");
          return 0;
        }
      }
    }

    console.warn("fExtDiscPrice: No se a especificado el tipo");
    return 0;
  }

  static extCost(type, qty, unitCost, contract) {
    if (verified(qty, unitCost, contract)) {
      console.warn("fExtCost: El valor recibido es 0");
      return 0;
    }

    switch (type) {
      case "OPEX": {
        let extCost = contract * unitCost * qty;
        return extCost;
      }
      case "CAPEX": {
        let extCost = unitCost * qty;
        return extCost;
      }
      default: {
        console.warn("fExtCost: No se encuentra el tipo");
        return 0;
      }
    }

    console.warn("fExtCost: No se a especificado el tipo");
    return 0;
  }

  static monthlyPriceSite(extDiscPrice, numSites, contract) {
    if (verified(extDiscPrice, numSites, contract)) {
      console.warn("fMonthlyPriceSite: El valor recibido es 0");
      return 0;
    }
    let monthlyPriceSite = extDiscPrice / numSites / contract;
    return monthlyPriceSite;
  }

  static monthlyCostSite(extCost, numSites, contract) {
    if (verified(extCost, numSites, contract)) {
      console.warn("fMonthlyCostSite: El valor recibido es 0");
      return 0;
    }
    let monthlyCostSite = extCost / numSites / contract;
    return monthlyCostSite;
  }

  static monthlyPriceMbps(extDiscPrice, cTotalBandaKa, contract) {
    if (verified(extDiscPrice, cTotalBandaKa, contract)) {
      console.warn("fMonthlyPriceMbps: El valor recibido es 0");
      return 0;
    }
    let monthlyPriceMbps = extDiscPrice / cTotalBandaKa / contract;

    return monthlyPriceMbps;
  }

  static monthlyCostMbps(extCost, cTotalBandaKa, contract) {
    if (verified(extCost, cTotalBandaKa, contract)) {
      console.warn("fMontlhyCostMbps: El valor recibido es 0");
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
    if (verified(contract, extDiscPrice)) {
      console.warn("fFinancedCapex: El valor ingresado es 0");
      return 0;
    }

    switch (type) {
      case "": {
        if (finance === "") {
          console.warn("fFinancedCapex: No se a especificado el finance");
          return 0;
        }
        console.warn("fFinancedCapex: No se a especificado el tipo");
        return 0;
      }
      case "CAPEX": {
        if (finance === "MRC") {
          if (rateFinancingCapex === 0) {
            console.warn("fFinancedCapex: La tasa de financiamiento de es 0");
            let financedCapex = extDiscPrice / contract;
            return financedCapex;
          }
          let i = rateFinancingCapex / 100 / 12;
          let financedCapex =
            (extDiscPrice * i * (1 + i) ** contract) /
            ((1 + i) ** contract - 1);
          return financedCapex;
        }
        console.warn("fFinancedCapex: No se a especificado el finance");
        return 0;
      }
      default: {
        console.warn("fFinancedCapex: El tipo no encontrado");
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
    if (verified(extDiscPrice, contract, numSites)) {
      console.warn("FfinancedMonthlyPriceSite: el valor ingresado es 0");
      return 0;
    }

    switch (type) {
      case "": {
        if (finance === "") {
          console.warn(
            "fFinancedMonthlyPriceSite: No se a especificado  el finance"
          );
          return 0;
        }
        console.warn(
          "fFinancedMonthlyPriceSite: No se a especificado  el tipo"
        );
        return 0;
      }
      case "CAPEX": {
        if (finance === "MRC") {
          if (rateFinancingCapex === 0) {
            console.warn(
              "fFinancedMonthlyPriceSite: La tasa de financiamiento es 0"
            );
            let financed = extDiscPrice / contract;
            let financedXsite = financed / numSites;
            return financedXsite;
          }
          let i = rateFinancingCapex / 100 / 12;
          let financed =
            (extDiscPrice * i * (1 + i) ** contract) /
            ((1 + i) ** contract - 1);
          let financedXsite = financed / numSites;
          return financedXsite;
        }
        return 0;
      }
      case "OPEX": {
        let financedXSite = extDiscPrice / numSites / contract;
        return financedXSite;
      }
      default: {
        console.warn("fFinancedMonthlyPriceSite: Tipo no encontrado");
        return 0;
      }
    }
  }
}
