import { Component, signal } from '@angular/core';
import { ItemComponent } from './item/item.component';
import { Item } from './item/item.model';
import { CartComponent } from './cart/cart.component';

const defaultItems: Item[] = [
  { id: '1', name: 'Potion', description: 'Restores 20 HP', price: 300, category: 'Potion' },
  { id: '2', name: 'Great Ball', description: 'Better than a Poké Ball', price: 600, category: 'Poké Ball' },
  { id: '3', name: 'Super Potion', description: 'Restores 50 HP', price: 700, category: 'Potion' },
  { id: '4', name: 'Ultra Ball', description: 'Even better than a Great Ball', price: 1200, category: 'Poké Ball' },
  { id: '5', name: 'Revive', description: 'Revives a fainted Pokémon', price: 1500, category: 'Potion' },
  { id: '6', name: 'Antidote', description: 'Cures poison', price: 100, category: 'Potion' },
  { id: '7', name: 'Burn Heal', description: 'Cures burn', price: 250, category: 'Potion' },
  { id: '8', name: 'Ice Heal', description: 'Cures freeze', price: 250, category: 'Potion' },
  { id: '9', name: 'Awakening', description: 'Cures sleep', price: 250, category: 'Potion' },
  { id: '10', name: 'Paralyze Heal', description: 'Cures paralysis', price: 250, category: 'Potion' },
];

@Component({
  selector: 'app-root',
  imports: [ItemComponent, CartComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  items = signal<Item[]>(defaultItems);
}
