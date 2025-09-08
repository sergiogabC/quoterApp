const iteradorView = (rows, contador) => {
  //Se pasa un array de elementos y otro de numeros
  //y se a cada elemento recorrido en la posicion i
  //se le introduce el numero del array de numero en su posicion i, coinciendo una es escala de 1 al infinito
  for (var i = 0; i < rows.length; i++) {
    rows[i].innerText = contador[i];
  }
};

const scrollTable = (id) => {
  const tableInput = document.getElementById(id);
  //Se accede al div que contiene el scroll
  tableInput.scrollTo({
    top: tableInput.scrollHeight,
    behavior: "smooth",
  });
};

const clickBorder = (e, contain, rows, row, classs) => {
  //si el elemento es elemento y su clase contiene la clase identificadora del td
  if (e.target && e.target.classList.contains(contain)) {
    //se pasa todas las filas y se recorre quitantole la clase del border
    for (const row of rows) {
      row.classList.remove(classs);
    }
    //se le agrega la clase del border a la fila del elemento clickeado
    row.classList.add(classs);
  } else {
    //se pasa todas las filas y se recorre quitantole la clase del border
    for (const row of rows) {
      row.classList.remove(classs);
    }
  }
};

//Funcion que contiene el html de fila en tabla Qto
const innerTr = (num) => {
  return `
          <tr class="rowData" id="tr${num}">
                  <td>
                    <div>
                      <strong class="iden inputData">1</strong>
                    </div>
                  </td>
                  <td class="cardInputData">
                    <input
                      required
                      type="text"
                      name="type"
                      id="type${num}"
                      class="inputData"
                    />
                  </td>
                  <td class="cardInputData">
                    <input
                      type="text"
                      name="category"
                      id="category${num}"
                      class="inputData"
                    />
                  </td>
                  <td class="cardInputData">
                    <input
                      type="text"
                      name="subcategory"
                      id="subcategory${num}"
                      class="inputData"
                    />
                  </td>
                  <td class="cardInputData">
                    <input
                      required
                      type="text"
                      name="manufacturerPart"
                      id="manufacturerPart${num}"
                      class="inputData"
                    />
                  </td>
                  <td class="cardInputData">
                    <input
                      required
                      class="inputNumber inputData"
                      type="number"
                      name="margin"
                      id="margin${num}"
                    />
                  </td>
                  <td class="cardInputData">
                    <input
                      type="text"
                      name="productCode"
                      id="productCode${num}"
                      class="inputData"
                    />
                  </td>
                  <td class="cardInputData">
                    <input
                      type="text"
                      name="description"
                      id="description${num}"
                      class="inputData"
                    />
                  </td>
                  <td class="cardInputData">
                    <input
                      required
                      type="number"
                      class="inputNumber inputData"
                      name="qty"
                      id="qty${num}"
                    />
                  </td>
                  <td class="cardInputData">
                    <input
                      type="text"
                      name="unitMeasure"
                      id="unitMeasure${num}"
                      class="inputData"
                    />
                  </td>
                  <td class="cardInputData">
                    <input
                      required
                      type="number"
                      min="0"
                      class="inputNumber inputData"
                      name="discount"
                      id="discount${num}"
                    />
                  </td>
                  <td class="cardInputData">
                    <input
                      required
                      type="text"
                      name="finance"
                      id="finance${num}"
                      class="inputData"
                    />
                  </td>
                  <td class="cardInputData">
                    <input
                      type="text"
                      name="owner"
                      id="owner${num}"
                      class="inputData"
                    />
                  </td>
                  <td class="tdBoton" id="tdBoton">
                    <button class="buttonMenos" type="button" form="">-</button>
                  </td>
                </tr>`;
};

//Funcion que contiene el html de fila en tabla result
const innerResult = (num) => {
  return `<tr id="resId${num}" class="rowResult">
                        <td>
                          <div>
                            <strong class="idenResult dataResult">1</strong>
                          </div>
                        </td>
                        <td class="cardResultData dataResult">
                          <strong id="resCost${num}" class="dataResult">
                            0.00
                          </strong>
                        </td>
                        <td class="cardResultData dataResult">
                          <strong id="resExtCost${num}" class="dataResult">
                            0.00
                          </strong>
                        </td>
                        <td class="cardResultData dataResult">
                          <strong id="resUnitPrice${num}" class="dataResult">
                            0.00
                          </strong>
                        </td>
                        <td class="cardResultData dataResult">
                          <strong id="resUnitDiscPrice${num}" class="dataResult">
                            0.00
                          </strong>
                        </td>
                        <td class="cardResultData dataResult">
                          <strong id="resExtDiscPrice${num}" class="dataResult">
                            0.00
                          </strong>
                        </td>
                        <td class="cardResultData dataResult">
                          <strong id="resMonthlyCostSite${num}" class="dataResult">
                            0.00
                          </strong>
                        </td>
                        <td class="cardResultData dataResult">
                          <strong id="resMonthlyPriceSite${num}" class="dataResult">
                            0.00
                          </strong>
                        </td>
                        <td class="cardResultData dataResult">
                          <strong id="resMonthlyCostMbps${num}" class="dataResult">
                            0.00
                          </strong>
                        </td>
                        <td class="cardResultData dataResult">
                          <strong id="resMonthlyPriceMbps${num}" class="dataResult">
                            0.00
                          </strong>
                        </td>
                        <td class="cardResultData dataResult">
                          <strong id="resFinancedCapex${num}" class="dataResult">
                            0.00
                          </strong>
                        </td>
                        <td class="cardResultData dataResult">
                          <strong
                            id="resFinancedMonthlyPriceSite${num}"
                            class="dataResult"
                          >
                            0.00
                          </strong>
                        </td>
                      </tr>`;
};

// ------ border ------

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    const rowsDatas = document.getElementsByClassName("rowData");
    const rowData = e.target.closest("tr");
    const rowsResults = document.getElementsByClassName("rowResult");
    const rowResult = e.target.closest("tr");
    const classs = "trActive";

    //----------Inputs-----------
    clickBorder(e, "inputData", rowsDatas, rowData, classs);

    //----------Results----------
    clickBorder(e, "dataResult", rowsResults, rowResult, classs);
  });
});

// --------Mostrar Includes-------------------
document.addEventListener("DOMContentLoaded", () => {
  const btnMostrarParametros = document.getElementById("viewParams");

  const btnPreview = document.getElementById("preView");
  const divTableResults = document.getElementById("divTableResults");

  const divParams = document.getElementById("divParams");
  const divButtonParams = document.getElementById("divButtonParams");

  const divGroupButtons = document.getElementById("divGrouperButtons");

  // ---------Mostrar Parametros(renderizar el include)-----------

  if (btnMostrarParametros != null) {
    btnMostrarParametros.addEventListener("click", () => {
      if (getComputedStyle(divParams).display === "flex") {
        divParams.classList.remove("modified");
        btnMostrarParametros.innerText = "Mostrar Parametros";
        divGroupButtons.classList.remove("modified");
      } else {
        divParams.classList.add("modified");
        btnMostrarParametros.innerText = "Ocultar Parametros";
        divGroupButtons.classList.add("modified");
      }
    });
  }

  // ---------Mostrar Results(renderizar el include)-----------

  if (btnPreview != null) {
    btnPreview.addEventListener("click", () => {
      if (getComputedStyle(divTableResults).display === "flex") {
        divTableResults.classList.remove("modified");
        divButtonParams.classList.remove("modified");
        btnPreview.innerText = "Pre - Visualizacíon";
        divGroupButtons.classList.remove("modified");
      } else {
        divTableResults.classList.add("modified");
        divParams.classList.remove("modified");
        divButtonParams.classList.add("modified");
        btnMostrarParametros.innerText = "Mostrar Parametros";
        btnPreview.innerText = "Ocultar";
        divGroupButtons.classList.remove("modified");
      }
    });
  }
});

//-------------------(Agregado y eliminado de filas)-----------
document.addEventListener("DOMContentLoaded", () => {
  let contadorId = [2];
  let contadorView = [1];
  let contadorViewResult = [1];

  //Funcion que agrega o quita numeros al array de numeros
  const modificadorCifra = (array, boolean) => {
    if (boolean) {
      array.push(array.length + 1);
      return array;
    } else {
      array.pop();
      return array;
    }
  };

  //Funcion que devuelve el ultimo numero del array
  const contadorArray = (contador) => {
    if (contador) {
      for (let i = 0; i <= contador.length; i++) {
        if ((contador[i] = contador.length)) {
          return contador[i];
        }
      }
    }
  };

  //AGREGAR FILAS------------------------
  //Se accede a los elementos necesarios
  const identificadores = document.getElementsByClassName("iden");
  const identificadoresResult = document.getElementsByClassName("idenResult");
  const btnMas = document.getElementById("tdMas");
  const tbodyRows = document.getElementById("tbodyRows");
  const tbodyRowsResults = document.getElementById("tbodyRowsResults");
  const divIncr = document.getElementById("divInputIncr");

  if (btnMas != null) {
    btnMas.addEventListener("click", () => {
      if (getComputedStyle(divIncr).display === "block") {
        let increment = document.getElementById("increment").value;

        //Validacion de valores del boton de incremento
        switch (true) {
          case increment === "":
            increment = 1;
            break;
          case increment > 100:
            alert("NÚMERO MAXIMO ES 100");
            return;
          case increment <= 0:
            alert("NÚMERO MINIMO ES 1");
            return;
        }

        for (let i = 1; i <= increment; i++) {
          //-----------Inputs-------------------
          //se aumenta el id de la fila
          modificadorCifra(contadorId, true);

          //Inserta el html de la fila con su id correspondiente
          tbodyRows.insertAdjacentHTML(
            "beforeend",
            innerTr(contadorArray(contadorId))
          );

          //Se introduce el numero correspondiente en la fila
          iteradorView(identificadores, modificadorCifra(contadorView, true));

          //se hace scroll hasta la ultima fila
          scrollTable("divTableRowParams");

          //-----------Results-------------------
          tbodyRowsResults.insertAdjacentHTML(
            "beforeend",
            innerResult(contadorArray(contadorId))
          );

          iteradorView(
            identificadoresResult,
            modificadorCifra(contadorViewResult, true)
          );

          scrollTable("divTableResultScroll");
        }

        return;
      }
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

        //-----------Inputs------------
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

/*--------- Verificacion de inputs requeridos  ----------*/

document.addEventListener("DOMContentLoaded", () => {
  const formExcel = document.getElementById("formExcel");
  const tableParam = document.getElementById("divParams");

  formExcel.addEventListener("submit", (e) => {
    //Detener envío
    e.preventDefault();

    //Elementos Requeridos
    const invalid = [...formExcel.querySelectorAll("[required]")].find(
      (input) => !input.value
    );

    if (!invalid) return formExcel.submit();

    //Buscar si algún input requerido que está oculto está vacío
    const hiddenInvalid = [...formExcel.querySelectorAll("[required]")].find(
      (input) => input.offsetParent === null && !input.value
    );

    if (hiddenInvalid) {
      const btnMostrarParametros = document.getElementById("viewParams");
      const btnPreview = document.getElementById("preView");
      const divTableResults = document.getElementById("divTableResults");
      const divParams = document.getElementById("divParams");
      const divButtonParams = document.getElementById("divButtonParams");
      const divGroupButtons = document.getElementById("divGrouperButtons");

      //Mostrar la tabla
      if (getComputedStyle(tableParam).display === "flex") {
        divParams.classList.remove("modified");
        btnMostrarParametros.innerText = "Mostrar Parametros";
        divGroupButtons.classList.remove("modified");
      } else {
        divTableResults.classList.remove("modified");
        divButtonParams.classList.remove("modified");
        btnPreview.innerText = "Pre - Visualizacíon";

        divParams.classList.add("modified");

        btnMostrarParametros.innerText = "Ocultar Parametros";
        divGroupButtons.classList.add("modified");
        tableParam.classList.add("modified");
      }

      //Dar foco al primer input inválido
      hiddenInvalid.focus();
      return;
    }

    invalid.focus();
  });
});
