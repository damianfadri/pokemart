import { Component, computed, inject, resource } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../products.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product',
  imports: [RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductComponent {
  productsService = inject(ProductsService);
  route = inject(ActivatedRoute);

  routeParams = toSignal(this.route.params);
  name = computed<string>(() => {
    const params = this.routeParams();
    if (params !== undefined) {
      return params['name'];
    }

    return '';
  });

  fetchedProduct = resource({
    params: () => ({ name: this.name() }),
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
