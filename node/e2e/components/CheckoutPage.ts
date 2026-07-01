import { Page } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export type CheckoutFormFields = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export default class CheckoutPage extends BaseComponent {
  constructor(page: Page) {
    super(page);

    this.elements = {
      firstNameField: this.page.getByTestId("firstName"),
      lastNameField: this.page.getByTestId("lastName"),
      postalCodeField: this.page.getByTestId("postalCode"),
      continueBtn: this.page.getByTestId("continue"),
      finishBtn: this.page.getByTestId("finish"),
    };
  }

  async fillCheckoutForm({
    firstName,
    lastName,
    postalCode,
  }: CheckoutFormFields) {
    await this.elements.firstNameField!.fill(firstName);
    await this.elements.lastNameField!.fill(lastName);
    await this.elements.postalCodeField!.fill(postalCode);
    return this;
  }

  async clickContinueBtn() {
    await this.elements.continueBtn!.click();
    return this;
  }

  async clickFinishCheckoutBtn() {
    await this.elements.finishBtn!.click();
    return this;
  }
}
