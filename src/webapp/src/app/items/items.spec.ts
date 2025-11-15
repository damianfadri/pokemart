import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponent } from './items';
import { ItemsService } from './items.service';
import { Item } from './item/item.model';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart-item/cart-item.model';
import { FiltersService } from '../filters/filters.service';
import { Filters } from '../filters/filters.model';

describe('Items', () => {
  describe('items should', () => {
    it('get all items', async () => {
      const fixture = new SutBuilder()
        .withItems([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Potions' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.items()).toEqual([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Potions' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
      ]);
    });
  });

  describe('items should', () => {
    it('return all items', async () => {
      const fixture = new SutBuilder()
        .withItems([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.items()).toEqual([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
      ]);
    });

    it('return no items if no value', async () => {
      const fixture = new SutBuilder()
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.items()).toEqual([]);
    });

    it('render all items', async () => {
      const fixture = new SutBuilder()
        .withItems([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=items-list]')?.children.length).toBe(3);
      expect(compiled.querySelector('[data-testid=items-list]')?.children[0].textContent).toContain('Potion');
      expect(compiled.querySelector('[data-testid=items-list]')?.children[1].textContent).toContain('Super Potion');
      expect(compiled.querySelector('[data-testid=items-list]')?.children[2].textContent).toContain('Great Ball');
    });
  });

  describe('count should', () => {
    it('return the number of all items', async () => {
      const fixture = new SutBuilder()
        .withItems([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Potions' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
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
});

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemsService, FiltersService]
    });

    service = TestBed.inject(ItemsService);
  });

  describe('items should', () => {
    it('return no items if warehouse is empty', () => {
      spyOn(service.warehouse, 'value').and.returnValue([]);

      expect(service.items()).toEqual([]);
    });

    it('return all items if no filters', () => {
      spyOn(service.warehouse, 'value').and.returnValue([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
      ]);

      expect(service.items()).toEqual([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
      ]);
    });

    it('return filtered items from target category', () => {
      spyOn(service.filtersService, 'filters').and.returnValue({
        categories: ['Medicines']
      });

      spyOn(service.warehouse, 'value').and.returnValue([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
      ]);

      expect(service.items()).toEqual([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' }
      ]);
    });

    it('return filtered items from multiple categories', () => {
      spyOn(service.filtersService, 'filters').and.returnValue({
        categories: ['Medicines', 'Items']
      });

      spyOn(service.warehouse, 'value').and.returnValue([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' },
        { name: 'Escape Rope', price: 550, description: 'Escapes the room', category: 'Items' }
      ]);

      expect(service.items()).toEqual([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Escape Rope', price: 550, description: 'Escapes the room', category: 'Items' }
      ]);
    })

    it('return no category items if target category is uncategorized', () => {
      spyOn(service.filtersService, 'filters').and.returnValue({
        categories: ['Uncategorized']
      });

      spyOn(service.warehouse, 'value').and.returnValue([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' },
        { name: 'Unknown Item', price: 1, description: 'An unknown item' }
      ]);

      expect(service.items()).toEqual([
        { name: 'Unknown Item', price: 1, description: 'An unknown item' }
      ]);
    });
  });
});

class SutBuilder {
  private items: Item[] = [];
  
  withItems(items: Item[]): SutBuilder {
    this.items = items;
    return this;
  }

  build(): ComponentFixture<ItemsComponent> {
    TestBed.configureTestingModule({
      imports: [ItemsComponent],
      providers: [ItemsService, FiltersService, CartService],
    });

    
    const fixture = TestBed.createComponent(ItemsComponent);

    spyOn(fixture.componentInstance.itemsService, 'items').and.returnValue(this.items);

    return fixture;
  }
}