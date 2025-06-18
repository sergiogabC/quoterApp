export class ParametersSecundary {
  constructor(manufacturerPart, margin) {
    // (this.tipo = tipo),
    (this.manufacturerPart = manufacturerPart), (this.margin = margin);
    // (this.cantidad = cantidad),
    // (this.descuento = descuento);
  }

  mostrarMaterial() {
    console.log("El material es:" + this.manufacturerPart);
  }
}
