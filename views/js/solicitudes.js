//---Preview Results----
document.addEventListener("DOMContentLoaded", () => {
  const calculateButton = document.getElementById("calculate");

  //Espera el evento click en el boton calcular
  calculateButton.addEventListener("click", async (e) => {
    //validacion de valores margin y discount

    const classRowData = Array.from(document.getElementsByClassName("rowData"));
    const trIds = [];
    const listResModified = [];

    classRowData.forEach((val) => trIds.push(val.id));

    const manufacturerParts = trIds.map((val) =>
      val.replace("tr", "manufacturerPart")
    );

    for (let manufacturer of manufacturerParts) {
      const numId = manufacturer.replace("manufacturerPart", "");
      const manufacturerValue = document.getElementById(manufacturer).value;

      //Si el manufacturer esta vacio, se cambiara al elemento siguente
      if (manufacturerValue == "") continue;

      //verifica si el manufacturerPart existe en la base de datos
      const resOk = await fetch("/exists", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ manufacturerPart: manufacturerValue }),
      }).then((val) => val.json());

      //Si el fecth devuelve error que itere al siguente elemento
      if (!resOk.complete) continue;

      //Si el costo es 0.00 se salte al siguente elemento
      if (resOk.cost == "0.00") continue;

      listResModified.push(`resId${numId}`);

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
      document.getElementById(`resFinancedMonthlyPriceSite${numId}`).innerText =
        dataObject.financedMonthlyPriceSite;

      if (Number(margin) > 99) {
        document.getElementById(`margin${numId}`).value = 99;
      }

      if (Number(margin) < 0) {
        document.getElementById(`margin${numId}`).value = 0;
      }

      if (Number(discount) > 99) {
        document.getElementById(`discount${numId}`).value = 99;
      }

      if (Number(discount) < 0) {
        document.getElementById(`discount${numId}`).value = 0;
      }

      //hace scroll hasta la fila modificada y la resalta

      // const tableInput = document.getElementById("divTableResultScroll");
      // let numScroll = document.getElementById(`resId${numId}`).offsetTop;

      // tableInput.scrollTo({
      //   top: numScroll - 180, //30 x cada fila superior qu esta abajo del cuadro
      //   behavior: "smooth",
      // });
    }

    if (listResModified.length > 0) {
      for (let res of listResModified) {
        document.getElementById(res).classList.add("modified");
      }
      // setTimeout(() => {
      //   document.getElementById(`resId${numId}`).classList.remove("modified");
      // }, 2000);
    }
  });
});
