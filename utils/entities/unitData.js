export class UnitData {
  constructor(
    type,
    category,
    subCategory,
    manufacturerPart,
    margin,
    productCode,
    description,
    qty,
    unitMeasure,
    discount,
    finance,
    owner,
    unitCost
  ) {
    this.type = type;
    this.category = category;
    this.subCategory = subCategory;
    this.manufacturerPart = manufacturerPart;
    this.margin = margin;
    this.productCode = productCode;
    this.description = description;
    this.qty = qty;
    this.unitMeasure = unitMeasure;
    this.discount = discount;
    this.finance = finance;
    this.owner = owner;
    this.unitcost = unitCost;
  }

  exportData() {
    return {
      type: this.type,
      category: this.category,
      subCategory: this.subCategory,
      manufacturerPart: this.manufacturerPart,
      productCode: this.productCode,
      description: this.description,
      qty: this.qty,
      unitMeasure: this.unitMeasure,
      discount: this.discount,
      finance: this.finance,
      unitCost: this.unitcost.toFixed(2),
      owner: this.owner,
      margin: this.margin,
    };
  }
}
