import test, { expect, type Locator } from "@playwright/test";
import CartPage from "../components/CartPage";
import CheckoutCompletePage from "../components/CheckoutCompletePage";
import CheckoutPage, {
	type CheckoutFormFields,
} from "../components/CheckoutPage";
import InventoryList from "../components/InventoryList";
import LoginForm from "../components/LoginForm";
import PrimaryHeader from "../components/PrimaryHeader";
import { AcceptedUsernames, DEFAULT_PASSWORD } from "../data/credentials";
import { InventoryItems } from "../data/products";

test.describe("Flow - Order", async () => {
	test.beforeEach("Setup", async ({ page }) => {
		const loginForm = new LoginForm(page);

		await page.goto("/");
		await loginForm.login(AcceptedUsernames.StandardUser, DEFAULT_PASSWORD);

		await page.waitForURL("**/inventory.html");
	});

	test("Order", async ({ page }) => {
		const inventoryList = new InventoryList(page);
		const primaryHeader = new PrimaryHeader(page);
		const cartPage = new CartPage(page);
		const checkoutPage = new CheckoutPage(page);
		const checkoutCompletePage = new CheckoutCompletePage(page);

		const itemsToAdd = [
			InventoryItems.SauceLabsBackpack,
			InventoryItems.SauceLabsFleeceJacket,
			InventoryItems.TestallTheThingsTShirtRed,
		];

		for (const item of itemsToAdd) {
			await inventoryList.addItemToCart(item);
		}

		await primaryHeader.goToCart();
		await cartPage.clickCheckoutBtn();

		const checkoutFormInfo: CheckoutFormFields = {
			firstName: "Ravi",
			lastName: "Test",
			postalCode: "12345",
		};

		await checkoutPage.fillCheckoutForm(checkoutFormInfo);
		await checkoutPage.clickContinueBtn();
		await checkoutPage.clickFinishCheckoutBtn();
		expect(
			checkoutCompletePage.elements.completeHeader as Locator,
		).toBeVisible();

		await checkoutCompletePage.clickBackHomeBtn();
		await page.waitForURL("**/inventory.html");
		expect(page.url()).toContain("inventory.html");
	});
});
