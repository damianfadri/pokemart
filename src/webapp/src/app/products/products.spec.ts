import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products';
import { ProductsService } from './products.service';
import { FiltersService } from '../filters/filters.service';
import { ResourceRef } from '@angular/core';
import { Product } from './product-card/product.model';

const methodNameProducts: keyof ProductsService = 'products';
const methodNameValue: keyof ResourceRef<Product[] | undefined> = 'value';
const methodNameFilters: keyof FiltersService = 'filters';

describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [ProductsService, FiltersService],
    });

    fixture = TestBed.createComponent(ProductsComponent);
  });

  describe('products()', () => {
    it('should return all products', () => {
      spyOn(fixture.componentInstance.productsService, methodNameProducts)
        .and.returnValue([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ]);

      expect(fixture.componentInstance.products())
        .toEqual([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ]);
    });

    it('should return 0 products if there are no products', () => {
      spyOn(fixture.componentInstance.productsService, methodNameProducts)
        .and.returnValue([]);

      expect(fixture.componentInstance.products())
        .toEqual([]);
    });

    it('should render all products', () => {
      spyOn(fixture.componentInstance.productsService, methodNameProducts)
        .and.returnValue([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
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
      spyOn(fixture.componentInstance.productsService, methodNameProducts)
        .and.returnValue([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ]);

      expect(fixture.componentInstance.count())
        .toBe(3);
    });

    it('should return 0 if there are no products', () => {
      spyOn(fixture.componentInstance.productsService, methodNameProducts)
        .and.returnValue([]);

      expect(fixture.componentInstance.count())
        .toBe(0);
    });
  });
});

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService, FiltersService]
    });

    service = TestBed.inject(ProductsService);
  });

  describe('categories()', () => {
    it('should return unique categories', () => {
      spyOn(service.warehouse, methodNameValue)
        .and.returnValue([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ]);

      expect(service.categories())
        .toEqual(
          new Set<string>([ 'Medicines', 'Poké Balls' ])
        );
    });

    it('should add uncategorized if a product has no category', () => {
      spyOn(service.warehouse, methodNameValue)
        .and.returnValue([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' },
          { name: 'Unknown Product', price: 1, description: 'An unknown product' }
        ]);

      expect(service.categories())
        .toEqual(
          new Set<string>([ 'Medicines', 'Poké Balls', 'Uncategorized' ])
        );
    });

    it('should add uncategorized if no products', () => {
      spyOn(service.warehouse, methodNameValue)
        .and.returnValue([]);

      expect(service.categories())
        .toEqual(
          new Set<string>([ 'Uncategorized' ])
        );
    });
  });

  describe('products()', () => {
    it('should return 0 products if warehouse is empty', () => {
      spyOn(service.warehouse, methodNameValue)
        .and.returnValue([]);

      expect(service.products()).toEqual([]);
    });

    it('should return all products if no filters', () => {
      spyOn(service.warehouse, methodNameValue)
        .and.returnValue([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ]);

      expect(service.products())
        .toEqual([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ]);
    });

    it('should return filtered products from target category', () => {
      spyOn(service.filtersService, methodNameFilters)
        .and.returnValue({
          categories: ['Medicines']
        });

      spyOn(service.warehouse, methodNameValue)
        .and.returnValue([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' }
        ]);

      expect(service.products())
        .toEqual([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' }
        ]);
    });

    it('should return filtered products from multiple categories', () => {
      spyOn(service.filtersService, methodNameFilters)
        .and.returnValue({
          categories: ['Medicines', 'Items']
        });

      spyOn(service.warehouse, methodNameValue)
        .and.returnValue([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' },
          { name: 'Escape Rope', price: 550, description: 'Escapes the room', category: 'Items' }
        ]);

      expect(service.products())
        .toEqual([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Escape Rope', price: 550, description: 'Escapes the room', category: 'Items' }
        ]);
    })

    it('should return uncategorized product if target category is uncategorized', () => {
      spyOn(service.filtersService, methodNameFilters)
        .and.returnValue({
          categories: ['Uncategorized']
        });

      spyOn(service.warehouse, methodNameValue)
        .and.returnValue([
          { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
          { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
          { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' },
          { name: 'Unknown Product', price: 1, description: 'An unknown product' }
        ]);

      expect(service.products())
        .toEqual([
          { name: 'Unknown Product', price: 1, description: 'An unknown product' }
        ]);
    });
  });

  it('should return filtered products from min price', () => {
    spyOn(service.filtersService, methodNameFilters)
      .and.returnValue({
        price: {
          min: 500
        }
      });

    spyOn(service.warehouse, methodNameValue)
      .and.returnValue([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' },
        { name: 'Unknown Product', price: 1, description: 'An unknown product' }
      ]);

    expect(service.products())
      .toEqual([
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' },
      ]);
  });

  it('should return filtered products from max price', () => {
    spyOn(service.filtersService, methodNameFilters)
      .and.returnValue({
        price: {
          max: 500
        }
      });

    spyOn(service.warehouse, methodNameValue)
      .and.returnValue([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' },
        { name: 'Unknown Product', price: 1, description: 'An unknown product' }
      ]);

    expect(service.products())
      .toEqual([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Unknown Product', price: 1, description: 'An unknown product' }
      ]);
  });

  it('should return filtered products from min and max prices', () => {
    spyOn(service.filtersService, methodNameFilters)
      .and.returnValue({
        price: {
          min: 300,
          max: 500
        }
      });

    spyOn(service.warehouse, methodNameValue)
      .and.returnValue([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
        { name: 'Super Potion', price: 700, description: 'Heals 50 HP', category: 'Medicines' },
        { name: 'Great Ball', price: 600, description: 'Increased catch rate', category: 'Poké Balls' },
        { name: 'Unknown Product', price: 1, description: 'An unknown product' }
      ]);

    expect(service.products())
      .toEqual([
        { name: 'Potion', price: 300, description: 'Heals 20 HP', category: 'Medicines' },
      ]);
  });
});