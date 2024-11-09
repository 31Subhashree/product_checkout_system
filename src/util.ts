
import { PricingRule, Product, catalog } from './product';

export class ThreeForTwoDeal implements PricingRule {
  private sku: string;
  
  constructor(sku: string) {
    this.sku = sku;
  }
  
  apply(products: Product[]): number {
    const items = products.filter(product => product.sku === this.sku);
    const regularPrice = catalog[this.sku].price;
    const discountQuantity = Math.floor(items.length / 3);
    return (items.length - discountQuantity) * regularPrice;
  }
}
