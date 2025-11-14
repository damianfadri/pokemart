import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart';
import { CartItem } from './cart.model';
import { CartService } from './cart.service';

describe('Cart', () => {
  describe('items should', () => {
    it('return empty array when cart is empty', () => {
      const fixture = new SutBuilder()
        .withItems([])
        .build();

      expect(fixture.componentInstance.items()).toEqual([]);
    });

    it('return items in the cart', async () => {
      const fixture = new SutBuilder()
        .withItems([
          { name: 'Potion', quantity: 2, price: 300 },
          { name: 'Great Ball', quantity: 1, price: 600 }
        ])
        .build();

        expect(fixture.componentInstance.items())
        .toEqual([
          { name: 'Potion', quantity: 2, price: 300 },
          { name: 'Great Ball', quantity: 1, price: 600 }
        ]);
    });

    it('render no items when cart is empty', () => {
      const fixture = new SutBuilder()
        .withItems([])
        .build();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-no-items]')?.textContent).toBe("Your cart is empty.");
    });

    it('render items in the cart', () => {
      const fixture = new SutBuilder()
        .withItems([
          { name: 'Potion', quantity: 2, price: 300 },
          { name: 'Great Ball', quantity: 1, price: 600 }
        ])
        .build();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-items]')?.children.length).toBe(2);

      expect(compiled.querySelector('[data-testid=cart-items]')?.children[0]
        .querySelector('[data-testid=cart-item-name]')?.textContent).toContain('Potion');

      expect(compiled.querySelector('[data-testid=cart-items]')?.children[0]
        .querySelector('[data-testid=cart-item-quantity]')?.textContent).toContain('2');

      expect(compiled.querySelector('[data-testid=cart-items]')?.children[0]
        .querySelector('[data-testid=cart-item-price]')?.textContent).toContain('300');

      expect(compiled.querySelector('[data-testid=cart-items]')?.children[1]
        .querySelector('[data-testid=cart-item-name]')?.textContent).toContain('Great Ball');

      expect(compiled.querySelector('[data-testid=cart-items]')?.children[1]
        .querySelector('[data-testid=cart-item-quantity]')?.textContent).toContain('1');

      expect(compiled.querySelector('[data-testid=cart-items]')?.children[1]
        .querySelector('[data-testid=cart-item-price]')?.textContent).toContain('600');
    });
  });

  describe('totalPrice should', () => {
    it('return 0 when cart is empty', () => {
      const fixture = new SutBuilder()
        .withItems([])
        .build();

      expect(fixture.componentInstance.totalPrice()).toBe(0);
    });

    it('return the total price of items in the cart', async () => {
      const fixture = new SutBuilder()
        .withItems([
          { name: 'Potion', quantity: 2, price: 300 },
          { name: 'Great Ball', quantity: 1, price: 600 }
        ])
        .build();

      expect(fixture.componentInstance.totalPrice()).toBe(1200);
    });

    it('render the total price of items in the cart', async () => {
      const fixture = new SutBuilder()
        .withItems([
          { name: 'Potion', quantity: 2, price: 300 },
          { name: 'Great Ball', quantity: 1, price: 600 }
        ])
        .build();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-total-price]')?.textContent).toContain('1200');
    });
  });

});

class SutBuilder {
  private readonly mockCartService;

  constructor() {
    this.mockCartService = jasmine.createSpyObj(CartService, ['getItems']);
  }

  withItems(items: CartItem[]): SutBuilder {
    this.mockCartService.getItems.and.returnValue(items);
    return this;
  }
  
  build(): ComponentFixture<CartComponent> {
    TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [{ 
        provide: CartService, useValue: this.mockCartService
      }]
    });

    return TestBed.createComponent(CartComponent);
  }
}
