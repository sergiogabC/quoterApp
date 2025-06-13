// Mostrar Parametros(renderizar el include)
document.addEventListener("DOMContentLoaded", () => {
  const btnMostrarParametros = document.getElementById("mostrarParametros");
  const tableVisible = document.getElementById("tabla");

  btnMostrarParametros.addEventListener("click", () => {
    if (tableVisible.style.display === "table") {
      tableVisible.style.display = "none";
      btnMostrarParametros.innerText = "Mostrar Parametros";
    } else {
      tableVisible.style.display = "table";
      btnMostrarParametros.innerText = "Ocultar Parametros";
    }
  });
});

//AGREGAR FILAS
document.addEventListener("DOMContentLoaded", () => {
  const btnMas = document.getElementById("tdMas");
  const tbodyRows = document.getElementById("tbodyRows");
  const innerTr = `<tr>
        <td class="cardInputData">
          <input required type="text" name="Tipo" id="Tipo" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="Categoria" id="Categoria" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="Subcategoria" id="Subcategoria" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="PiezaFabricante" id="PiezaFabricante" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="CodigoProducto" id="CodigoProducto" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="Descripcion" id="Descripcion" />
        </td>
        <td class="cardInputData">
          <input required type="number" class="inputNumber" name="Cantidad" id="Cantidad" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="UnidadMedida" id="UnidadMedida" />
        </td>
        <td class="cardInputData">
          <input required type="number" class="inputNumber" name="Descuento" id="Descuento" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="Financiamiento" id="Financiamiento" />
        </td>
        <td class="cardInputData">
          <input required type="text" name="Dueño" id="Dueño" />
        </td>
        <td class="tdBoton">
          <div class="buttonMenos">
            <button type="button" class="tdMenos" form="">-</button>
          </div>
        </td>
      </tr>`;

  btnMas.addEventListener("click", () => {
    tbodyRows.insertAdjacentHTML("beforeend", innerTr);
  });
});

//Eliminar Filas
document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tableRows");

  tabla.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("tdMenos")) {
      const fila = e.target.closest("tr");
      fila.remove();
    }
  });
});
