import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout';
import { provideRouter } from '@angular/router';

describe('Checkout', () => {
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
  });

  describe('cart', () => {
    it('should get cart items from cart context', async () => {
      const cartContext = fixture.componentInstance.cartContext;
      spyOn(cartContext, 'list').and.returnValue([
        { product: { name: 'Potion', price: 300 }, quantity: 1 },
        { product: { name: 'Super Repel', price: 800 }, quantity: 2 },
      ]);

      fixture.detectChanges();
      
      const cartItems = fixture.componentInstance.cart();

      expect(cartItems.length).toBe(2);
      expect(cartItems[0].product.name).toBe('Potion');
      expect(cartItems[1].product.name).toBe('Super Repel');
    });
  });

  describe('cartEmpty', () => {
    it('should be false when cart is not empty', async () => {
      const cartContext = fixture.componentInstance.cartContext;
      spyOn(cartContext, 'list').and.returnValue([
        { product: { name: 'Potion', price: 300 }, quantity: 1 },
      ]);

      fixture.detectChanges();

      expect(fixture.componentInstance.cartEmpty()).toBeFalse();
    });

    it('should be true when cart is empty', () => {
      const cartContext = fixture.componentInstance.cartContext;
      spyOn(cartContext, 'list').and.returnValue([]);

      fixture.detectChanges();

      expect(fixture.componentInstance.cartEmpty()).toBeTrue();
    });

    it('should render empty cart message when cart is empty', () => {
      const cartContext = fixture.componentInstance.cartContext;
      spyOn(cartContext, 'list').and.returnValue([]);
      
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=checkout-empty]')).not.toBeNull();
      expect(compiled.querySelector('[data-testid=checkout-empty]')?.textContent).toContain("Your cart is empty");
    });

    it('should render checkout details when cart is not empty', () => {
      const cartContext = fixture.componentInstance.cartContext;
      spyOn(cartContext, 'list').and.returnValue([
        { product: { name: 'Potion', price: 300 }, quantity: 1 },
      ]);

      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=checkout-details]')).not.toBeNull();

      expect(compiled.querySelector('[data-testid=checkout-products]')).not.toBeNull();
      expect(compiled.querySelector('[data-testid=checkout-products]')?.textContent).toContain('Potion');
    });
  });
});
