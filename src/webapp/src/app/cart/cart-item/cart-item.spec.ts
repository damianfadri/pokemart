import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from './cart-item';

describe('CartItem', () => {
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartItemComponent],
    });

    fixture = TestBed.createComponent(CartItemComponent);
  });

  describe('total should', () => {
    it('return price multiplied by quantity', () => {
      fixture.componentRef.setInput('item', {
        name: 'Potion',
        price: 300
      });

      fixture.componentRef.setInput('quantity', 5);

      expect(fixture.componentInstance.total()).toBe(1500);
    });

    it('return zero when quantity is zero', () => {
      fixture.componentRef.setInput('item', {
        name: 'Potion',
        price: 300
      });

      fixture.componentRef.setInput('quantity', 0);

      expect(fixture.componentInstance.total()).toBe(0);
    });
  });

  describe('item should', () => {
    it('return the item input', () => {
      fixture.componentRef.setInput('item', {
        name: 'Potion',
        price: 300
      });

      fixture.componentRef.setInput('quantity', 1);

      expect(fixture.componentInstance.item())
        .toEqual({
          name: 'Potion',
          price: 300
        });
    });

    it('render the item', () => {
      fixture.componentRef.setInput('item', {
        name: 'Potion',
        price: 300
      });

      fixture.componentRef.setInput('quantity', 1);

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-item-name]')?.textContent)
        .toContain('Potion');
      expect(compiled.querySelector('[data-testid=cart-item-price]')?.textContent)
        .toContain('300');
    });
  });

  describe('quantity should', () => {
    it('return the quantity input', () => {
      fixture.componentRef.setInput('item', {
        name: 'Potion',
        price: 300
      });

      fixture.componentRef.setInput('quantity', 5);

      expect(fixture.componentInstance.quantity()).toBe(5);
    });

    it('render the quantity in the template', () => {
      fixture.componentRef.setInput('item', {
        name: 'Potion',
        price: 300
      });

      fixture.componentRef.setInput('quantity', 5);

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-item-quantity]')?.textContent)
        .toContain('5');
    });
  });

  describe('removeFromCart should', () => {
    it('emit removeFromCart output with the correct item', () => {
      fixture.componentRef.setInput('item', {
        name: 'Potion',
        price: 300
      });

      fixture.componentRef.setInput('quantity', 5);

      spyOn(fixture.componentInstance.cartService, 'removeItem');

      fixture.componentInstance.removeFromCart();

      expect(fixture.componentInstance.cartService.removeItem)
        .toHaveBeenCalledWith({
          item: {
            name: 'Potion',
            price: 300
          },
          quantity: 5
        });
    });
  });
});