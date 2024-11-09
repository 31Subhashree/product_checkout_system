import { Checkout } from "../src/checkout";
import { BulkDiscount } from "../src/discount";
import { ThreeForTwoDeal } from "../src/util";

describe('Checkout System', () => {
    const pricingRules = [
      new ThreeForTwoDeal('atv'),
      new BulkDiscount('ipd', 4, 499.99)
    ];
  
    it('should calculate total for scenario 1: atv, atv, atv, vga', () => {
      const co = new Checkout(pricingRules);
      co.scan('atv');
      co.scan('atv');
      co.scan('atv');
      co.scan('vga');
      expect(co.total()).toBe(249.00);
    });
  
    it('should calculate total for scenario 2: atv, ipd, ipd, atv, ipd, ipd, ipd', () => {
      const co = new Checkout(pricingRules);
      co.scan('atv');
      co.scan('ipd');
      co.scan('ipd');
      co.scan('atv');
      co.scan('ipd');
      co.scan('ipd');
      co.scan('ipd');
      expect(co.total()).toBe(2718.95);
    });
  
    it('should calculate total for scenario 3: mbp, vga, ipd', () => {
      const co = new Checkout(pricingRules);
      co.scan('mbp');
      co.scan('vga');
      co.scan('ipd');
      expect(co.total()).toBe(1979.98);
    });
  
    it('should apply bulk discount correctly for more than 4 ipds', () => {
      const co = new Checkout(pricingRules);
      co.scan('ipd');
      co.scan('ipd');
      co.scan('ipd');
      co.scan('ipd');
      co.scan('ipd');
      expect(co.total()).toBe(2499.95);
    });
  
    it('should handle 3-for-2 deal correctly for Apple TVs', () => {
      const co = new Checkout(pricingRules);
      co.scan('atv');
      co.scan('atv');
      co.scan('atv');
      expect(co.total()).toBe(219.00);
    });
});
