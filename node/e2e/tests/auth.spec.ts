import test, { expect, type Locator } from "@playwright/test";
import LoginForm from "../components/LoginForm";
import SidebarMenu from "../components/SidebarMenu";
import { AcceptedUsernames, DEFAULT_PASSWORD } from "../data/credentials";

test.describe("Flow - Authentication", async () => {
  test("Login and Logout", async ({ page }) => {
    await page.goto("/");

    const loginForm = new LoginForm(page);
    const sidebarMenu = new SidebarMenu(page);

    await loginForm.login(AcceptedUsernames.StandardUser, DEFAULT_PASSWORD);

    await page.waitForURL("**/inventory.html");
    expect(page.url()).toContain("inventory.html");

    await sidebarMenu.openMenu();
    await sidebarMenu.clickLogout();

    await page.waitForURL("/");
    expect(loginForm.elements.loginButton as Locator).toBeVisible();
  });
});
