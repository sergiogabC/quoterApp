// ------ border------
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    const rowsDatas = document.getElementsByClassName("rowData");
    const rowData = e.target.closest("tr");
    const rowsResults = document.getElementsByClassName("rowResult");
    const rowResult = e.target.closest("tr");

    //----------Inputs-----------
    if (e.target && e.target.classList.contains("inputData")) {
      for (const rowData of rowsDatas) {
        rowData.classList.remove("trActive");
      }
      rowData.classList.add("trActive");
    } else {
      for (const rowData of rowsDatas) {
        rowData.classList.remove("trActive");
      }
    }
    //----------Results----------
    if (e.target && e.target.classList.contains("dataResult")) {
      for (const rowResult of rowsResults) {
        rowResult.classList.remove("trActive");
      }
      rowResult.classList.add("trActive");
    } else {
      for (const rowResult of rowsResults) {
        rowResult.classList.remove("trActive");
      }
    }
  });
});

// --------Mostrar Includes-------------------
document.addEventListener("DOMContentLoaded", () => {
  const btnMostrarParametros = document.getElementById("viewParams");

  const btnPreview = document.getElementById("preView");
  const divTableResults = document.getElementById("divTableResults");

  const divParams = document.getElementById("divParams");
  const divButtonParams = document.getElementById("divButtonParams");

  // ---------Mostrar Parametros(renderizar el include)-----------

  if (btnMostrarParametros != null) {
    btnMostrarParametros.addEventListener("click", () => {
      if (divParams.style.display === "flex") {
        divParams.style.display = "none";
        btnMostrarParametros.innerText = "Mostrar Parametros";
      } else {
        divParams.style.display = "flex";
        btnMostrarParametros.innerText = "Ocultar Parametros";
      }
    });
  }

  // ---------Mostrar Results(renderizar el include)-----------

  if (btnPreview != null) {
    btnPreview.addEventListener("click", () => {
      if (divTableResults.style.display === "flex") {
        divTableResults.style.display = "none";
        divButtonParams.style.display = "flex";
        btnPreview.innerText = "Pre - Visualizacíon";
      } else {
        divTableResults.style.display = "flex";
        divParams.style.display = "none";
        divButtonParams.style.display = "none";
        btnMostrarParametros.innerText = "Mostrar Parametros";
        btnPreview.innerText = "Ocultar";
      }
    });
  }
});

//-------------------(Agregado y eliminado de filas)-----------
document.addEventListener("DOMContentLoaded", () => {
  let contadorId = [2];
  let contadorView = [1];
  let contadorViewResult = [1];

  const modificadorCifra = (array, boolean) => {
    if (boolean) {
      array.push(array.length + 1);
      return array;
    } else {
      array.pop();
      return array;
    }
  };

  const contadorArray = (contador) => {
    if (typeof simbolo === "undefined") {
      for (let i = 0; i <= contador.length; i++) {
        if ((contador[i] = contador.length)) {
          return contador[i];
        }
      }
    }
  };

  //AGREGAR FILAS------------------------
  const identificadores = document.getElementsByClassName("iden");
  const identificadoresResult = document.getElementsByClassName("idenResult");
  const btnMas = document.getElementById("tdMas");
  const tbodyRows = document.getElementById("tbodyRows");
  const tbodyRowsResults = document.getElementById("tbodyRowsResults");

  const innerTr = (num) => {
    return `
          <tr class="rowData" id="tr${num}">
        <td >
          <div>
            <strong class="iden dataResult">1</strong>
          </div>
        </td>
        <td class="cardInputData ">
          <input required type="text" name="type" id="type${num}" class="inputData"/>
        </td>
        <td class="cardInputData ">
          <input  type="text" name="category" id="category${num}" class="inputData"/>
        </td>
        <td class="cardInputData ">
          <input  type="text" name="subcategory" id="subcategory${num}" class="inputData"/>
        </td>
        <td class="cardInputData ">
          <input required  type="text" name="manufacturerPart" id="manufacturerPart${num}" class="inputData"/>
        </td>
        <td class="cardInputData ">
          <input required  class="inputNumber inputData" type="number" name="margin" id="margin${num}" />
        </td>
        <td class="cardInputData ">
          <input  type="text" name="productCode" id="productCode${num}" class="inputData"/>
        </td>
        <td class="cardInputData ">
          <input  type="text" name="description" id="description${num}" class="inputData"/>
        </td>
        <td class="cardInputData ">
          <input required type="number" class="inputNumber inputData" name="qty" id="qty${num}" class="inputData"/>
        </td>
        <td class="cardInputData ">
          <input  type="text" name="unitMeasure" id="unitMeasure${num}" class="inputData"/>
        </td>
        <td class="cardInputData ">
          <input required type="number" min="0" class="inputNumber inputData" name="discount" id="discount${num}" />
        </td>
        <td class="cardInputData ">
          <input required type="text" name="finance" id="finance${num}" class="inputData"/>
        </td>
        <td class="cardInputData ">
          <input  type="text" name="owner" id="owner${num}" class="inputData"/>
        </td>
        <td class="tdBoton" id="tdBoton">                    
          <button class="buttonMenos" type="button" form="">-</button>          
        </td>
      </tr>`;
  };

  const innerResult = (num) => {
    return `<tr id="resId${num}" class="rowResult">
      <td >
        <div>
          <strong class="idenResult dataResult" ></strong>
        </div>
      </td>
      <td class="cardResultData dataResult">
        <strong id="resCost${num}" class="dataResult"> 
          
        </strong>
      </td>
      <td class="cardResultData dataResult">
        <strong id="resExtCost${num}" class="dataResult">
          
        </strong>
      </td>
      <td class="cardResultData dataResult">
        <strong id="resUnitPrice${num}" class="dataResult">
          
        </strong>
      </td>
      <td class="cardResultData dataResult">
        <strong id="resUnitDiscPrice${num}" class="dataResult">
          
        </strong>
      </td>
      <td class="cardResultData dataResult">
        <strong id="resExtDiscPrice${num}" class="dataResult"> 
          
        </strong>
      </td>
      <td class="cardResultData dataResult">
        <strong id="resMonthlyCostSite${num}" class="dataResult"> 
          
        </strong>
      </td>
      <td class="cardResultData dataResult">
        <strong id="resMonthlyPriceSite${num}" class="dataResult">
          
        </strong>
      </td>
      <td class="cardResultData dataResult">
        <strong id="resMonthlyCostMbps${num}" class="dataResult">
          
        </strong>
      </td>
      <td class="cardResultData dataResult">
        <strong id="resMonthlyPriceMbps${num}" class="dataResult">
          
        </strong>
      </td>
      <td class="cardResultData dataResult">
        <strong id="resFinancedCapex${num}" class="dataResult">
          
        </strong>
      </td>
      <td class="cardResultData dataResult">
        <strong id="resFinancedMonthlyPriceSite${num}" class="dataResult">
          
        </strong>
      </td>

    </tr>`;
  };

  if (btnMas != null) {
    btnMas.addEventListener("click", () => {
      modificadorCifra(contadorId, true);
      tbodyRows.insertAdjacentHTML(
        "beforeend",
        innerTr(contadorArray(contadorId, undefined))
      );
      iteradorView(identificadores, modificadorCifra(contadorView, true));
      //-----------Results------------
      tbodyRowsResults.insertAdjacentHTML(
        "beforeend",
        innerResult(contadorArray(contadorId, undefined))
      );
      iteradorView(
        identificadoresResult,
        modificadorCifra(contadorViewResult, true)
      );
    });
  }

  //Eliminar Filas--------------------------------
  const tabla = document.getElementById("tableRows");

  if (tabla != null) {
    tabla.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("buttonMenos")) {
        let row = e.target.closest("tr");
        let numIdRow = row.id.replace("tr", "");
        let rowResult = document.getElementById(`resId${numIdRow}`);
        row.remove();
        contadorArray(contadorId, false);
        iteradorView(identificadores, modificadorCifra(contadorView, false));
        //-----------Results------------
        rowResult.remove();
        iteradorView(
          identificadoresResult,
          modificadorCifra(contadorViewResult, false)
        );
      }
    });
  }
});

const iteradorView = (identificadores, contador) => {
  for (var i = 0; i < identificadores.length; i++) {
    identificadores[i].innerText = contador[i];
  }
};
