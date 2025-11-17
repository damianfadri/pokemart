import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartButtonComponent } from './cart-button';
import { CartContext } from '../cart.context';

const methodNameAdd: keyof CartContext = 'add';
const methodNameRemove: keyof CartContext = 'remove';
const methodNameProduct: keyof CartButtonComponent = 'product';

describe('CartButton', () => {
  let component: CartButtonComponent;
  let fixture: ComponentFixture<CartButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('addToCart()', () => {
    it('should call cartContext.add() with the correct product', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          stock: 1,
        });

      spyOn(fixture.componentInstance.cartContext, methodNameAdd);

      fixture.componentInstance.addToCart();

      expect(fixture.componentInstance.cartContext.add)
        .toHaveBeenCalledWith({ 
          product: {
            name: 'Potion',
            price: 300,
            category: 'Medicines',
            stock: 1,
          },
          quantity: 1, 
        });
    });

    it('should increment when plus button is clicked', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          stock: 4,
        });

      fixture.componentInstance.addToCart();
      fixture.componentInstance.addToCart();
      fixture.componentInstance.addToCart();

      fixture.detectChanges();

      fixture.nativeElement.querySelector('[data-testid=button-cart-plus]')?.click();

      expect(fixture.componentInstance.quantity())
        .toBe(4);
    });

    it('should disable plus button when stock is used up', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          stock: 1,
        });

      fixture.componentInstance.addToCart();

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('[data-testid=button-cart-plus]')?.disabled)
        .toBeTrue();
    });
  });

  describe('removeFromCart()', () => {
    it('should call cartContext.remove() with the correct product', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          stock: 1,
        });

      spyOn(fixture.componentInstance.cartContext, methodNameRemove);

      fixture.componentInstance.removeFromCart();

      expect(fixture.componentInstance.cartContext.remove)
        .toHaveBeenCalledWith({
          product: {
            name: 'Potion',
            price: 300,
            category: 'Medicines',
            stock: 1,
          },
          quantity: 1
        });
    });

    it('should decrement when minus button is clicked', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          stock: 3,
        });

      fixture.componentInstance.addToCart();
      fixture.componentInstance.addToCart();
      fixture.componentInstance.addToCart();

      fixture.detectChanges();

      fixture.nativeElement.querySelector('[data-testid=button-cart-minus]')?.click();

      expect(fixture.componentInstance.quantity())
        .toBe(2);
    });
  });

  describe('quantity()', () => {
    it('should return 0 when cart is empty', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          stock: 1,
        });

      expect(fixture.componentInstance.quantity())
        .toBe(0);   
    });

    it('should return the quantity of the product in the cart', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          stock: 3,
        });

      fixture.componentInstance.addToCart();
      fixture.componentInstance.addToCart();
      fixture.componentInstance.addToCart();

      expect(fixture.componentInstance.quantity())
        .toBe(3);   
    });

    it('should render quantity', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          stock: 3,
        });

      fixture.componentInstance.addToCart();
      fixture.componentInstance.addToCart();
      fixture.componentInstance.addToCart();

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('[data-testid=button-cart-quantity]')?.textContent)
        .toContain('3');
    });

    it('should render default button if no quantity', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          stock: 1,
        });

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('[data-testid=button-cart-empty]'))
        .toBeTruthy();
    });

    it('should render plus and minus button if has quantity', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          stock: 1,
        });

      fixture.componentInstance.addToCart();

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('[data-testid=button-cart-with-quantity]'))
        .toBeTruthy();
    });

    it('should revert button to default if quantity is 0', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          stock: 1,
        });

      fixture.componentInstance.addToCart();

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('[data-testid=button-cart-empty]'))
        .not.toBeTruthy();

      fixture.componentInstance.removeFromCart();

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('[data-testid=button-cart-empty]'))
        .toBeTruthy();
    });
  });
});
