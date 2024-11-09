import { catalog, PricingRule, Product } from "./product";

export class Checkout {
    private pricingRules: PricingRule[];
    private scannedItems: Product[];
  
    constructor(pricingRules: PricingRule[]) {
      this.pricingRules = pricingRules;
      this.scannedItems = [];
    }
  
    scan(sku: string): void {
      const product = catalog[sku];
      if (product) {
        this.scannedItems.push(product);
      } else {
        throw new Error(`Product with SKU ${sku} not found.`);
      }
    }
  
    total(): number {
      let totalPrice = 0;
  
      for (const rule of this.pricingRules) {
        totalPrice += rule.apply(this.scannedItems);
      }
  
      const remainingItems = this.scannedItems.filter(
        item => !this.pricingRules.some(rule => rule.apply([item]) > 0)
      );
      for (const item of remainingItems) {
        totalPrice += item.price;
      }
  
      return parseFloat(totalPrice.toFixed(2));
    }
  }