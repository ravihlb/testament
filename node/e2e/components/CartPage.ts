import type { Locator, Page } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export type CartPageElements = {
  checkoutBtn: Locator;
};

export default class CartPage extends BaseComponent<CartPageElements> {
  constructor(page: Page) {
    super(page);

    this.elements = {
      checkoutBtn: this.page.getByTestId("checkout"),
    };
  }

  async clickCheckoutBtn() {
    await this.elements.checkoutBtn.click();
  }
}
