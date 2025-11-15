import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart';
import { CartService } from './cart.service';

const methodNameList: keyof CartService = 'list';

describe('Cart', () => {
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [CartService]
    });

    fixture = TestBed.createComponent(CartComponent);
  });

  describe('items()', () => {
    it('should return empty array when cart is empty', () => {
      spyOn(fixture.componentInstance.cartService, methodNameList)
        .and.returnValue([]);

      expect(fixture.componentInstance.items()).toEqual([]);
    });

    it('should return items in cart', () => {
      spyOn(fixture.componentInstance.cartService, methodNameList)
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
      spyOn(fixture.componentInstance.cartService, methodNameList)
          .and.returnValue([]);

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-no-items]')?.textContent)
        .toBe("Your cart is empty.");
    });

    it('should render items in the cart', () => {
      spyOn(fixture.componentInstance.cartService, methodNameList)
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
      spyOn(fixture.componentInstance.cartService, methodNameList)
        .and.returnValue([]);

      expect(fixture.componentInstance.total())
        .toBe(0);
    });

    it('should return the total price of items in the cart', () => {
      spyOn(fixture.componentInstance.cartService, methodNameList)
        .and.returnValue([
          { product: { name: 'Potion', price: 300 }, quantity: 2, },
          { product: { name: 'Great Ball',  price: 600 }, quantity: 1 }
        ]);

      expect(fixture.componentInstance.total())
        .toBe(1200);
    });

    it('should render the total price', () => {
      spyOn(fixture.componentInstance.cartService, methodNameList)
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

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService]
    });

    service = TestBed.inject(CartService);
  });

  describe('constructor()', () => {
    it('should start empty', () => {
      expect(service.list())
        .toEqual([]);
    });
  });

  describe('add()', () => {
    it('should add a new item if item is not in cart', () => {
      service.add({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 1 
      });

      expect(service.list())
        .toEqual([{
          product: { 
            name: 'Potion', 
            price: 300 
          }, 
          quantity: 1 
        }]);
    });

    it('should increment quantity if item is in cart', () => {
      service.add({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 2
      });

      service.add({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 1 
      });

      expect(service.list())
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
      service.add({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 3
      });

      service.remove({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 1 
      });
      
      expect(service.list())
        .toEqual([{
          product: { 
            name: 'Potion', 
            price: 300 
          }, 
          quantity: 2
        }]);
    });

    it('should remove item if item is in cart and cart quantity is equal', () => {
      service.add({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 1 
      });

      service.remove({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 1
      });

      expect(service.list())
        .toEqual([]);
    });

    it('should remove item if item is in cart and cart quantity is less', () => {
      service.add({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 1 
      });

      service.remove({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 2
      });

      expect(service.list())
        .toEqual([]);
    });

    it('should ignore remove if item is not in cart', () => {
      service.add({
        product: { 
          name: 'Potion', 
          price: 300 
        }, 
        quantity: 1 
      });

      service.remove({
        product: { 
          name: 'Elixir', 
          price: 500 
        }, 
        quantity: 1
      });

      expect(service.list())
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