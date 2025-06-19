export class Operations {
  static unitCost({ object }) {
    const unitCost = object.cost;
    return unitCost;
  }

  static unitPrice(unitCost, marg) {
    const margin = (100 - marg) / 100;
    console.log(marg);
    console.log(margin);
    const unitPrice = unitCost / margin;
    return unitPrice;
  }

  static unitDiscPrice(unitPrice, discount) {
    const unitDiscPrice = unitPrice * (1 - discount);
    return unitDiscPrice;
  }

  static extDiscPrice(tipo, qty, unitDiscPrice, contract) {
    if (tipo === "opex") {
      const extCost = contract * unitDiscPrice * qty;
      return extCost;
    }
    const extCost = unitDiscPrice * qty;
    return extCost;
  }

  static extCost(tipo, qty, unitCost, contract) {
    if (tipo === "opex") {
      const extCost = contract * unitCost * qty;
      return extCost;
    }
    const extCost = unitCost * qty;
    return extCost;
  }

  static monthlyPriceSite(extDiscPrice, numSites, contract) {
    const monthlyPriceSite = extDiscPrice / numSites / contract;
    return monthlyPriceSite;
  }

  static monthlyCostSite(extCost, numSites, contract) {
    const monthlyCostSite = extCost / numSites / contract;
    return monthlyCostSite;
  }

  static monthlyPriceMbps(extDiscPrice, cTotalBandaKa, contract) {
    const monthlyPriceMbps = extDiscPrice / cTotalBandaKa / contract;
    return monthlyPriceMbps;
  }

  static monthlyCostMbps(extCost, cTotalBandaKa, contract) {
    const monthlyCostMbps = extCost / cTotalBandaKa / contract;
    return monthlyCostMbps;
  }

  static financedCapex(
    type,
    finance,
    rateFinancingCapex,
    contract,
    extDiscPrice
  ) {
    if (type === "capex" && finance === "mrc") {
      const paymentPeriod = rateFinancingCapex / 12;
      const financedCapex =
        (extDiscPrice * rateFinancingCapex) /
        (1 - (1 + paymentPeriod) ** -contract);
      return financedCapex;
    }
    return 0;
  }

  static financedMonthlyPriceSite(
    type,
    finance,
    rateFinancingCapex,
    contract,
    extDiscPrice,
    numSites
  ) {
    if (type === "capex" && finance === "capex") {
      const paymentPeriod = rateFinancingCapex / 12;
      const financedCapex =
        (extDiscPrice * rateFinancingCapex) /
        (1 - (1 + paymentPeriod) ** -contract);
      const finalValue = financedCapex / numSites;
      return finalValue;
    }

    if (type === "opex") {
      const finalValue = extDiscPrice / numSites / contract;
      return finalValue;
    }

    return 0;
  }
}
