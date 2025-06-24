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
    });
    console.log(await response.json());
  });
});
