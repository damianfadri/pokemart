import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item';
import { CartService } from '../../cart/cart.service';

describe('Item', () => {
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ItemComponent],
      providers: [CartService]
    });
    
    fixture = TestBed.createComponent(ItemComponent);
  });

  describe('item should', () => {
    it('be initialized', () => {
      fixture.componentRef.setInput('item', {
        name: 'Potion',
        price: 300,
        category: 'Medicines'
      });

      expect(fixture.componentInstance.item())
        .toEqual({
          name: 'Potion',
          price: 300,
          category: 'Medicines'
        });
    });

    it('render item', () => {
      fixture.componentRef.setInput('item', {
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

  describe('addToCart should', () => {
    it('call cartService.addItem with the correct item', () => {
      fixture.componentRef.setInput('item', {
        name: 'Potion',
        price: 300,
        category: 'Medicines'
      });

      spyOn(fixture.componentInstance.cartService, 'addItem');

      fixture.componentInstance.addToCart();

      expect(fixture.componentInstance.cartService.addItem)
        .toHaveBeenCalledWith({ 
          item: {
            name: 'Potion',
            price: 300,
            category: 'Medicines'
          },
          quantity: 1, 
        });
    });
  });
});