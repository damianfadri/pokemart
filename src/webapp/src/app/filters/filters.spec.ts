import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters';
import { ProductsService } from '../products/products.service';
import { FiltersService } from './filters.service';
import { WritableSignal } from '@angular/core';
import { Filters } from './filters.model';

const methodNameSet: keyof WritableSignal<Filters | undefined> = 'set';
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

      fixture.componentInstance.minPrice.set(100);
      fixture.componentInstance.maxPrice.set(300);

      spyOn(fixture.componentInstance.filtersService.filters, methodNameSet);

      fixture.componentInstance.onApply();

      expect(fixture.componentInstance.filtersService.filters.set)
        .toHaveBeenCalledWith({
          categories: ['Category1'],
          price: {
            min: 100,
            max: 300,
          }
        });
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

  describe('setMinPrice()', () => {
    it('should set minPrice', () => {
      fixture.componentInstance.setMinPrice(100);

      expect(fixture.componentInstance.minPrice())
        .toBe(100);
    });

    it('should set minPrice to undefined if 0', () => {
      fixture.componentInstance.setMinPrice(0);

      expect(fixture.componentInstance.minPrice())
        .toBe(undefined);
    });

    it('should set minPrice to undefined if less than 0', () => {
      fixture.componentInstance.setMinPrice(-1);

      expect(fixture.componentInstance.minPrice())
        .toBe(undefined);
    });

    it('should match maxPrice if minPrice is greater', () => {
      fixture.componentInstance.setMaxPrice(100);
      fixture.componentInstance.setMinPrice(200);

      expect(fixture.componentInstance.minPrice())
        .toBe(200);

      expect(fixture.componentInstance.maxPrice())
        .toBe(200);
    })
  });

  describe('setMaxPrice()', () => {
    it('should set maxPrice', () => {
      fixture.componentInstance.setMaxPrice(100);

      expect(fixture.componentInstance.maxPrice())
        .toBe(100);
    });

    it('should set maxPrice to undefined if 0', () => {
      fixture.componentInstance.setMaxPrice(0);

      expect(fixture.componentInstance.maxPrice())
        .toBe(undefined);
    });

    it('should set minPrice to undefined if less than 0', () => {
      fixture.componentInstance.setMaxPrice(-1);

      expect(fixture.componentInstance.maxPrice())
        .toBe(undefined);
    });

    it('should match minPrice if maxPrice is less', () => {
      fixture.componentInstance.setMinPrice(200);
      fixture.componentInstance.setMaxPrice(100);

      expect(fixture.componentInstance.maxPrice())
        .toBe(100);

      expect(fixture.componentInstance.minPrice())
        .toBe(100);
    })
  });
});