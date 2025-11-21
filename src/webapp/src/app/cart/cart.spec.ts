import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart';
import { CartContext } from './cart.context';
import { provideRouter } from '@angular/router';

const methodNameList: keyof CartContext = 'list';

describe('Cart', () => {
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [CartContext, provideRouter([])]
    });

    fixture = TestBed.createComponent(CartComponent);
  });

  describe('items()', () => {
    it('should return empty array when cart is empty', () => {
      spyOn(fixture.componentInstance.cartContext, methodNameList)
        .and.returnValue([]);

      expect(fixture.componentInstance.items()).toEqual([]);
    });

    it('should return items in cart', () => {
      spyOn(fixture.componentInstance.cartContext, methodNameList)
        .and.returnValue([
          { product: { name: 'Potion', price: 300 }, quantity: 2, },
          { product: { name: 'Great Ball',  price: 600 }, quantity: 1 }
        ]);

        expect(fixture.componentInstance.items())
        .toEqual([
          { product: { name: 'Potion', price: 300 }, quantity: 2, },
          { product: { name: 'Great Ball',  price: 600 }, quantity: 1 }
        ]);
    });

    it('should render cart is empty message when no items in cart', () => {
      spyOn(fixture.componentInstance.cartContext, methodNameList)
          .and.returnValue([]);

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-no-items]')?.textContent)
        .toBe("Your cart is empty.");
    });

    it('should render items in the cart', () => {
      spyOn(fixture.componentInstance.cartContext, methodNameList)
        .and.returnValue([
          { product: { name: 'Potion', price: 300 }, quantity: 2, },
          { product: { name: 'Great Ball',  price: 600 }, quantity: 1 }
        ]);

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-items]')?.children.length)
        .toBe(2);
    });
  });

  describe('total()', () => {
    it('should return 0 when cart is empty', () => {
      spyOn(fixture.componentInstance.cartContext, methodNameList)
        .and.returnValue([]);

      expect(fixture.componentInstance.total())
        .toBe(0);
    });

    it('should return the total price of items in the cart', () => {
      spyOn(fixture.componentInstance.cartContext, methodNameList)
        .and.returnValue([
          { product: { name: 'Potion', price: 300 }, quantity: 2, },
          { product: { name: 'Great Ball',  price: 600 }, quantity: 1 }
        ]);

      expect(fixture.componentInstance.total())
        .toBe(1200);
    });

    it('should render the total price', () => {
      spyOn(fixture.componentInstance.cartContext, methodNameList)
        .and.returnValue([
          { product: { name: 'Potion', price: 300 }, quantity: 2, },
          { product: { name: 'Great Ball',  price: 600 }, quantity: 1 }
        ]);

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-total-price]')?.textContent)
        .toContain('1200');
    });
  });
});

describe('CartContext', () => {
  let context: CartContext;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartContext]
    });

    context = TestBed.inject(CartContext);
  });

  describe('constructor()', () => {
    it('should start empty', () => {
      expect(context.list())
        .toEqual([]);
    });
  });

  describe('add()', () => {
    it('should add a new item if item is not in cart', () => {
      context.add({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 1 
      });

      expect(context.list())
        .toEqual([{
          product: { 
            name: 'Potion', 
            price: 300 
          }, 
          quantity: 1 
        }]);
    });

    it('should increment quantity if item is in cart', () => {
      context.add({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 2
      });

      context.add({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 1 
      });

      expect(context.list())
        .toEqual([{
          product: { 
            name: 'Potion', 
            price: 300 
          }, 
          quantity: 3
        }]);
    });
  });

  describe('remove()', () => {
    it('should decrement quantity if item is in cart and cart quantity is greater', () => {
      context.add({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 3
      });

      context.remove({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 1 
      });
      
      expect(context.list())
        .toEqual([{
          product: { 
            name: 'Potion', 
            price: 300 
          }, 
          quantity: 2
        }]);
    });

    it('should remove item if item is in cart and cart quantity is equal', () => {
      context.add({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 1 
      });

      context.remove({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 1
      });

      expect(context.list())
        .toEqual([]);
    });

    it('should remove item if item is in cart and cart quantity is less', () => {
      context.add({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 1 
      });

      context.remove({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 2
      });

      expect(context.list())
        .toEqual([]);
    });

    it('should ignore remove if item is not in cart', () => {
      context.add({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 1 
      });

      context.remove({
        product: { 
          name: 'Elixir', 
          price: 500 
        }, 
        quantity: 1
      });

      expect(context.list())
        .toEqual([{
          product: { 
            name: 'Potion', 
            price: 300 
          }, 
          quantity: 1 
        }]);
    });
  });
});