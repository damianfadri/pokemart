import { Component, computed, inject } from '@angular/core';
import { CartContext } from '../cart/cart.context';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class CheckoutComponent {
  cartContext = inject(CartContext);

  cart = computed(() => this.cartContext.list());
  cartEmpty = computed(() => this.cart().length === 0);
}
