import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponent } from './items';
import { ItemsService } from './items.service';
import { Item } from './item/item.model';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart-item/cart-item.model';
import { FiltersService } from '../filters/filters.service';
import { Filters } from '../filters/filters.model';

describe('Items', () => {
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ItemsComponent],
      providers: [ItemsService, FiltersService, CartService],
    });

    fixture = TestBed.createComponent(ItemsComponent);
  });

  describe('items should', () => {
    it('return all items', () => {
      spyOn(fixture.componentInstance.itemsService, 'items')
        .and.returnValue([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ]);

      expect(fixture.componentInstance.items()).toEqual([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
      ]);
    });

    it('return no items if no value', () => {
      spyOn(fixture.componentInstance.itemsService, 'items')
        .and.returnValue([]);

      expect(fixture.componentInstance.items()).toEqual([]);
    });

    it('render all items', () => {
      spyOn(fixture.componentInstance.itemsService, 'items')
        .and.returnValue([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ]);

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=items-list]')?.children.length).toBe(3);
      expect(compiled.querySelector('[data-testid=items-list]')?.children[0].textContent).toContain('Potion');
      expect(compiled.querySelector('[data-testid=items-list]')?.children[1].textContent).toContain('Super Potion');
      expect(compiled.querySelector('[data-testid=items-list]')?.children[2].textContent).toContain('Great Ball');
    });
  });

  describe('count should', () => {
    it('return the number of all items', () => {
      spyOn(fixture.componentInstance.itemsService, 'items')
        .and.returnValue([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ]);

      expect(fixture.componentInstance.count()).toBe(3);
    });

    it('return 0 when there are no items', () => {
      spyOn(fixture.componentInstance.itemsService, 'items')
        .and.returnValue([]);

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

  describe('categories should', () => {
    it('return unique categories', () => {
      spyOn(service.warehouse, 'value').and.returnValue([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
      ]);

      expect(service.categories()).toEqual(
        new Set<string>([ 'Medicines', 'Poké Balls' ])
      );
    });

    it('add uncategorized if an item has no category', () => {
      spyOn(service.warehouse, 'value').and.returnValue([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' },
        { name: 'Unknown Item', price: 1, description: 'An unknown item' }
      ]);

      expect(service.categories()).toEqual(
        new Set<string>([ 'Medicines', 'Poké Balls', 'Uncategorized' ])
      );
    });

    it('add uncategorized if no items', () => {
      spyOn(service.warehouse, 'value').and.returnValue([]);

      expect(service.categories()).toEqual(
        new Set<string>([ 'Uncategorized' ])
      );
    });
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