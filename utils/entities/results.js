export class Results {
  constructor(
    cost,
    unitPrice,
    unitDiscPrice,
    extDiscPrice,
    extCost,
    monthlyPriceSite,
    monthlyCostSite,
    monthlyPriceMbps,
    monthlyCostMbps,
    financedCapex,
    financedMonthlyPriceSite
  ) {
    this.unitCost = cost.toFixed(2);
    this.unitPrice = unitPrice.toFixed(2);
    this.unitDiscPrice = unitDiscPrice.toFixed(2);
    this.extDiscPrice = extDiscPrice.toFixed(2);
    this.extCost = extCost.toFixed(2);
    this.monthlyPriceSite = monthlyPriceSite.toFixed(2);
    this.monthlyCostSite = monthlyCostSite.toFixed(2);
    this.monthlyPriceMbps = monthlyPriceMbps.toFixed(2);
    this.monthlyCostMbps = monthlyCostMbps.toFixed(2);
    this.financedCapex = financedCapex.toFixed(2);
    this.financedMonthlyPriceSite = financedMonthlyPriceSite.toFixed(2);
  }
}
