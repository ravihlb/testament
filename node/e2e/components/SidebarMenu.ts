import { Page } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export default class SidebarMenu extends BaseComponent {
  constructor(page: Page) {
    super(page);

    this.elements = {
      openMenuButton: this.page.getByRole("button", { name: "Open Menu" }),
      closeMenuButton: this.page.getByRole("button", { name: "Close Menu" }),
      logoutLink: this.page.getByTestId("logout-sidebar-link"),
    };
  }

  async openMenu() {
    await this.elements.openMenuButton!.click();
  }

  async clickLogout() {
    await this.elements.logoutLink!.click();
  }
}
