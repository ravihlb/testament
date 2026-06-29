import { Page } from "@playwright/test";
import Component from "./BaseComponent";

export default class CheckoutCompletePage extends Component {
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

