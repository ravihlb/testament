import type { Locator, Page } from "@playwright/test";

export default abstract class BaseComponent<
  TElements extends Record<string, Locator> = Record<string, never>,
> {
  protected page: Page;
  elements: TElements;

  constructor(page: Page) {
    this.page = page;
    this.elements = {} as TElements;
  }
}
