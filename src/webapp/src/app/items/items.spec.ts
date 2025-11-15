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

      expect(fixture.componentInstance.items.value()).toEqual([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Potions' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
      ]);
    });
  });

  describe('filteredItems should', () => {
    it('return all items if no filter', async () => {
      const fixture = new SutBuilder()
        .withFilters({})
        .withItems([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.filteredItems()).toEqual([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
      ]);
    });

    it('return all items if empty categories', async () => {
      const fixture = new SutBuilder()
        .withFilters({
          categories: []
        })
        .withItems([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.filteredItems()).toEqual([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
      ]);
    });

    it('return filtered items from target category', async () => {
      const fixture = new SutBuilder()
        .withFilters({
          categories: ['Medicines']
        })
        .withItems([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.filteredItems()).toEqual([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
      ]);
    });

    it('return no items if no value', async () => {
      const fixture = new SutBuilder()
        .withFilters({
          categories: ['Medicines']
        })
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.filteredItems()).toEqual([]);
    });

    it('render all items if no filter', async () => {
      const fixture = new SutBuilder()
        .withFilters({})
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

    it('render filtered items from target  category', async () => {
      const fixture = new SutBuilder()
        .withFilters({
          categories: ['Medicines']
        })
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
      expect(compiled.querySelector('[data-testid=items-list]')?.children.length).toBe(2);
      expect(compiled.querySelector('[data-testid=items-list]')?.children[0].textContent).toContain('Potion');
      expect(compiled.querySelector('[data-testid=items-list]')?.children[1].textContent).toContain('Super Potion');
    });
  });

  describe('count should', () => {
    it('return the number of all items if no filter', async () => {
      const fixture = new SutBuilder()
        .withFilters({})
        .withItems([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Potions' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.count()).toBe(2);
    });

    it('return the number of filtered items', async () => {
      const fixture = new SutBuilder()
        .withFilters({
          categories: ['Medicines']
        })
        .withItems([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.count()).toBe(2);
    });

    it('return 0 when there are no items', async () => {
      const fixture = new SutBuilder()
        .withFilters({})
        .withItems([])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.count()).toBe(0);
    });
  });
});

class SutBuilder {
  private readonly itemsService;
  private readonly cartService;
  private readonly filtersService;

  constructor() {
    this.itemsService = jasmine.createSpyObj(ItemsService, ['getItems']);
    this.cartService = jasmine.createSpyObj(CartService, ['addItem']);
    this.filtersService = jasmine.createSpyObj(FiltersService, ['filters']);
  }
  
  withItems(items: Item[]): SutBuilder {
    this.itemsService.getItems.and.returnValue(Promise.resolve(items));
    return this;
  }

  withFilters(filters: Filters): SutBuilder {
    this.filtersService.filters.and.returnValue(filters);
    return this;
  }

  build(): ComponentFixture<ItemsComponent> {
    TestBed.configureTestingModule({
      imports: [ItemsComponent],
      providers: [{ 
        provide: ItemsService, useValue: this.itemsService
      }, {
        provide: CartService, useValue: this.cartService
      }, {
        provide: FiltersService, useValue: this.filtersService
      }],
    });

    return TestBed.createComponent(ItemsComponent);
  }
}