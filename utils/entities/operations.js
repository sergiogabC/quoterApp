export class Operations {
  static unitCost({ object }) {
    const unitCost = object.cost;
    return unitCost;
  }

  static priceUnit(unitCost, margin) {
    const unitPrice = unitCost / margin;
    return unitPrice;
  }
}
