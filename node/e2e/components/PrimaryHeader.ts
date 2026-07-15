import type { Locator, Page } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export type PrimaryHeaderElements = {
  shoppingCartLink: Locator;
  openMenuButton: Locator;
};

export default class PrimaryHeader extends BaseComponent<PrimaryHeaderElements> {
  constructor(page: Page) {
    super(page);

    this.elements = {
      shoppingCartLink: this.page.getByTestId("shopping-cart-link"),
      openMenuButton: this.page.getByRole("button", { name: "Open Menu" }),
    };
  }

  async goToCart() {
    await this.elements.shoppingCartLink.click();
  }

  async openMenu() {
    await this.elements.openMenuButton.click();
  }
}
