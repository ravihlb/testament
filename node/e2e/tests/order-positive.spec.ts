import test, { expect, type Locator } from "@playwright/test";
import CartPage from "../components/CartPage";
import CheckoutCompletePage from "../components/CheckoutCompletePage";
import CheckoutPage, {
  type CheckoutFormFields,
} from "../components/CheckoutPage";
import InventoryItem from "../components/InventoryItem";
import InventoryItemDetailsPage from "../components/InventoryItemDetailsPage";
import InventoryList from "../components/InventoryList";
import LoginForm from "../components/LoginForm";
import PrimaryHeader from "../components/PrimaryHeader";
import { AcceptedUsernames, DEFAULT_PASSWORD } from "../data/credentials";
import { InventoryItems } from "../data/products";

test.describe("Order Flow - Positive Tests", async () => {
  let inventoryList: InventoryList;
  let primaryHeader: PrimaryHeader;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let checkoutCompletePage: CheckoutCompletePage;

  const checkoutFormInfo: CheckoutFormFields = {
    firstName: "Example",
    lastName: "Test",
    postalCode: "12345",
  };

  test.beforeEach("Setup", async ({ page }) => {
    const loginForm = new LoginForm(page);

    await page.goto("/");
    await loginForm.login(AcceptedUsernames.StandardUser, DEFAULT_PASSWORD);

    await page.waitForURL("**/inventory.html");

    inventoryList = new InventoryList(page);
    primaryHeader = new PrimaryHeader(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
  });

  test("Buy 3 Items", async ({ page }) => {
    const itemsToAdd = [
      InventoryItems.SauceLabsBackpack,
      InventoryItems.SauceLabsFleeceJacket,
      InventoryItems.TestallTheThingsTShirtRed,
    ];

    for (const item of itemsToAdd) {
      await inventoryList.addItemToCart(item);
    }

    await primaryHeader.goToCart();
    await page.waitForURL("**/cart.html");
    await cartPage.clickCheckoutBtn();
    await page.waitForURL("**/checkout-step-one.html");

    await checkoutPage.fillCheckoutForm(checkoutFormInfo);
    await checkoutPage.clickContinueBtn();
    await page.waitForURL("**/checkout-step-two.html");

    await checkoutPage.clickFinishCheckoutBtn();
    await page.waitForURL("**/checkout-complete.html");
    expect(
      checkoutCompletePage.elements.completeHeader as Locator,
    ).toBeVisible();

    await checkoutCompletePage.clickBackHomeBtn();
    await page.waitForURL("**/inventory.html");
    expect(page.url()).toContain("inventory.html");
  });

  test("Buy All Items", async ({ page }) => {
    const itemsToAdd = Object.values(InventoryItems);

    for (const item of itemsToAdd) {
      await inventoryList.addItemToCart(item);
    }

    await primaryHeader.goToCart();
    await page.waitForURL("**/cart.html");
    await cartPage.clickCheckoutBtn();
    await page.waitForURL("**/checkout-step-one.html");

    await checkoutPage.fillCheckoutForm(checkoutFormInfo);
    await checkoutPage.clickContinueBtn();
    await page.waitForURL("**/checkout-step-two.html");

    await checkoutPage.clickFinishCheckoutBtn();
    await page.waitForURL("**/checkout-complete.html");
    expect(
      checkoutCompletePage.elements.completeHeader as Locator,
    ).toBeVisible();

    await checkoutCompletePage.clickBackHomeBtn();
    await page.waitForURL("**/inventory.html");
    expect(page.url()).toContain("inventory.html");
  });

  test("Buy 3 Items Added From Details Page", async ({ page }) => {
    const inventoryItemDetailsPage = new InventoryItemDetailsPage(page);

    const itemsToAdd = [
      InventoryItems.SauceLabsBackpack,
      InventoryItems.SauceLabsOnesie,
      InventoryItems.SauceLabsBikeLight,
    ];

    for (const item of itemsToAdd) {
      const inventoryItem = new InventoryItem(page, item);

      await inventoryItem.openDetails();
      await page.waitForURL("**/inventory-item.html**");

      await inventoryItemDetailsPage.addToCart();
      await inventoryItemDetailsPage.backToProducts();
      await page.waitForURL("**/inventory.html");
    }

    await primaryHeader.goToCart();
    await page.waitForURL("**/cart.html");

    await cartPage.clickCheckoutBtn();
    await page.waitForURL("**/checkout-step-one.html");

    await checkoutPage.fillCheckoutForm(checkoutFormInfo);
    await checkoutPage.clickContinueBtn();
    await page.waitForURL("**/checkout-step-two.html");

    await checkoutPage.clickFinishCheckoutBtn();
    await page.waitForURL("**/checkout-complete.html");
    expect(
      checkoutCompletePage.elements.completeHeader as Locator,
    ).toBeVisible();

    await checkoutCompletePage.clickBackHomeBtn();
    await page.waitForURL("**/inventory.html");
    expect(page.url()).toContain("inventory.html");
  });
});
