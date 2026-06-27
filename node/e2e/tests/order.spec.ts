import test, { Page } from "@playwright/test";
import { DEFAULT_PASSWORD, AcceptedUsernames } from "../../data/credentials";
import LoginForm from "../../components/loginForm";

test.describe('Flow - Order', async () => {
  let loginForm: LoginForm;

  test.beforeEach('Setup', async ({ page }) => {
    // - Standard user is logged in
    loginForm = new LoginForm(page);
    await page.goto('/');
    await loginForm.login(AcceptedUsernames.StandardUser, DEFAULT_PASSWORD);

    // - Standard user is on the Products/inventory page
    await page.waitForURL('**/inventory.html')
  });

  test('Order', async () => {
    // add products to cart
    // go to cart
    // go to checkout
    // checkout step 1 - delivery info
    // checkout step 2 - confirm details
    // finish -> checkout done page
    // go back to inventory page
  });
});
