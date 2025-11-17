import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card';
import { CartContext } from '../../cart/cart.context';
import { provideRouter } from '@angular/router';

const methodNameProduct: keyof ProductCardComponent = 'product';

describe('ProductCard', () => {
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [CartContext, provideRouter([])]
    });
    
    fixture = TestBed.createComponent(ProductCardComponent);
  });

  describe('product()', () => {
    it('should return product', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300,
          category: 'Medicines'
        });

      expect(fixture.componentInstance.product())
        .toEqual({
          name: 'Potion',
          price: 300,
          category: 'Medicines'
        });
    });

    it('should render product', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
        name: 'Potion',
        price: 300,
        category: 'Medicines'
      });

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=item-name]')?.textContent)
        .toContain('Potion');
      expect(compiled.querySelector('[data-testid=item-price]')?.textContent)
        .toContain('300');
      expect(compiled.querySelector('[data-testid=item-category]')?.textContent)
        .toContain('Medicines');
    });
  });
});