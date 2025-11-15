import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters';
import { Item } from '../items/item/item.model';
import { ItemsService } from '../items/items.service';
import { FiltersService } from './filters.service';

describe('Filters', () => {
  let fixture: ComponentFixture<FiltersComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FiltersComponent],
      providers: [ItemsService, FiltersService],
    });
    
    fixture = TestBed.createComponent(FiltersComponent);
  });

  describe('toggle should', () => {
    it('add category when val is true and not in categories', () => {
      fixture.componentInstance.selectedCategories.set(
        new Set<string>([])
      );

      fixture.componentInstance.toggle('Category1', true);

      expect([...fixture.componentInstance.selectedCategories()])
      .toEqual(['Category1']);
    });

    it('do nothing when val is true and in categories', () => {
      fixture.componentInstance.selectedCategories.set(
        new Set<string>(['Category1'])
      );

      fixture.componentInstance.toggle('Category1', true);

      expect(fixture.componentInstance.selectedCategories())
        .toEqual(new Set<string>(['Category1']));
    });

    it('remove category when val is false and in categories', () => {
      fixture.componentInstance.selectedCategories.set(
        new Set<string>(['Category1'])
      );

      fixture.componentInstance.toggle('Category1', false);

      expect(fixture.componentInstance.selectedCategories())
        .toEqual(new Set<string>());
    });

    it('do nothing when val is false and not in categories', () => {
      fixture.componentInstance.selectedCategories.set(
        new Set<string>(['Category2'])
      );

      fixture.componentInstance.toggle('Category1', false);

      expect(fixture.componentInstance.selectedCategories())
        .toEqual(new Set<string>(['Category2']));
    });
  });

  describe('toggled should', () => {
    it('return true if in categories', () => {
      fixture.componentInstance.selectedCategories.set(
        new Set<string>(['Category1'])
      );

      expect(fixture.componentInstance.toggled('Category1'))
        .toBeTrue();
    });

    it('return false if not in categories', () => {
      fixture.componentInstance.selectedCategories.set(
        new Set<string>(['Category2'])
      );

      expect(fixture.componentInstance.toggled('Category1'))
        .not.toBeTrue();
    });
  });

  describe('onApply should', () => {
    it('call filtersService.filters with the correct filter', () => {
      fixture.componentInstance.selectedCategories.set(
        new Set<string>(['Category1'])
      );

      spyOn(fixture.componentInstance.filtersService.filters, 'update');

      fixture.componentInstance.onApply();

      expect(fixture.componentInstance.filtersService.filters.update)
        .toHaveBeenCalled();
    });
  });

  describe('items should', () => {
    it('get all items', () => {
      spyOn(fixture.componentInstance.itemsService, 'items')
        .and.returnValue([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ]);

      expect(fixture.componentInstance.items()).toEqual([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
      ]);
    });
  });

  describe('filters should', () => {
    it('get all categories', () => {
      spyOn(fixture.componentInstance.itemsService, 'categories')
        .and.returnValue(new Set<string>([ 'Medicines', 'Poké Balls' ]));

      expect(fixture.componentInstance.categories())
        .toEqual(new Set<string>([ 'Medicines', 'Poké Balls' ]));
    });
  });
});