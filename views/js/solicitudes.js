//---Preview Results----
document.addEventListener("DOMContentLoaded", () => {
  const btnCalcular = document.getElementById("calcular");
  const tbodyRows = document.getElementById("tbodyRows");
  const tbodyRowsResults = document.getElementById("tbodyRowsResults");
  const arraysTrs = tbodyRows.children;
  const arraysTrsResults = tbodyRowsResults.children;
  const divTableRowParams = document.getElementById("divTableRowParams");
  const divParams = document.getElementById("divParams");

  const formParametros = document.getElementById("formParametros");

  formParametros.addEventListener("click", async (e) => {
    if (divTableRowParams.contains(e.target) || divParams.contains(e.target)) {
      formParametros.addEventListener("input", async () => {
        const numSites = document.getElementById("numSites").value;
        const capBandKa = document.getElementById("cTotalBandaKa").value;
        const contract = document.getElementById("contract").value;
        const rateCapex = document.getElementById("rateFinancingCapex").value;

        console.log("ArraysTrs ", arraysTrs);

        for (let tr of arraysTrs) {
          console.log("tr: ", tr);
          let numId = tr.id.replace("tr", "");
          const type = tr.children[1].children[0].value;
          console.log(type);
          const manufacturerPart = tr.children[4].children[0].value;
          console.log(manufacturerPart);
          const margin = tr.children[5].children[0].value;
          console.log(margin);
          const qty = tr.children[8].children[0].value;
          console.log(qty);
          const discount = tr.children[10].children[0].value;
          console.log(discount);
          const finc = tr.children[11].children[0].value;
          console.log(finc);

          const dataObject = await fetch("/results", {
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

          document.getElementById(`resCost${numId}`).innerText =
            dataObject.unitCost;
          document.getElementById(`resExtCost${numId}`).innerText =
            dataObject.extCost;
          document.getElementById(`resUnitPrice${numId}`).innerText =
            dataObject.unitPrice;
          document.getElementById(`resUnitDiscPrice${numId}`).innerText =
            dataObject.unitDiscPrice;
          document.getElementById(`resExtDiscPrice${numId}`).innerText =
            dataObject.extDiscPrice;
          document.getElementById(`resMonthlyCostSite${numId}`).innerText =
            dataObject.monthlyCostSite;
          document.getElementById(`resMonthlyPriceSite${numId}`).innerText =
            dataObject.monthlyPriceSite;
          document.getElementById(`resMonthlyCostMbps${numId}`).innerText =
            dataObject.monthlyCostMbps;
          document.getElementById(`resMonthlyPriceMbps${numId}`).innerText =
            dataObject.monthlyPriceMbps;
          document.getElementById(`resFinancedCapex${numId}`).innerText =
            dataObject.financedCapex;
          document.getElementById(
            `resFinancedMonthlyPriceSite${numId}`
          ).innerText = dataObject.financedMonthlyPriceSite;
        }

        console.log("ArraysTrsResults: ", arraysTrsResults);
      });
    }
  });
});
