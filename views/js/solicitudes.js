//---Preview Results----
document.addEventListener("DOMContentLoaded", () => {
  const formParametros = document.getElementById("formParametros");
  //Lista de names de los inputs que disparan el evento
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

  //Espera eventos en los inputs del formulario
  formParametros.addEventListener("input", async (e) => {
    //verifica si el evento es en un input y si el name del input esta en la lista
    if (
      e.target.tagName === "INPUT" &&
      listNames.find((value) => value === e.target.attributes.name.value)
    ) {
      let tr = e.target.closest("tr");
      let numId = tr.id.replace("tr", "");

      const numCer = "0.00";
      const valueMax = "99";

      const manufacturerPart = document.getElementById(
        `manufacturerPart${numId}`
      ).value;

      //si no hay manufacturerPart no hace la consulta
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

      //verifica si el manufacturerPart existe en la base de datos
      const resOk = await fetch("/exists", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ manufacturerPart: manufacturerPart }),
      }).then((val) => val.json());

      //si existe hace la consulta a la api de calculo
      if (resOk.complete) {
        //valores de los demas inputs
        const numSites = document.getElementById("numSites").value;
        const capBandKa = document.getElementById("cTotalBandaKa").value;
        const contract = document.getElementById("contract").value;
        const rateCapex = document.getElementById("rateFinancingCapex").value;
        const type = document.getElementById(`type${numId}`).value;
        const margin = document.getElementById(`margin${numId}`).value;
        const qty = document.getElementById(`qty${numId}`).value;
        const discount = document.getElementById(`discount${numId}`).value;
        const finc = document.getElementById(`finance${numId}`).value;

        //validacion de valores margin y discount
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

        //consulta a la api de calculo
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

        //pone los resultados en la tabla
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

        //hace scroll hasta la fila modificada y la resalta
        const tableInput = document.getElementById("divTableResultScroll");
        let numScroll = document.getElementById(`resId${numId}`).offsetTop;

        tableInput.scrollTo({
          top: numScroll - 180, //30 x cada fila superior qu esta abajo del cuadro
          behavior: "smooth",
        });

        document.getElementById(`resId${numId}`).classList.add("trResModified");

        setTimeout(() => {
          document
            .getElementById(`resId${numId}`)
            .classList.remove("trResModified");
        }, 2000);
      } else {
        //si no existe el manufacturerPart en la base de datos pone todo en ceros
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
