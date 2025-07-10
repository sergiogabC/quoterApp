//---Preview Results----
document.addEventListener("DOMContentLoaded", () => {
  const divTableRowParams = document.getElementById("divTableRowParams");
  const divParams = document.getElementById("divParams");
  const formParametros = document.getElementById("formParametros");
  const listNames = [
    "numSites",
    "cTotalBandaKa",
    "contract",
    "rateFinancingCapex",
    "type",
    "manufacturerPart",
    "margin",
    "qty",
    "discount",
    "finance",
  ];
  let cont = 0;

  formParametros.addEventListener("input", async (e) => {
    if (
      e.target.tagName === "INPUT" &&
      listNames.find((value) => value === e.target.attributes.name.value)
    ) {
      cont++;
      console.log("cont: ", cont);
      console.log("input: ", e.target);
      let tr = e.target.closest("tr");
      let numId = tr.id.replace("tr", "");
      const numCer = "0.00";
      const valueMax = "99";

      const manufacturerPart = document.getElementById(
        `manufacturerPart${numId}`
      ).value;

      if (manufacturerPart === "") {
        document.getElementById(`resCost${numId}`).innerText = numCer;
        document.getElementById(`resExtCost${numId}`).innerText = numCer;
        document.getElementById(`resUnitPrice${numId}`).innerText = numCer;
        document.getElementById(`resUnitDiscPrice${numId}`).innerText = numCer;
        document.getElementById(`resExtDiscPrice${numId}`).innerText = numCer;
        document.getElementById(`resMonthlyCostSite${numId}`).innerText =
          numCer;
        document.getElementById(`resMonthlyPriceSite${numId}`).innerText =
          numCer;
        document.getElementById(`resMonthlyCostMbps${numId}`).innerText =
          numCer;
        document.getElementById(`resMonthlyPriceMbps${numId}`).innerText =
          numCer;
        document.getElementById(`resFinancedCapex${numId}`).innerText = numCer;
        document.getElementById(
          `resFinancedMonthlyPriceSite${numId}`
        ).innerText = numCer;
        return;
      }

      const resOk = await fetch("/exists", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ manufacturerPart: manufacturerPart }),
      }).then((val) => val.json());

      if (resOk.complete) {
        const numSites = document.getElementById("numSites").value;
        const capBandKa = document.getElementById("cTotalBandaKa").value;
        const contract = document.getElementById("contract").value;
        const rateCapex = document.getElementById("rateFinancingCapex").value;
        const type = document.getElementById(`type${numId}`).value;
        const margin = document.getElementById(`margin${numId}`).value;
        const qty = document.getElementById(`qty${numId}`).value;
        const discount = document.getElementById(`discount${numId}`).value;
        const finc = document.getElementById(`finance${numId}`).value;

        switch (true) {
          case margin >= 100:
            alert("Valor Maximo es: 99");
            document.getElementById(`margin${numId}`).value = valueMax;
            break;
          case discount >= 100:
            alert("Valor Maximo es: 99");
            document.getElementById(`discount${numId}`).value = valueMax;
            break;
        }

        const dataObject = await fetch("/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            cost: resOk.cost,
            numSites: numSites,
            cTotalBandaKa: capBandKa,
            contract: contract,
            rateFinancingCapex: rateCapex,
            type: type,
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

        const tableInput = document.getElementById("divTableResultScroll");

        let numScroll = document.getElementById(`resId${numId}`).offsetTop;
        //30 x cada fila superior qu esta abajo del cuadro
        tableInput.scrollTo({
          top: numScroll - 180,
          behavior: "smooth",
        });

        document.getElementById(`resId${numId}`).classList.add("trResModified");

        setTimeout(() => {
          document
            .getElementById(`resId${numId}`)
            .classList.remove("trResModified");
        }, 2000);
      } else {
        document.getElementById(`resCost${numId}`).innerText = numCer;
        document.getElementById(`resExtCost${numId}`).innerText = numCer;
        document.getElementById(`resUnitPrice${numId}`).innerText = numCer;
        document.getElementById(`resUnitDiscPrice${numId}`).innerText = numCer;
        document.getElementById(`resExtDiscPrice${numId}`).innerText = numCer;
        document.getElementById(`resMonthlyCostSite${numId}`).innerText =
          numCer;
        document.getElementById(`resMonthlyPriceSite${numId}`).innerText =
          numCer;
        document.getElementById(`resMonthlyCostMbps${numId}`).innerText =
          numCer;
        document.getElementById(`resMonthlyPriceMbps${numId}`).innerText =
          numCer;
        document.getElementById(`resFinancedCapex${numId}`).innerText = numCer;
        document.getElementById(
          `resFinancedMonthlyPriceSite${numId}`
        ).innerText = numCer;
        return;
      }
    }
  });
});
