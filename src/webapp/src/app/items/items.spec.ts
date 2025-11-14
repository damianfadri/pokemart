import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponent } from './items';
import { ItemsService } from './items.service';
import { Item } from './item/item.model';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart.model';

describe('Items', () => {
  describe('items should', () => {
    it('get items', async () => {

      const fixture = new SutBuilder()
        .withItems([
          { id: '1', name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Potions' },
          { id: '2', name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.items.value()).toEqual([
        { id: '1', name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Potions' },
        { id: '2', name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
      ]);
    });

    it('render items', async () => {
      const fixture = new SutBuilder()
        .withItems([
          { id: '1', name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Potions' },
          { id: '2', name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=items-list]')?.children.length).toBe(2);
      expect(compiled.querySelector('[data-testid=items-list]')?.children[0].textContent).toContain('Potion');
      expect(compiled.querySelector('[data-testid=items-list]')?.children[1].textContent).toContain('Great Ball');
    });
  });

  describe('count should', () => {
    it('return the number of items', async () => {
      const fixture = new SutBuilder()
        .withItems([
          { id: '1', name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Potions' },
          { id: '2', name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.count()).toBe(2);
    });

    it('return 0 when there are no items', async () => {
      const fixture = new SutBuilder()
        .withItems([])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.count()).toBe(0);
    });
  });

  describe('onAddToCart should', () => {
    it('call cartService.addItem with the correct item', async () => {
      const fixture = new SutBuilder()
        .withItems([])
        .build();

      fixture.componentInstance.onAddToCart({ 
        name: 'Potion', 
        quantity: 1, 
        price: 300 });

      expect(fixture.componentInstance.cartService.addItem)
        .toHaveBeenCalledWith({ 
          name: 'Potion', 
          quantity: 1, 
          price: 300 
        });
    });
  });
});

class SutBuilder {
  private readonly mockItemsService;
  private readonly mockCartService;

  constructor() {
    this.mockItemsService = jasmine.createSpyObj(ItemsService, ['getItems']);
    this.mockCartService = jasmine.createSpyObj(CartService, ['addItem']);
  }
  
  withItems(items: Item[]): SutBuilder {
    this.mockItemsService.getItems.and.returnValue(Promise.resolve(items));
    return this;
  }

  build(): ComponentFixture<ItemsComponent> {
    TestBed.configureTestingModule({
      imports: [ItemsComponent],
      providers: [{ 
        provide: ItemsService, useValue: this.mockItemsService
      }, {
        provide: CartService, useValue: this.mockCartService
      }],
    });

    return TestBed.createComponent(ItemsComponent);
  }
}