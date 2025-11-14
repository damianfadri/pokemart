import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from './cart-item';
import { inputBinding, signal } from '@angular/core';

describe('CartItem', () => {
  describe('total should', () => {
    it('return price multiplied by quantity', () => {
      const fixture = new SutBuilder()
        .withPrice(500)
        .withQuantity(3)
        .build();

      fixture.detectChanges();

      expect(fixture.componentInstance.total()).toBe(1500);
    });

    it('return zero when quantity is zero', () => {
      const fixture = new SutBuilder()
        .withPrice(500)
        .withQuantity(0)
        .build();

      fixture.detectChanges();
      expect(fixture.componentInstance.total()).toBe(0);
    });
  });

  describe('name should', () => {
    it('return the name input', () => {
      const fixture = new SutBuilder()
        .withName('Potion')
        .build();

      fixture.detectChanges();

      expect(fixture.componentInstance.name()).toBe('Potion');
    });

    it('render the name in the template', () => {
      const fixture = new SutBuilder()
        .withName('Super Potion')
        .build();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-item-name]')?.textContent).toContain('Super Potion');
    });
  });

  describe('price should', () => {
    it('return the price input', () => {
      const fixture = new SutBuilder()
        .withPrice(750)
        .build();

      fixture.detectChanges();

      expect(fixture.componentInstance.price()).toBe(750);
    });

    it('render the price in the template', () => {
      const fixture = new SutBuilder()
        .withPrice(450)
        .build();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-item-price]')?.textContent).toContain('450');
    });
  });

  describe('quantity should', () => {
    it('return the quantity input', () => {
      const fixture = new SutBuilder()
        .withQuantity(5)
        .build();

      fixture.detectChanges();

      expect(fixture.componentInstance.quantity()).toBe(5);
    });

    it('render the quantity in the template', () => {
      const fixture = new SutBuilder()
        .withQuantity(4)
        .build();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-item-quantity]')?.textContent).toContain('4');
    });
  });

  describe('removeFromCart should', () => {
    it('emit removeFromCart output with the correct item', () => {

      const fixture = new SutBuilder()
        .withName('Hyper Potion')
        .withPrice(1200)
        .withQuantity(2)
        .build();

      spyOn(fixture.componentInstance.cartService, 'removeItem');

      fixture.detectChanges();
      fixture.componentInstance.removeFromCart();

      expect(fixture.componentInstance.cartService.removeItem).toHaveBeenCalledWith({
        name: 'Hyper Potion',
        price: 1200,
        quantity: 2
      });
    });
  });
});

class SutBuilder {
  private mockName: string;
  private mockPrice: number;
  private mockQuantity: number;

  constructor() {
    this.mockName = 'Potion';
    this.mockPrice = 300;
    this.mockQuantity = 1;
  }

  withPrice(price: number): SutBuilder {
    this.mockPrice = price;
    return this;
  }

  withQuantity(quantity: number): SutBuilder {
    this.mockQuantity = quantity;
    return this;
  }

  withName(name: string): SutBuilder {
    this.mockName = name;
    return this;
  }

  build(): ComponentFixture<CartItemComponent> {
    TestBed.configureTestingModule({
      imports: [CartItemComponent],
    });

    const fixture = TestBed.createComponent(CartItemComponent);

    fixture.componentRef.setInput('name', this.mockName);
    fixture.componentRef.setInput('price', this.mockPrice);
    fixture.componentRef.setInput('quantity', this.mockQuantity);
    return fixture;
  }
}
