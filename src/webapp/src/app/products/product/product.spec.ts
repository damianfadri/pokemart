import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product';
import { CartService } from '../../cart/cart.service';

const methodNameProduct: keyof ProductComponent = 'product';
const methodNameAdd: keyof CartService = 'add';

describe('Product', () => {
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductComponent],
      providers: [CartService]
    });
    
    fixture = TestBed.createComponent(ProductComponent);
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

  describe('addToCart()', () => {
    it('should call cartService.add() with the correct product', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300,
          category: 'Medicines'
        });

      spyOn(fixture.componentInstance.cartService, methodNameAdd);

      fixture.componentInstance.addToCart();

      expect(fixture.componentInstance.cartService.add)
        .toHaveBeenCalledWith({ 
          product: {
            name: 'Potion',
            price: 300,
            category: 'Medicines'
          },
          quantity: 1, 
        });
    });
  });
});