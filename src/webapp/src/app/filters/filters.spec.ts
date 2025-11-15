import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters';
import { Item } from '../items/item/item.model';
import { ItemsService } from '../items/items.service';
import { FiltersService } from './filters.service';

describe('Filters', () => {
  describe('toggle should', () => {
    it('add category when val is true and not in categories', () => {
      var fixture = 
        new SutBuilder()
          .withSelectedCategories([])
          .build();

      fixture.componentInstance.toggle('Category1', true);

      expect([...fixture.componentInstance.selectedCategories()])
      .toEqual(['Category1']);
    });

    it('do nothing when val is true and in categories', () => {
      var fixture = 
        new SutBuilder()
          .withSelectedCategories(['Category1'])
          .build();

      fixture.componentInstance.toggle('Category1', true);

      expect([...fixture.componentInstance.selectedCategories()])
      .toEqual(['Category1']);
    });

    it('remove category when val is false and in categories', () => {
      var fixture = 
        new SutBuilder()
          .withSelectedCategories(['Category1'])
          .build();

      fixture.componentInstance.toggle('Category1', false);

      expect([...fixture.componentInstance.selectedCategories()])
      .toEqual([]);
    });

    it('do nothing when val is false and not in categories', () => {
      var fixture = 
        new SutBuilder()
          .withSelectedCategories(['Category2'])
          .build();

      fixture.componentInstance.toggle('Category1', false);

      expect([...fixture.componentInstance.selectedCategories()])
      .toEqual(['Category2']);
    });
  });

  describe('toggled should', () => {
    it('return true if in categories', () => {
      var fixture = 
        new SutBuilder()
          .withSelectedCategories(['Category1'])
          .build();

      expect(fixture.componentInstance.toggled('Category1')).toBeTrue();
    });

    it('return false if not in categories', () => {
      var fixture = 
        new SutBuilder()
          .withSelectedCategories(['Category2'])
          .build();

      expect(fixture.componentInstance.toggled('Category1')).not.toBeTrue();
    });
  });

  describe('onApply should', () => {
    it('call filtersService.filters with the correct filter', () => {
      var fixture = 
        new SutBuilder()
          .withSelectedCategories(['Category1'])
          .build();

      spyOn(fixture.componentInstance.filtersService.filters, 'update');

      fixture.componentInstance.onApply();

      expect(fixture.componentInstance.filtersService.filters.update).toHaveBeenCalled();
    });
  });

  describe('items should', () => {
    it('get all items', async () => {
      const fixture = new SutBuilder()
        .withItems([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.items()).toEqual([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
      ]);
    });
  });

  describe('categories should', () => {
    it('get unique categories from items', async () => {
      const fixture = new SutBuilder()
        .withItems([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.categories()).toEqual(
        new Set<string>([
        'Medicines',
        'Poké Balls'
      ]));
    });

    it('add uncategorized if an item has no category', async () => {
      const fixture = new SutBuilder()
        .withItems([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' },
          { name: 'Unknown Item', price: 1, description: 'An unknown item' }
        ])
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.categories()).toEqual(
        new Set<string>([
          'Medicines',
          'Poké Balls',
          'Uncategorized'
        ])
      );
    });

    it('add uncategorized if no items', async () => {
      const fixture = new SutBuilder()
        .build();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.categories()).toEqual(
        new Set<string>([
          'Uncategorized'
        ])
      );
    });
  })
});

class SutBuilder {
  private selectedCategories: string[] = [];
  private items: Item[] = [];

  withSelectedCategories(categories: string[]): SutBuilder {
    this.selectedCategories = categories;
    return this;
  }

  withItems(items: Item[]): SutBuilder {
    this.items = items;
    return this;
  }

  build(): ComponentFixture<FiltersComponent> {
    TestBed.configureTestingModule({
      imports: [FiltersComponent],
      providers: [ItemsService, FiltersService],
    });
    
    const fixture = TestBed.createComponent(FiltersComponent);

    spyOn(fixture.componentInstance.itemsService, 'items').and.returnValue(this.items);

    fixture.componentInstance.selectedCategories.set(
      new Set<string>(this.selectedCategories)
    );

    return fixture;
  }
}
