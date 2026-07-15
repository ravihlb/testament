import type { Locator, Page } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export type InventoryItemElements = {
  name: Locator;
  addToCartButton: Locator;
};

export default class InventoryItem extends BaseComponent<InventoryItemElements> {
  private root: Locator;
  itemName: string;

  constructor(page: Page, itemName: string) {
    super(page);
    this.itemName = itemName;
    this.root = this.page
      .getByTestId("inventory-item-description")
      .filter({ hasText: itemName });

    this.elements = {
      name: this.root.getByTestId("inventory-item-name"),
      addToCartButton: this.root.getByTestId(/add-to-cart-.*/),
    };
  }

  async addToCart() {
    await this.elements.addToCartButton.click();
  }
}
