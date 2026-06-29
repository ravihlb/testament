import { Locator, Page } from "@playwright/test";
import Component from "./BaseComponent";

export default class InventoryItem extends Component {
  private root: Locator;
  itemName: string;

  constructor(page: Page, itemName: string) {
    super(page);
    this.itemName = itemName;
    this.root = this.page.getByTestId("inventory-item-description").filter({ hasText: itemName });

    this.elements = {
      name: this.root.getByTestId("inventory-item-name"),
      addToCartButton: this.root.getByTestId(/add-to-cart-.*/),
    }
  }

  async addToCart() {
    await this.elements.addToCartButton!.click();
  }
}
