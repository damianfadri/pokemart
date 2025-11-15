import { Injectable } from '@angular/core';
import { Item } from "./item/item.model";

const defaultItems: Item[] = [
  {
    id: '11',
    name: 'Escape Rope',
    description: "The Escape Rope is an item available in all of the handheld Pokémon games to date. It can also be found lying around on the ground within the game, or held by Pokémon with the Ability Pickup. Escape Ropes are used, in places such as caves, to warp back to the last Pokémon Center player healed at (or home if player never healed in Pokémon Center) in Generation I, and the entrance from which the player entered since Generation II.",
    price: 550,
    category: 'Utility',
    resources: { uri: 'full/rope.png', spriteUri: 'sprite/rope.png' }
  },
  {
    id: '12',
    name: 'Repel',
    description: "Repels are items in the Pokémon series which keeps Wild Pokémon with a level lower than the Pokémon in the front of the party away. It must be used out of battle and the effect of a Repel wears off after walking a hundred steps.",
    price: 350,
    category: 'Utility',
    resources: { uri: 'full/repel.png', spriteUri: 'sprite/repel.png' }
  },
  {
    id: '13',
    name: 'Super Repel',
    description: "A Super Repel is an item in the Pokémon series which keeps Wild Pokémon with a level lower than the Pokémon in the front of the party away. A Super Repel effect wears out after walking for 200 steps.",
    price: 500,
    category: 'Utility',
    resources: { uri: 'full/srepel.png', spriteUri: 'sprite/srepel.png' }
  },
  {
    id: '14',
    name: 'Max Repel',
    description: "The Max Repel is an item that can be used to repel wild Pokémon weaker than the front Pokémon of the party away from the player for 250 steps. It must be used outside of battle.",
    price: 700,
    category: 'Utility',
    resources: { uri: 'full/mrepel.png', spriteUri: 'sprite/mrepel.png' }
  },
  {
    id: '15',
    name: 'Revive',
    description: "A revive is an item that revives your fainted Pokémon by half of its HP. It can be found while digging underground, by picking it up, or purchasing it from shops.",
    price: 1500,
    category: 'Potion',
    resources: { uri: 'full/revive.png', spriteUri: 'sprite/revive.png' }
  },
  {
    id: '16',
    name: 'Poké Ball',
    description: "The Poké Ball is the major Poké Ball in the Pokémon saga. It features a red top, white bottom, and a horizontal black ring circling the ball. This type of Poké Ball is the weakest and the only type typically available at the beginning of the Pokémon games.",
    price: 200,
    category: 'Poké Ball',
    resources: { uri: 'full/pball.png', spriteUri: 'sprite/pball.png' }
  },
  {
    id: '17',
    name: 'Great Ball',
    description: "The Great Ball is a type of Poké Ball that has a blue top and a white bottom, as well as the horizontal black ring and two red sections. It has a 50% higher chance to successfully catch a Pokémon than a regular Poké Ball.",
    price: 600,
    category: 'Poké Ball',
    resources: { uri: 'full/gball.png', spriteUri: 'sprite/gball.png' }
  },
  {
    id: '18',
    name: 'Ultra Ball',
    description: "The Ultra Ball has a 100% higher chance to catch a Pokémon than a regular Poké Ball, and a 33% higher chance than a Great Ball.",
    price: 1200,
    category: 'Poké Ball',
    resources: { uri: 'full/uball.png', spriteUri: 'sprite/uball.png' }
  },
  {
    id: '19',
    name: 'Master Ball',
    description: "The Master Ball is the best and rarest ball available in any game. It is guaranteed to capture any wild Pokémon without fail.",
    price: 999999,
    category: 'Poké Ball',
    resources: { uri: 'full/mball.png', spriteUri: 'sprite/mball.png' }
  },
  {
    id: '20',
    name: 'Potion',
    description: "A Potion is an item that heals 20 HP of a Pokémon. It has no effect on a fainted Pokémon.",
    price: 300,
    category: 'Potion',
    resources: { uri: 'full/potion.png', spriteUri: 'sprite/potion.png' }
  },
  {
    id: '21',
    name: 'Super Potion',
    description: "A Super Potion is an upgraded version of the Potion. It is an item that heals 50 HP of a Pokémon. It has no effect on a fainted Pokémon.",
    price: 700,
    category: 'Potion',
    resources: { uri: 'full/spotion.png', spriteUri: 'sprite/spotion.png' }
  },
  {
    id: '22',
    name: 'Hyper Potion',
    description: "A Hyper Potion is an upgraded version of the Super Potion. It is an item that heals a Pokémon by 200 HP. It has no effect on a fainted Pokémon.",
    price: 1200,
    category: 'Potion',
    resources: { uri: 'full/hpotion.png', spriteUri: 'sprite/hpotion.png' }
  },
  {
    id: '23',
    name: 'Max Potion',
    description: "The Max Potion is an item that fully restores the HP of a Pokémon. It has no effect on a fainted Pokémon.",
    price: 2500,
    category: 'Potion',
    resources: { uri: 'full/mpotion.png', spriteUri: 'sprite/mpotion.png' }
  },
  {
    id: '24',
    name: 'Full Restore',
    description: "The Full Restore is an item that restores all of the HP of a Pokémon while also healing persisting status ailments.",
    price: 3000,
    category: 'Potion',
    resources: { uri: 'full/fullrestore.png', spriteUri: 'sprite/fullrestore.png' }
  },
  {
    id: '25',
    name: 'Antidote',
    description: "Antidote is an item that heals a Pokémon with poison. It can be sold and is found at Poké Marts.",
    price: 100,
    category: 'Medicine',
    resources: { uri: 'full/antidote.png', spriteUri: 'sprite/antidote.png' }
  },
  {
    id: '26',
    name: 'Paralyze Heal',
    description: "Paralyze Heal is a medicine item that cures the Paralysis status ailment of a single Pokémon.",
    price: 200,
    category: 'Medicine',
    resources: { uri: 'full/paralyze.png', spriteUri: 'sprite/paralyze.png' }
  },
  {
    id: '27',
    name: 'Awakening',
    description: "Awakening is a status ailment healing item which awakens a sleeping Pokémon and can be used both during and outside battle.",
    price: 250,
    category: 'Medicine',
    resources: { uri: 'full/awakening.png', spriteUri: 'sprite/awakening.png' }
  },
  {
    id: '28',
    name: 'Burn Heal',
    description: "Burn Heal is an item that heals a burned Pokémon.",
    price: 250,
    category: 'Medicine',
    resources: { uri: 'full/burnheal.png', spriteUri: 'sprite/burnheal.png' }
  },
  {
    id: '29',
    name: 'Ice Heal',
    description: "Ice Heal is a spray-type medicine for freezing. It can be used to defrost a Pokémon that has been frozen solid.",
    price: 250,
    category: 'Medicine',
    resources: { uri: 'full/iceheal.png', spriteUri: 'sprite/iceheal.png' }
  },
  {
    id: '30',
    name: 'Full Heal',
    description: "Full Heal is a spray-type medicine that can be used to heal all the status conditions of a Pokémon.",
    price: 600,
    category: 'Medicine',
    resources: { uri: 'full/fullheal.png', spriteUri: 'sprite/fullheal.png' }
  }
];

@Injectable({ providedIn: 'root' })
export class ItemsService {
  getItems(): Promise<Item[]> {
    return Promise.resolve(defaultItems);
  }
}