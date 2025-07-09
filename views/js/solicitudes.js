const consultHttp = async (manufacturerPart) => {
  const res = fetch("/exists", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ manufacturerPart: manufacturerPart }),
  });
  return res;
};

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

  formParametros.addEventListener("click", (e) => {
    //si el elemento donde se hizo el evento tiene el name correcto
    if (
      e.target.tagName === "INPUT" &&
      listNames.find((value) => value === e.target.attributes.name.value)
    ) {
      e.target.addEventListener("input", async (e) => {
        let tr = e.target.closest("tr");
        let numId = tr.id.replace("tr", "");

        const manufacturerPart = document.getElementById(
          `manufacturerPart${numId}`
        ).value;

        let response;
        switch (true) {
          case manufacturerPart === "":
            return;
          case (response = await consultHttp(manufacturerPart)
            .then((val) => {
              if (!val.ok) return false;
              return val.ok;
            })
            .catch()):
            console.log("ok");
            break;
        }

        // const numSites = document.getElementById("numSites").value;
        // const capBandKa = document.getElementById("cTotalBandaKa").value;
        // const contract = document.getElementById("contract").value;
        // const rateCapex = document.getElementById("rateFinancingCapex").value;
        // const type = document.getElementById(`type${numId}`).value;
        // const margin = document.getElementById(`margin${numId}`).value;
        // const qty = document.getElementById(`qty${numId}`).value;
        // const discount = document.getElementById(`discount${numId}`).value;
        // const finc = document.getElementById(`finance${numId}`).value;

        // const dataObject = await fetch("/results", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
        //   body: new URLSearchParams({
        //     numSites: numSites,
        //     cTotalBandaKa: capBandKa,
        //     contract: contract,
        //     rateFinancingCapex: rateCapex,
        //     type: type,
        //     manufacturerPart: manufacturerPart,
        //     margin: margin,
        //     qty: qty,
        //     discount: discount,
        //     finance: finc,
        //   }),
        // }).then((data) => data.json());

        // document.getElementById(`resCost${numId}`).innerText =
        //   dataObject.unitCost;
        // document.getElementById(`resExtCost${numId}`).innerText =
        //   dataObject.extCost;
        // document.getElementById(`resUnitPrice${numId}`).innerText =
        //   dataObject.unitPrice;
        // document.getElementById(`resUnitDiscPrice${numId}`).innerText =
        //   dataObject.unitDiscPrice;
        // document.getElementById(`resExtDiscPrice${numId}`).innerText =
        //   dataObject.extDiscPrice;
        // document.getElementById(`resMonthlyCostSite${numId}`).innerText =
        //   dataObject.monthlyCostSite;
        // document.getElementById(`resMonthlyPriceSite${numId}`).innerText =
        //   dataObject.monthlyPriceSite;
        // document.getElementById(`resMonthlyCostMbps${numId}`).innerText =
        //   dataObject.monthlyCostMbps;
        // document.getElementById(`resMonthlyPriceMbps${numId}`).innerText =
        //   dataObject.monthlyPriceMbps;
        // document.getElementById(`resFinancedCapex${numId}`).innerText =
        //   dataObject.financedCapex;
        // document.getElementById(
        //   `resFinancedMonthlyPriceSite${numId}`
        // ).innerText = dataObject.financedMonthlyPriceSite;

        // const tableInput = document.getElementById("divTableResultScroll");

        // let numScroll = document.getElementById(`resId${numId}`).offsetTop;
        // //30 x cada fila superior qu esta abajo del cuadro
        // tableInput.scrollTo({
        //   top: numScroll - 180,
        //   behavior: "smooth",
        // });

        // document.getElementById(`resId${numId}`).classList.add("trResModified");

        // setTimeout(() => {
        //   document
        //     .getElementById(`resId${numId}`)
        //     .classList.remove("trResModified");
        // }, 2000);
      });
    }
  });
});
