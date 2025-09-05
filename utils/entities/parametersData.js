export class ParametersData {
  constructor(data) {
    this.paremeters = {
      client: data.client,
      country: data.country,
      proposalManager: data.proposalManager,
      hT19numberSites: data.ht19NumberSites,
      sitesOutCoverage: data.sitesOutCoverage,
      numberSites: data.numSites,
      remoteSpares: data.remoteSpares.toFixed(2),
      totalSpares: data.totalOfSpares,
      servicePlan: "",
      totalCapacityS17Mbps: data.capacitySes17,
      overbooking: data.overbooking.toFixed(2),
      totalKaBandCapacityMbps: data.cTotalBandaKa,
      averageMbpsSite: data.mbpsProm.toFixed(2),
      solDolar: data.solDolar.toFixed(2),
      terminalUnitPriceExWorks: data.pUTExWorks.toFixed(2),
      costSesKaBandMbpsMonthUsd: data.costBandKaSes,
      costHuguesKaBandMbpsMonthUsd: data.costHBandKa,
      contract: data.contract,
      sitesPenaltiesMonth: data.sitesPenalties.toFixed(2),
      capexFinancingRate: data.rateFinancingCapex.toFixed(2),
      uit: data.uit,
    };
  }

  exportData() {
    return this.paremeters;
  }
}
