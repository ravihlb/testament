import type { Page } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export default class InventoryItemDetailsPage extends BaseComponent {
  constructor(page: Page) {
    super(page);

    this.elements = {
      addToCartButton: this.page.getByTestId("add-to-cart"),
      backToProductsButton: this.page.getByTestId("back-to-products"),
    };
  }

  async addToCart() {
    await this.elements.addToCartButton!.click();
  }

  async backToProducts() {
    await this.elements.backToProductsButton!.click();
  }
}
