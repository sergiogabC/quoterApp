// Mostrar Parametros(renderizar el include)
document.addEventListener("DOMContentLoaded", () => {
  const btnMostrarParametros = document.getElementById("mostrarParametros");
  const tableVisible = document.getElementById("tabla");

  btnMostrarParametros.addEventListener("click", () => {
    const visible = tableVisible.style.display === "table";
    tableVisible.style.display = visible ? "none" : "table";
    btnMostrarParametros.innerText = "Ocultar Parametros";
  });
});
