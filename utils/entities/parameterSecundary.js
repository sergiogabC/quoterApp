export class ParametersSecundary {
  constructor(piezaFabricante) {
    this.materialNumber = piezaFabricante;
  }

  mostrarMaterial() {
    console.log("El material es:" + this.materialNumber);
  }
}
