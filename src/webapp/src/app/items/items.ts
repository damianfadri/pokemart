import { Component, computed, inject, resource } from '@angular/core';
import { ItemsService } from './items.service';
import { ItemComponent } from './item/item';
import { FiltersService } from '../filters/filters.service';

@Component({
  selector: 'app-items',
  imports: [ItemComponent],
  templateUrl: './items.html',
  styleUrl: './items.css',
})
export class ItemsComponent {
  itemsService = inject(ItemsService);

  items = computed(() => this.itemsService.items());
  count = computed(() => this.items().length);
}
