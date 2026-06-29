import { Locator, Page } from "@playwright/test";

export default abstract class Component {
  protected page: Page;
  elements: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.elements = {};
  }
}
