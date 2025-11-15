import { Item } from "../../items/item/item.model";

export interface CartItem {
  item: Item,
  quantity: number;
}