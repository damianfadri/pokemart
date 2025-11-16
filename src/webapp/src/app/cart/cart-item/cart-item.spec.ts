import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from './cart-item';
import { CartContext } from '../cart.context';

const methodNameProduct: keyof CartItemComponent = 'product';
const methodNameQuantity: keyof CartItemComponent = 'quantity';
const methodNameRemove: keyof CartContext = 'remove';

describe('CartItem', () => {
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartItemComponent],
    });

    fixture = TestBed.createComponent(CartItemComponent);
  });

  describe('total()', () => {
    it('should return price multiplied by quantity', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300
        });

      fixture.componentRef.setInput(methodNameQuantity, 5);

      expect(fixture.componentInstance.total()).toBe(1500);
    });

    it('should return 0 when quantity is 0', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300
        });

      fixture.componentRef.setInput(methodNameQuantity, 0);

      expect(fixture.componentInstance.total()).toBe(0);
    });
  });

  describe('product()', () => {
    it('should return the item', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300
        });

      fixture.componentRef.setInput(methodNameQuantity, 1);

      expect(fixture.componentInstance.product())
        .toEqual({
          name: 'Potion',
          price: 300
        });
    });

    it('should render the item', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300
        });

      fixture.componentRef.setInput(methodNameQuantity, 1);

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-item-name]')?.textContent)
        .toContain('Potion');
      expect(compiled.querySelector('[data-testid=cart-item-price]')?.textContent)
        .toContain('300');
    });
  });

  describe('quantity()', () => {
    it('should return the quantity', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300
        });

      fixture.componentRef.setInput(methodNameQuantity, 5);

      expect(fixture.componentInstance.quantity()).toBe(5);
    });

    it('should render the quantity', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300
        });

      fixture.componentRef.setInput(methodNameQuantity, 5);

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-item-quantity]')?.textContent)
        .toContain('5');
    });
  });

  describe('removeFromCart()', () => {
    it('should call cartContext.remove() with the correct item', () => {
      fixture.componentRef.setInput(
        methodNameProduct as any, {
          name: 'Potion',
          price: 300
        });

      fixture.componentRef.setInput(methodNameQuantity, 5);

      spyOn(fixture.componentInstance.cartContext, methodNameRemove);

      fixture.componentInstance.removeFromCart();

      expect(fixture.componentInstance.cartContext.remove)
        .toHaveBeenCalledWith({
          product: {
            name: 'Potion',
            price: 300
          },
          quantity: 5
        });
    });
  });
});