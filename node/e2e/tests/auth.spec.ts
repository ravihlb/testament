import test, { expect } from "@playwright/test";
import LoginForm from "../components/LoginForm";
import PrimaryHeader from "../components/PrimaryHeader";
import SidebarMenu from "../components/SidebarMenu";
import { AcceptedUsernames, DEFAULT_PASSWORD } from "../data/credentials";

test.describe("Flow - Auth", async () => {
  test.beforeEach("Setup", async ({ page }) => {
    await page.goto("/");
  });

  test("Login & Logout", async ({ page }) => {
    const loginForm = new LoginForm(page);
    const primaryHeader = new PrimaryHeader(page);
    const sidebarMenu = new SidebarMenu(page);

    await loginForm.login(AcceptedUsernames.StandardUser, DEFAULT_PASSWORD);

    await page.waitForURL("**/inventory.html");
    expect(page.url()).toContain("inventory.html");

    await primaryHeader.openMenu();
    await sidebarMenu.clickLogout();

    await page.waitForURL("/");
    expect(loginForm.elements.loginButton).toBeVisible();
  });
});
