import { Component, computed, inject, resource } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { CartButtonComponent } from '../cart/cart-button/cart-button';
import { CartComponent } from '../cart/cart';
import { CartContext } from '../cart/cart.context';

@Component({
  selector: 'app-product',
  imports: [RouterLink, CartComponent, CartButtonComponent],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductComponent {
  productsService = inject(ProductsService);
  route = inject(ActivatedRoute);
  cartContext = inject(CartContext);

  noItemsInCart = computed(() => {
    return this.cartContext.list().length === 0
  });

  name = this.route.snapshot.paramMap.get('name') ?? '';

  fetchedProduct = resource({
    params: () => ({ name: this.name }),
    loader: ({ params }) =>  this.productsService.getProduct(params.name)
  });

  product = computed(() => {
    if (this.fetchedProduct.hasValue()) {
      return this.fetchedProduct.value();
    }

    return {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
      rarity: '',
      resources: { uri: '', spriteUri: '' }
    }
  });
}
