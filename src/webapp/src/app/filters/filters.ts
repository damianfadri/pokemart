import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filters',
  imports: [RouterLink],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class FiltersComponent {
  route = inject(ActivatedRoute);

  queryParams = toSignal(this.route.queryParams);
    filter = computed(() => JSON.stringify(this.queryParams()));
}
