import { Page } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export default class CartPage extends BaseComponent {
  constructor(page: Page) {
    super(page);

    this.elements = {
      checkoutBtn: this.page.getByTestId("checkout"),
    }
  }

  async clickCheckoutBtn() {
    await this.elements.checkoutBtn!.click();
  }
}
