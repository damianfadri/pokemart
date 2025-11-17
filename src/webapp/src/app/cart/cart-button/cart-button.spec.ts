import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartButtonComponent } from './cart-button';
import { CartContext } from '../cart.context';

const methodNameAdd: keyof CartContext = 'add';
const methodNameProduct: keyof CartButtonComponent = 'product';

describe('CartButton', () => {
  let component: CartButtonComponent;
  let fixture: ComponentFixture<CartButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('addToCart()', () => {
    it('should call cartContext.add() with the correct product', () => {
      fixture.componentRef.setInput(
        methodNameProduct, {
          name: 'Potion',
          price: 300,
          category: 'Medicines'
        });

      spyOn(fixture.componentInstance.cartContext, methodNameAdd);

      fixture.componentInstance.addToCart();

      expect(fixture.componentInstance.cartContext.add)
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
