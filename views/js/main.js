// ------ border en tr ------
document.addEventListener("DOMContentLoaded", ()=>{

  document.addEventListener("click",(e)=>{

    const rowsDatas = document.getElementsByClassName("rowData")
    const rowData = e.target.closest("tr")
    
    if(e.target && e.target.classList.contains("inputData")){

      for(const rowData of rowsDatas){
        rowData.classList.remove("trActive")
      }
      rowData.classList.add("trActive")
      
    }
    else{
      for(const rowData of rowsDatas){
        rowData.classList.remove("trActive")
      }
      
    }

  })
  
})

// ---------Mostrar Parametros(renderizar el include)-----------
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


//-------------------(Agregado y eliminado de filas)-----------
document.addEventListener("DOMContentLoaded",()=>{
  const identificadores = document.getElementsByClassName("iden")
  var contador = [1]
  
  const  contadorArray = (contador,simbolo)=>{
    if (simbolo){
      contador.push(contador.length+1)
      return contador
    }else{      
      contador.pop()
      return contador
    }

  };

  //AGREGAR FILAS------------------------
  const btnMas = document.getElementById("tdMas");
  const tbodyRows = document.getElementById("tbodyRows");

  const innerTr = `<tr class="rowData">
          <td class="inputSelect">
            <div>
              <strong class="iden"></strong>
            </div>
          </td>
          <td class="cardInputData inputSelect">
            <input required type="text" name="tipo" id="tipo" class="inputData"/>
          </td>
          <td class="cardInputData inputSelect">
            <input required type="text" name="categoria" id="categoria" class="inputData"/>
          </td>
          <td class="cardInputData inputSelect">
            <input required type="text" name="subcategoria" id="subcategoria" class="inputData"/>
          </td>
          <td class="cardInputData inputSelect">
            <input required type="text" name="piezaFabricante" id="piezaFabricante" class="inputData"/>
          </td>
          <td class="cardInputData inputSelect">
            <input required type="text" name="margen" id="margen" class="inputData"/>
          </td>
          <td class="cardInputData inputSelect">
            <input required type="text" name="codigoProducto" id="codigoProducto" class="inputData"/>
          </td>
          <td class="cardInputData inputSelect">
            <input required type="text" name="descripcion" id="descripcion" class="inputData"/>
          </td>
          <td class="cardInputData inputSelect">
            <input required type="number" class="inputNumber inputData" name="cantidad" id="cantidad" />
          </td>
          <td class="cardInputData inputSelect">
            <input required type="text" name="unidadMedida" id="unidadMedida" class="inputData"/>
          </td>
          <td class="cardInputData inputSelect">
            <input required type="number" class="inputNumber inputData" name="descuento" id="descuento" />
          </td>
          <td class="cardInputData inputSelect">
            <input required type="text" name="financiamiento" id="financiamiento" class="inputData"/>
          </td>
          <td class="cardInputData inputSelect">
            <input required type="text" name="dueño" id="dueño" class="inputData"/>
          </td>
          <td class="tdBoton">
            
              <button class="buttonMenos" type="button" form="">-</button>
            
          </td></tr>`;
  

  if (btnMas != null) {
    btnMas.addEventListener("click", () => {
      tbodyRows.insertAdjacentHTML("beforeend", innerTr);
      iteradorId(identificadores,contadorArray(contador,true))
    });
  }


  //Eliminar Filas--------------------------------
  const tabla = document.getElementById("tableRows");

  if (tabla != null) {
    tabla.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("buttonMenos")) {
        const fila = e.target.closest("tr");
        fila.remove();      
        iteradorId(identificadores,contadorArray(contador,false))
      }
    });
  }
})





const iteradorId = (identificadores,contador)=> {

  for(var i = 0; i<identificadores.length; i++){
  
    identificadores[i].innerText = contador[i]

  }
}

