import type { InventoryItems } from "../data/products";
import BaseComponent from "./BaseComponent";
import InventoryItem from "./InventoryItem";

export default class InventoryList extends BaseComponent {
  async addItemToCart(itemName: InventoryItems) {
    const item = new InventoryItem(this.page, itemName);
    await item.addToCart();
  }
}
