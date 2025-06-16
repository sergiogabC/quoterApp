// Mostrar Parametros(renderizar el include)
document.addEventListener("DOMContentLoaded", () => {
  const btnMostrarParametros = document.getElementById("mostrarParametros");
  const tableVisible = document.getElementById("tabla");

  if (btnMostrarParametros != null) {
    btnMostrarParametros.addEventListener("click", () => {
      if (tableVisible.style.display === "table") {
        tableVisible.style.display = "none";
        btnMostrarParametros.innerText = "Mostrar Parametros";
      } else {
        tableVisible.style.display = "table";
        btnMostrarParametros.innerText = "Ocultar Parametros";
      }
    });
  }
});

//AGREGAR FILAS
document.addEventListener("DOMContentLoaded", () => {
  const btnMas = document.getElementById("tdMas");
  const tbodyRows = document.getElementById("tbodyRows");
  const innerTr = `<tr>
        <td class="cardInputData">
          <input required type="text" name="tipo" id="tipo" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="categoria" id="categoria" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="subcategoria" id="subcategoria" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="piezaFabricante" id="piezaFabricante" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="margen" id="margen" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="codigoProducto" id="codigoProducto" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="descripcion" id="descripcion" />
        </td>
        <td class="cardInputData">
          <input required type="number" class="inputNumber" name="cantidad" id="cantidad" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="unidadMedida" id="unidadMedida" />
        </td>
        <td class="cardInputData">
          <input required type="number" class="inputNumber" name="descuento" id="descuento" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="financiamiento" id="financiamiento" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="dueño" id="dueño" />
        </td>
        <td class="tdBoton">
          <div class="buttonMenos">
            <button type="button" class="tdMenos" form="">-</button>
          </div>
        </td>
      </tr>`;

  if (btnMas != null) {
    btnMas.addEventListener("click", () => {
      tbodyRows.insertAdjacentHTML("beforeend", innerTr);
    });
  }
});

//Eliminar Filas
document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tableRows");

  if (tabla != null) {
    tabla.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("tdMenos")) {
        const fila = e.target.closest("tr");
        fila.remove();
      }
    });
  }
});
