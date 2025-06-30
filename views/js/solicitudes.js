//---Preview Results----
document.addEventListener("DOMContentLoaded", () => {
  const btnCalcular = document.getElementById("calcular");
  const tbodyRows = document.getElementById("tbodyRows");
  const tbodyRowsResults = document.getElementById("tbodyRowsResults");
  const arraysTrs = tbodyRows.children;
  const arraysTrsResults = tbodyRowsResults.children;

  const formParametros = document.getElementById("formParametros");

  formParametros.addEventListener("input", async () => {
    console.log("ArraysTrs ", arraysTrs);
    let ids = [];
    for (let tr of arraysTrs) {
      console.log(tr);
      ids.push(tr.id);
    }
    console.log(ids);

    console.log("ArraysTrsResults: ", arraysTrsResults);
  });
});
