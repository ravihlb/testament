import { Page } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export default class LoginForm extends BaseComponent {
  constructor(page: Page) {
    super(page);
    this.elements = {
      usernameInput: this.page.getByTestId("username"),
      passwordInput: this.page.getByTestId("password"),
      loginButton: this.page.getByTestId("login-button"),
    }
  }

  async login(username: string, password: string) {
    await this.elements.usernameInput!.fill(username);
    await this.elements.passwordInput!.fill(password);
    await this.elements.loginButton!.click();
  }
}
