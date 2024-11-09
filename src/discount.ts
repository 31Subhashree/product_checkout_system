import { catalog, PricingRule, Product } from "./product";

export class BulkDiscount implements PricingRule {
    private sku: string;
    private minQuantity: number;
    private discountedPrice: number;
    
    constructor(sku: string, minQuantity: number, discountedPrice: number) {
      this.sku = sku;
      this.minQuantity = minQuantity;
      this.discountedPrice = discountedPrice;
    }
    
    apply(products: Product[]): number {
      const items = products.filter(product => product.sku === this.sku);
      const regularPrice = catalog[this.sku].price;
      const effectivePrice = items.length > this.minQuantity ? this.discountedPrice : regularPrice;
      return items.length * effectivePrice;
    }
  }