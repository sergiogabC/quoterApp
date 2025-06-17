export class Operations {
  static unitCost({ object }) {
    const unitCost = object.cost;
    return unitCost;
  }

  static unitPrice(unitCost, marg) {
    const margin = "0." + toString(100 - marg);
    parseFloat(margin);
    console.log(margin + "y su tipo: " + margin.valueOf());
    const unitPrice = unitCost / margin;
    return unitPrice;
  }

  static unitDiscPrice(unitPrice, discount) {
    const unitDiscPrice = unitPrice * (1 - discount);
    return unitDiscPrice;
  }

  static extDiscPrice(tipo, qty, unitDiscPrice, time) {
    if (tipo === "opex") {
      const extCost = time * unitDiscPrice * qty;
      return extCost;
    }
    const extCost = unitDiscPrice * qty;
    return extCost;
  }

  static extCost(tipo, qty, unitCost, time) {
    if (tipo === "opex") {
      const extCost = time * unitCost * qty;
      return extCost;
    }
    const extCost = unitCost * qty;
    return extCost;
  }
}
