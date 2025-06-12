// Mostrar Parametros(renderizar el include)
document.addEventListener("DOMContentLoaded", () => {
  const btnMostrarParametros = document.getElementById("mostrarParametros");
  const tableVisible = document.getElementById("tabla");

  btnMostrarParametros.addEventListener("click", () => {
    const visible = tableVisible.style.display === "table";

    if (tableVisible.style.display === "table") {
      tableVisible.style.display = "none";
      btnMostrarParametros.innerText = "Mostrar Parametros";
    } else {
      tableVisible.style.display = "table";
      btnMostrarParametros.innerText = "Ocultar Parametros";
    }
  });
});
