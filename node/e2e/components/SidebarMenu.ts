import type { Locator, Page } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export type SidebarMenuElements = {
  logoutLink: Locator;
};

export default class SidebarMenu extends BaseComponent<SidebarMenuElements> {
  constructor(page: Page) {
    super(page);

    this.elements = {
      logoutLink: this.page.getByTestId("logout-sidebar-link"),
    };
  }

  async clickLogout() {
    await this.elements.logoutLink.click();
  }
}
