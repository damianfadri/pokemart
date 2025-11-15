import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters';
import { ProductsService } from '../products/products.service';
import { FiltersService } from './filters.service';
import { WritableSignal } from '@angular/core';
import { Filters } from './filters.model';

const methodNameUpdate: keyof WritableSignal<Filters | undefined> = 'update';
const methodNameProducts: keyof ProductsService = 'products';
const methodNameCategories: keyof ProductsService = 'categories';

describe('Filters', () => {
  let fixture: ComponentFixture<FiltersComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FiltersComponent],
      providers: [ProductsService, FiltersService],
    });
    
    fixture = TestBed.createComponent(FiltersComponent);
  });

  describe('toggle()', () => {
    it('should add category when checked and not in categories', () => {
      fixture.componentInstance.selectedCategories.set(
        new Set<string>([])
      );

      fixture.componentInstance.toggle('Category1', true);

      expect(fixture.componentInstance.selectedCategories())
        .toEqual(new Set<string>(['Category1']));
    });

    it('should ignore toggle when checked and in categories', () => {
      fixture.componentInstance.selectedCategories.set(
        new Set<string>(['Category1'])
      );

      fixture.componentInstance.toggle('Category1', true);

      expect(fixture.componentInstance.selectedCategories())
        .toEqual(new Set<string>(['Category1']));
    });

    it('should remove category when unchecked and in categories', () => {
      fixture.componentInstance.selectedCategories.set(
        new Set<string>(['Category1'])
      );

      fixture.componentInstance.toggle('Category1', false);

      expect(fixture.componentInstance.selectedCategories())
        .toEqual(new Set<string>());
    });

    it('should ignore toggle when unchecked and not in categories', () => {
      fixture.componentInstance.selectedCategories.set(
        new Set<string>(['Category2'])
      );

      fixture.componentInstance.toggle('Category1', false);

      expect(fixture.componentInstance.selectedCategories())
        .toEqual(new Set<string>(['Category2']));
    });
  });

  describe('toggled()', () => {
    it('should return true if in categories', () => {
      fixture.componentInstance.selectedCategories.set(
        new Set<string>(['Category1'])
      );

      expect(fixture.componentInstance.toggled('Category1'))
        .toBeTrue();
    });

    it('should return false if not in categories', () => {
      fixture.componentInstance.selectedCategories.set(
        new Set<string>(['Category2'])
      );

      expect(fixture.componentInstance.toggled('Category1'))
        .not.toBeTrue();
    });
  });

  describe('onApply()', () => {
    it('should call filtersService.filters with the correct filter', () => {
      fixture.componentInstance.selectedCategories.set(
        new Set<string>(['Category1'])
      );

      spyOn(fixture.componentInstance.filtersService.filters, methodNameUpdate);

      fixture.componentInstance.onApply();

      expect(fixture.componentInstance.filtersService.filters.update)
        .toHaveBeenCalled();
    });
  });

  describe('products()', () => {
    it('should get all products', () => {
      spyOn(fixture.componentInstance.productsService, methodNameProducts)
        .and.returnValue([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ]);

      expect(fixture.componentInstance.products())
        .toEqual([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ]);
    });
  });

  describe('filters()', () => {
    it('should get all categories', () => {
      spyOn(fixture.componentInstance.productsService, methodNameCategories)
        .and.returnValue(new Set<string>([ 'Medicines', 'Poké Balls' ]));

      expect(fixture.componentInstance.categories())
        .toEqual(new Set<string>([ 'Medicines', 'Poké Balls' ]));
    });
  });
});