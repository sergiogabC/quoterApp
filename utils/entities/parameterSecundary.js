export class ParametersSecundary {
  constructor(piezaFabricante, margen) {
    // (this.tipo = tipo),
    (this.materialNumber = piezaFabricante), (this.margin = margen);
    // (this.cantidad = cantidad),
    // (this.descuento = descuento);
  }

  mostrarMaterial() {
    console.log("El material es:" + this.materialNumber);
  }
}
