import { Page } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export default class CheckoutCompletePage extends BaseComponent {
  constructor(page: Page) {
    super(page);

    this.elements = {
      completeHeader: this.page.getByTestId("complete-header"),
      backHomeBtn: this.page.getByTestId("back-to-products"),
    }
  }

  async clickBackHomeBtn() {
    await this.elements.backHomeBtn!.click();
  }
}

