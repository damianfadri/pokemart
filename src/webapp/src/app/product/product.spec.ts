import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product';
import { ResourceRef } from '@angular/core';
import { Product, ProductDetails } from './product.model';
import { provideRouter } from '@angular/router';
import { ProductsComponent } from '../products/products';
import { RouterTestingHarness } from '@angular/router/testing';
import { ProductsService } from '../products/products.service';

const methodNameFetchedProduct: keyof ResourceRef<ProductDetails | undefined> = 'value';
const methodNameProduct: keyof ProductsService = 'getProduct';

describe('Product', () => {
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent],
      providers: [provideRouter([
        { path: 'product', component: ProductsComponent },
        { path: 'product/:name', component: ProductComponent }
      ])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('product()', () => {
    it('should return product', () => {
      spyOn(fixture.componentInstance.fetchedProduct, methodNameFetchedProduct)
        .and.returnValue({
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          description: 'Heals 20 HP',
          rarity: 'Common',
          stock: 10,
          resources: {
            uri: 'https://sample.com/potion.png',
            spriteUri: 'https://sample.com/potion-sprite.png'
          }
        });

      expect(fixture.componentInstance.product())
        .toEqual({
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          description: 'Heals 20 HP',
          rarity: 'Common',
          stock: 10,
          resources: {
            uri: 'https://sample.com/potion.png',
            spriteUri: 'https://sample.com/potion-sprite.png'
          }
        });
    });

    it('should render product', () => {
      spyOn(fixture.componentInstance.fetchedProduct, methodNameFetchedProduct)
        .and.returnValue({
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          description: 'Heals 20 HP',
          rarity: 'Common',
          stock: 10,
          resources: {
            uri: 'https://sample.com/potion.png',
            spriteUri: 'https://sample.com/potion-sprite.png'
          }
        });

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=product-name]')?.textContent)
        .toContain('Potion');

      expect(compiled.querySelector('[data-testid=product-price]')?.textContent)
        .toContain('300');

      expect(compiled.querySelector('[data-testid=product-category]')?.textContent)
        .toContain('Medicines');

      expect(compiled.querySelector('[data-testid=product-description]')?.textContent)
        .toContain('Heals 20 HP');

      expect(compiled.querySelector('[data-testid=product-rarity]')?.textContent)
        .toContain('Common');

      expect(compiled.querySelector('[data-testid=product-stock]')?.textContent)
        .toContain('10');
    });

    it('should render breadcrumbs', () => {
      spyOn(fixture.componentInstance.fetchedProduct, methodNameFetchedProduct)
        .and.returnValue({
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          description: 'Heals 20 HP',
          rarity: 'Common',
          stock: 10,
          resources: {
            uri: 'https://sample.com/potion.png',
            spriteUri: 'https://sample.com/potion-sprite.png'
          }
        });  
    
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=breadcrumb-product]')?.textContent)
        .toContain('Potion');
    });

    it('should render in stock', () => {
      spyOn(fixture.componentInstance.fetchedProduct, methodNameFetchedProduct)
        .and.returnValue({
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          description: 'Heals 20 HP',
          rarity: 'Common',
          stock: 10,
          resources: {
            uri: 'https://sample.com/potion.png',
            spriteUri: 'https://sample.com/potion-sprite.png'
          }
        });  
    
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=product-in-stock]')?.textContent)
        .toContain('In stock');
    });

    it('should render out of stock', () => {
      spyOn(fixture.componentInstance.fetchedProduct, methodNameFetchedProduct)
        .and.returnValue({
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          description: 'Heals 20 HP',
          rarity: 'Common',
          stock: 0,
          resources: {
            uri: 'https://sample.com/potion.png',
            spriteUri: 'https://sample.com/potion-sprite.png'
          }
        });  
    
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=product-out-of-stock]')?.textContent)
        .toContain('Out of stock');
    });

    it('should set img src', () => {
      spyOn(fixture.componentInstance.fetchedProduct, methodNameFetchedProduct)
        .and.returnValue({
          name: 'Potion',
          price: 300,
          category: 'Medicines',
          description: 'Heals 20 HP',
          rarity: 'Common',
          stock: 0,
          resources: {
            uri: 'https://sample.com/potion.png',
            spriteUri: 'https://sample.com/potion-sprite.png'
          }
        });

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=product-image]')?.getAttribute('src'))
        .toContain('https://sample.com/potion.png');
    })
  });
});
