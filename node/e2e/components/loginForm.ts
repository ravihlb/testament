import { Locator, Page } from "@playwright/test";

export default class LoginForm {
  private page: Page;
  elements: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.elements = {
      usernameInput: this.page.locator('input#user-name'),
      passwordInput: this.page.locator('input#password'),
      loginButton: this.page.getByRole('button', { name: 'Login' }),
    }
  }

  async login(username: string, password: string) {
    await this.elements.usernameInput.fill(username);
    await this.elements.passwordInput.fill(password);
    await this.elements.loginButton.click();
  }
}
