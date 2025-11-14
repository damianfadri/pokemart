import { Component, computed, inject, resource } from '@angular/core';
import { ItemsService } from './items.service';
import { ItemComponent } from './item/item.component';
import { CartItem } from '../cart/cart.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-items',
  imports: [ItemComponent],
  templateUrl: './items.html',
  styleUrl: './items.css',
})
export class ItemsComponent {
  itemsService = inject(ItemsService);
  cartService = inject(CartService);
  
  items = resource({
    loader: () => this.itemsService.getItems()
  });

  count = computed(() => {
    if (this.items.hasValue()) {
      return this.items.value().length;
    }

    return 0;
  });

  onAddToCart(item: CartItem) {
    this.cartService.addItem(item);
  }
}
