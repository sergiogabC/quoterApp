export class ParametersPrimary {
  constructor(contract) {
    // this.client = client;
    // this.country = country;
    // this.proposalManager = proposalManager;
    // this.ht19NumberSites = ht19NumberSites;
    // this.sitesOutCoverage = sitesOutCoverage;
    // this.numSites = numSites;
    // this.remoteSpares = remoteSpares;
    // this.totalOfSpares = totalOfSpares;
    // this.capacitySes17 = capacitySes17;
    // this.overbooking = overbooking;
    // this.cTotalBandaKa = cTotalBandaKa;
    // this.mbpsProm = mbpsProm;
    // this.solDolar = solDolar;
    // this.pUTExWorks = pUTExWorks;
    // this.costBandKaSes = costBandKaSes;
    // this.costHBandKa = costHBandKa;
    this.contract = contract;
    // this.sitesPenalties = sitesPenalties;
    // this.rateFinancingCapex = rateFinancingCapex;
    // this.uit = UIT;
    //this.discount = discount;
  }

  mostrarUsuario() {
    console.log("El Cliente es: " + this.client);
    console.log("El país es: " + this.country);
    console.log("El gerente de propuestas es: " + this.proposalManager);
  }
}
