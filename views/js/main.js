// ------ border en tr ------
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    const rowsDatas = document.getElementsByClassName("rowData");
    const rowData = e.target.closest("tr");

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
  const identificadores = document.getElementsByClassName("iden");
  let contadorId = [2];
  let contadorView = [1];

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
  const btnMas = document.getElementById("tdMas");
  const tbodyRows = document.getElementById("tbodyRows");

  const innerTr = (cont) => {
    return `
    <tr id="tr${cont}" class="rowData">
          <td  class="">
            <div>
              <strong class="iden"></strong>
            </div>
          </td>
          <td class="cardInputData ">
            <input required type="text" name="tipo" id="tipo" class="inputData"/>
          </td>
          <td class="cardInputData ">
            <input required type="text" name="categoria" id="categoria" class="inputData"/>
          </td>
          <td class="cardInputData ">
            <input required type="text" name="subcategoria" id="subcategoria" class="inputData"/>
          </td>
          <td class="cardInputData ">
            <input required type="text" name="piezaFabricante" id="piezaFabricante" class="inputData"/>
          </td>
          <td class="cardInputData ">
            <input required type="text" name="margen" id="margen" class="inputData"/>
          </td>
          <td class="cardInputData ">
            <input required type="text" name="codigoProducto" id="codigoProducto" class="inputData"/>
          </td>
          <td class="cardInputData ">
            <input required type="text" name="descripcion" id="descripcion" class="inputData"/>
          </td>
          <td class="cardInputData ">
            <input required type="number" class="inputNumber inputData" name="cantidad" id="cantidad" />
          </td>
          <td class="cardInputData ">
            <input required type="text" name="unidadMedida" id="unidadMedida" class="inputData"/>
          </td>
          <td class="cardInputData ">
            <input required type="number" class="inputNumber inputData" name="descuento" id="descuento" />
          </td>
          <td class="cardInputData ">
            <input required type="text" name="financiamiento" id="financiamiento" class="inputData"/>
          </td>
          <td class="cardInputData ">
            <input required type="text" name="dueño" id="dueño" class="inputData"/>
          </td>
          <td class="tdBoton">
            
              <button class="buttonMenos" type="button" form="">-</button>
            
          </td></tr>`;
  };

  if (btnMas != null) {
    btnMas.addEventListener("click", () => {
      modificadorCifra(contadorId, true);
      tbodyRows.insertAdjacentHTML(
        "beforeend",
        innerTr(contadorArray(contadorId, undefined))
      );
      iteradorView(identificadores, modificadorCifra(contadorView, true));
    });
  }

  //Eliminar Filas--------------------------------
  const tabla = document.getElementById("tableRows");

  if (tabla != null) {
    tabla.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("buttonMenos")) {
        const fila = e.target.closest("tr");
        fila.remove();
        contadorArray(contadorId, false);
        iteradorView(identificadores, modificadorCifra(contadorView, false));
      }
    });
  }
});

const iteradorView = (identificadores, contador) => {
  for (var i = 0; i < identificadores.length; i++) {
    identificadores[i].innerText = contador[i];
  }
};
