import { Page } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export default class PrimaryHeader extends BaseComponent {
  constructor(page: Page) {
    super(page);

    this.elements = {
      shoppingCartLink: this.page.getByTestId("shopping-cart-link"),
    };
  }

  async goToCart() {
    await this.elements.shoppingCartLink!.click();
  }
}
