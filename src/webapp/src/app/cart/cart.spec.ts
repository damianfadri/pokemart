import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart';
import { CartItem } from './cart-item/cart-item.model';
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
          { item: { id: '1', name: 'Potion', price: 300 }, quantity: 2, },
          { item: { id: '2', name: 'Great Ball',  price: 600 }, quantity: 1 }
        ])
        .build();

        expect(fixture.componentInstance.items())
        .toEqual([
          { item: { id: '1', name: 'Potion', price: 300 }, quantity: 2, },
          { item: { id: '2', name: 'Great Ball',  price: 600 }, quantity: 1 }
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
          { item: { id: '1', name: 'Potion', price: 300 }, quantity: 2, },
          { item: { id: '2', name: 'Great Ball',  price: 600 }, quantity: 1 }
        ])
        .build();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-items]')?.children.length).toBe(2);
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
          { item: { id: '1', name: 'Potion', price: 300 }, quantity: 2, },
          { item: { id: '2', name: 'Great Ball',  price: 600 }, quantity: 1 }
        ])
        .build();

      expect(fixture.componentInstance.totalPrice()).toBe(1200);
    });

    it('render the total price of items in the cart', async () => {
      const fixture = new SutBuilder()
        .withItems([
          { item: { id: '1', name: 'Potion', price: 300 }, quantity: 2, },
          { item: { id: '2', name: 'Great Ball',  price: 600 }, quantity: 1 }
        ])
        .build();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=cart-total-price]')?.textContent).toContain('1200');
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

  describe('constructor should', () => {
    it('start empty', () => {
      expect(service.getItems()).toEqual([]);
    });
  });

  describe('addItem should', () => {
    it('add a new item when not present', () => {
      const item: CartItem = { item: { id: '1', name: 'Potion', price: 300 }, quantity: 1 };
      service.addItem(item);
      expect(service.getItems()).toEqual([item]);
    });

    it('increment quantity when adding an existing item', () => {
      const item1: CartItem = { item: { id: '1', name: 'Potion', price: 300 }, quantity: 2 };
      const item2: CartItem = { item: { id: '1', name: 'Potion', price: 300 }, quantity: 1 };
      service.addItem(item1);
      service.addItem(item2);

      expect(service.getItems()).toEqual([{ item: { id: '1', name: 'Potion', price: 300 }, quantity: 3 }]);
    });
  });

  describe('removeItem should', () => {
    it('decrement quantity when removing less than existing', () => {
      service.addItem({ item: { id: '1', name: 'Potion', price: 300 }, quantity: 3 });
      service.removeItem({ item: { id: '1', name: 'Potion', price: 300 }, quantity: 1 });
      expect(service.getItems()).toEqual([{ item: { id: '1', name: 'Potion', price: 300 }, quantity: 2 }]);
    });

    it('remove item completely when removing equal or more quantity', () => {
      service.addItem({ item: { id: '1', name: 'Potion', price: 300 }, quantity: 2 });
      service.removeItem({ item: { id: '1', name: 'Potion', price: 300 }, quantity: 2 });
      expect(service.getItems()).toEqual([]);

      service.addItem({ item: { id: '1', name: 'Potion', price: 300 }, quantity: 2 });
      service.removeItem({ item: { id: '1', name: 'Potion', price: 300 }, quantity: 5 });
      expect(service.getItems()).toEqual([]);
    });

    it('ignore remove for non-existing item', () => {
      service.addItem({ item: { id: '1', name: 'Potion', price: 300 }, quantity: 1 });
      service.removeItem({ item: { id: '2', name: 'Elixir', price: 500 }, quantity: 1 });
      expect(service.getItems()).toEqual([{ item: { id: '1', name: 'Potion', price: 300 }, quantity: 1 }]);
    });
  });
});

class SutBuilder {
  private readonly mockCartService;

  constructor() {
    this.mockCartService = jasmine.createSpyObj(CartService, ['getItems', 'removeItem'  ]);
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
