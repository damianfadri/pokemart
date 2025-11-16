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
  name = computed<string>(() => this.routeParams()!['name']);

  product = resource({
    params: () => ({ name: this.name() }),
    loader: ({ params }) =>  this.productsService.getProduct(params.name)
  });

  productStr = computed(() => JSON.stringify(this.product.value()));
  productErr = computed(() => this.product.error());
}
