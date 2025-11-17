import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products';
import { ProductsService } from './products.service';
import { FiltersContext } from '../filters/filters.context';
import { provideRouter } from '@angular/router';
import { ProductsContext } from './products.context';
import { ResourceRef } from '@angular/core';
import { Product } from '../product/product.model';

const methodNameProducts: keyof ProductsContext = 'products';
const methodNameFetchedProducts: keyof ResourceRef<Product[]> = 'value';
const methodNameFilters: keyof FiltersContext = 'filters';

describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [ProductsService, FiltersContext, provideRouter([])],
    });

    fixture = TestBed.createComponent(ProductsComponent);
  });

  describe('products()', () => {
    it('should return all products', () => {
      spyOn(fixture.componentInstance.productsContext, methodNameProducts)
        .and.returnValue([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' },
          { name: 'Great Ball', price: 600, category: 'Poké Balls' }
        ]);

      expect(fixture.componentInstance.products())
        .toEqual([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' },
          { name: 'Great Ball', price: 600, category: 'Poké Balls' }
        ]);
    });

    it('should return 0 products if there are no products', () => {
      spyOn(fixture.componentInstance.productsContext, methodNameProducts)
        .and.returnValue([]);

      expect(fixture.componentInstance.products())
        .toEqual([]);
    });

    it('should render all products', () => {
      spyOn(fixture.componentInstance.productsContext, methodNameProducts)
        .and.returnValue([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' },
          { name: 'Great Ball', price: 600, category: 'Poké Balls' }
        ]);

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=items-list]')?.children.length)
        .toBe(3);
      expect(compiled.querySelector('[data-testid=items-list]')?.children[0].textContent)
        .toContain('Potion');
      expect(compiled.querySelector('[data-testid=items-list]')?.children[1].textContent)
        .toContain('Super Potion');
      expect(compiled.querySelector('[data-testid=items-list]')?.children[2].textContent)
        .toContain('Great Ball');
    });
  });

  describe('count()', () => {
    it('should return the count of all products', () => {
      spyOn(fixture.componentInstance.productsContext, methodNameProducts)
        .and.returnValue([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' },
          { name: 'Great Ball', price: 600, category: 'Poké Balls' }
        ]);

      expect(fixture.componentInstance.count())
        .toBe(3);
    });

    it('should return 0 if there are no products', () => {
      spyOn(fixture.componentInstance.productsContext, methodNameProducts)
        .and.returnValue([]);

      expect(fixture.componentInstance.count())
        .toBe(0);
    });
  });
});

describe('ProductsContext', () => {
  let context: ProductsContext;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService, FiltersContext]
    });

    context = TestBed.inject(ProductsContext);
  });

  describe('categories()', () => {
    it('should return unique categories', () => {
      spyOn(context.fetchedProducts, 'value')
        .and.returnValue([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' },
          { name: 'Great Ball', price: 600, category: 'Poké Balls' }
        ]);

      expect(context.categories())
        .toEqual(
          new Set<string>([ 'Medicines', 'Poké Balls' ]));
    });

    it('should add uncategorized if a product has no category', () => {
      spyOn(context.fetchedProducts, 'value')
        .and.returnValue([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' },
          { name: 'Great Ball', price: 600, category: 'Poké Balls' },
          { name: 'Unknown Product', price: 1 }
        ]);

      expect(context.categories())
        .toEqual(
          new Set<string>([ 'Medicines', 'Poké Balls', 'Uncategorized' ])
        );
    });

    it('should add uncategorized if no products', () => {
      spyOn(context.fetchedProducts, methodNameFetchedProducts)
        .and.returnValue([]);

      expect(context.categories())
        .toEqual(
          new Set<string>([ 'Uncategorized' ])
        );
    });
  });

  describe('products()', () => {
    it('should return 0 products if fetched products are empty', () => {
      spyOn(context.fetchedProducts, methodNameFetchedProducts)
        .and.returnValue([]);

      expect(context.products())
        .toEqual([]);
    });

    it('should return all products if no filters', () => {
      spyOn(context.fetchedProducts, methodNameFetchedProducts)
        .and.returnValue([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' },
          { name: 'Great Ball', price: 600, category: 'Poké Balls' }
        ]);

      expect(context.products())
        .toEqual([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' },
          { name: 'Great Ball', price: 600, category: 'Poké Balls' }
        ]);
    });

    it('should return all products if empty categories', () => {
      spyOn(context.filtersContext, methodNameFilters)
        .and.returnValue({
          categories: []
        });

      spyOn(context.fetchedProducts, methodNameFetchedProducts)
        .and.returnValue([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' },
          { name: 'Great Ball', price: 600, category: 'Poké Balls' }
        ]);

      expect(context.products())
        .toEqual([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' },
          { name: 'Great Ball', price: 600, category: 'Poké Balls' }
        ]);
    });

    it('should return filtered products from target category', () => {
      spyOn(context.filtersContext, methodNameFilters)
        .and.returnValue({
          categories: ['Medicines']
        });

      spyOn(context.fetchedProducts, methodNameFetchedProducts)
        .and.returnValue([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' },
          { name: 'Great Ball', price: 600, category: 'Poké Balls' }
        ]);

      expect(context.products())
        .toEqual([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' }
        ]);
    });

    it('should return filtered products from multiple categories', () => {
      spyOn(context.filtersContext, methodNameFilters)
        .and.returnValue({
          categories: ['Medicines', 'Items']
        });

      spyOn(context.fetchedProducts, methodNameFetchedProducts)
        .and.returnValue([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' },
          { name: 'Great Ball', price: 600, category: 'Poké Balls' },
          { name: 'Escape Rope', price: 550, category: 'Items' }
        ]);

      expect(context.products())
        .toEqual([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' },
          { name: 'Escape Rope', price: 550, category: 'Items' }
        ]);
    })

    it('should return uncategorized product if target category is uncategorized', () => {
      spyOn(context.filtersContext, methodNameFilters)
        .and.returnValue({
          categories: ['Uncategorized']
        });

      spyOn(context.fetchedProducts, methodNameFetchedProducts)
        .and.returnValue([
          { name: 'Potion', price: 300, category: 'Medicines' },
          { name: 'Super Potion', price: 700, category: 'Medicines' },
          { name: 'Great Ball', price: 600, category: 'Poké Balls' },
          { name: 'Unknown Product', price: 1 }
        ]);

      expect(context.products())
        .toEqual([
          { name: 'Unknown Product', price: 1 }
        ]);
    });
  });

  it('should return filtered products from min price', () => {
    spyOn(context.filtersContext, methodNameFilters)
      .and.returnValue({
        price: {
          min: 500
        }
      });

    spyOn(context.fetchedProducts, methodNameFetchedProducts)
      .and.returnValue([
        { name: 'Potion', price: 300, category: 'Medicines' },
        { name: 'Super Potion', price: 700, category: 'Medicines' },
        { name: 'Great Ball', price: 600, category: 'Poké Balls' },
        { name: 'Unknown Product', price: 1 }
      ]);

    expect(context.products())
      .toEqual([
        { name: 'Super Potion', price: 700, category: 'Medicines' },
        { name: 'Great Ball', price: 600, category: 'Poké Balls' },
      ]);
  });

  it('should return filtered products from max price', () => {
    spyOn(context.filtersContext, methodNameFilters)
      .and.returnValue({
        price: {
          max: 500
        }
      });

    spyOn(context.fetchedProducts, methodNameFetchedProducts)
      .and.returnValue([
        { name: 'Potion', price: 300, category: 'Medicines' },
        { name: 'Super Potion', price: 700, category: 'Medicines' },
        { name: 'Great Ball', price: 600, category: 'Poké Balls' },
        { name: 'Unknown Product', price: 1 }
      ]);

    expect(context.products())
      .toEqual([
        { name: 'Potion', price: 300, category: 'Medicines' },
        { name: 'Unknown Product', price: 1 }
      ]);
  });

  it('should return filtered products from min and max prices', () => {
    spyOn(context.filtersContext, methodNameFilters)
      .and.returnValue({
        price: {
          min: 300,
          max: 500
        }
      });

    spyOn(context.fetchedProducts, methodNameFetchedProducts)
      .and.returnValue([
        { name: 'Potion', price: 300, category: 'Medicines' },
        { name: 'Super Potion', price: 700, category: 'Medicines' },
        { name: 'Great Ball', price: 600, category: 'Poké Balls' },
        { name: 'Unknown Product', price: 1 }
      ]);

    expect(context.products())
      .toEqual([
        { name: 'Potion', price: 300, category: 'Medicines' },
      ]);
  });
});