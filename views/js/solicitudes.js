//---Preview Results----
document.addEventListener("DOMContentLoaded", () => {
  const btnCalcular = document.getElementById("calcular");

  btnCalcular.addEventListener("click", async () => {
    const numSites = document.getElementById("numSites").value;
    const capBandKa = document.getElementById("cTotalBandaKa").value;
    const contract = document.getElementById("contract").value;
    const rateCapex = document.getElementById("rateFinancingCapex").value;
    const type = document.getElementById("type").value;
    const manufacturerPart = document.getElementById("manufacturerPart").value;
    const margin = document.getElementById("margin").value;
    const qty = document.getElementById("qty").value;
    const discount = document.getElementById("discount").value;
    const finc = document.getElementById("finance").value;

    const response = await fetch("/results", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        numSites: numSites,
        cTotalBandaKa: capBandKa,
        contract: contract,
        rateFinancingCapex: rateCapex,
        type: type,
        manufacturerPart: manufacturerPart,
        margin: margin,
        qty: qty,
        discount: discount,
        finance: finc,
      }),
    }).then((data) => data.json());

    console.log(response);
    //const dataObject = await data.then((data) => JSON.parse(data));

    //   console.log(dataObject);
    //   document.getElementById("resCost").innerText = dataObject.cost;
    //   document.getElementById("resExtCost").innerText = dataObject.extCost;
    //   document.getElementById("resUnitPrice").innerText = dataObject.unitPrice;
    //   document.getElementById("resUnitDiscPrice").innerText =
    //     dataObject.unitDiscPrice;
    //   document.getElementById("resExtDiscPrice").innerText =
    //     dataObject.extDiscPrice;
    //   document.getElementById("resMonthlyCostSite").innerText =
    //     dataObject.monthlyCostSite;
    //   document.getElementById("resMonthlyPriceSite").innerText =
    //     dataObject.monthlyPriceSite;
    //   document.getElementById("resMonthlyCostMbps").innerText =
    //     dataObject.monthlyCostMbps;
    //   document.getElementById("resMonthlyPriceMbps").innerText =
    //     dataObject.monthlyPriceMbps;
    //   document.getElementById("resFinancedCapex").innerText =
    //     dataObject.financedCapex;
    //   document.getElementById("resFinancedMonthlyPriceSite").innerText =
    //     dataObject.financedMonthlyPriceSite;
  });
});
