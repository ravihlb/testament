import { Page } from "@playwright/test";
import Component from "./BaseComponent";

export default class CartPage extends Component {
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
