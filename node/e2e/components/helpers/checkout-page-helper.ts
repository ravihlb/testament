import { expect, type Page } from "@playwright/test";
import {
  calculateOrderTotals,
  InventoryItemPrices,
  type InventoryItems,
} from "../../data/products";

export async function verifyCheckoutOverview(
  page: Page,
  items: InventoryItems[],
) {
  for (const item of items) {
    const cartItem = page.locator(".cart_item").filter({ hasText: item });

    await expect(cartItem.getByTestId("inventory-item-name")).toHaveText(item);
    await expect(cartItem.getByTestId("item-quantity")).toHaveText("1");
    await expect(cartItem.getByTestId("inventory-item-price")).toHaveText(
      InventoryItemPrices[item],
    );
  }

  const { subtotal, tax, total } = calculateOrderTotals(items);

  await expect(page.getByTestId("subtotal-label")).toHaveText(
    `Item total: ${subtotal}`,
  );
  await expect(page.getByTestId("tax-label")).toHaveText(`Tax: ${tax}`);
  await expect(page.getByTestId("total-label")).toHaveText(`Total: ${total}`);
}
