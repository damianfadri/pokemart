import { Component, computed, inject, resource } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../products.service';
import { CartButtonComponent } from '../../cart/cart-button/cart-button';

@Component({
  selector: 'app-product',
  imports: [RouterLink, CartButtonComponent],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductComponent {
  productsService = inject(ProductsService);
  route = inject(ActivatedRoute);

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
