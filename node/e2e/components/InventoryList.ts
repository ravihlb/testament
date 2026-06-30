import { Page } from "@playwright/test";
import BaseComponent from "./BaseComponent";
import InventoryItem from "./InventoryItem";
import { InventoryItems } from "../data/products";

export default class InventoryList extends BaseComponent {
  constructor(page: Page) {
    super(page);
  }

  async addItemToCart(itemName: InventoryItems) {
    const item = new InventoryItem(this.page, itemName);
    await item.addToCart();
  }
}
