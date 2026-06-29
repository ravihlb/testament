import { Page } from "@playwright/test";
import Component from "./BaseComponent";

export default class PrimaryHeader extends Component {
  constructor(page: Page) {
    super(page);

    this.elements = {
      shoppingCartLink: this.page.getByTestId("shopping-cart-link"),
    }
  }

  async goToCart() {
    await this.elements.shoppingCartLink!.click();
  }
}
