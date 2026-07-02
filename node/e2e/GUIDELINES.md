# E2E Test Guidelines

Derived from `tests/order.spec.ts` and its supporting page objects, data modules, and Playwright config.

## File layout

```
e2e/
├── components/     # Page Object Model classes
├── data/           # Shared test data (credentials, products)
├── tests/          # Spec files (*.spec.ts)
└── GUIDELINES.md
```

- Spec files live in `tests/` and use the `*.spec.ts` suffix.
- Page objects live in `components/` and extend `BaseComponent<TElements>`.
  - Each POM exports a separate `*Elements` type (e.g. `LoginFormElements`) and passes it as the type argument so `elements` keys autocomplete as `Locator`.
- Reusable values (usernames, product names) live in `data/`.

## Imports

Order imports in three groups:

1. **Playwright** — default `test`, named `expect`, and Playwright types as needed:

   ```ts
   import test, { expect, type Locator } from "@playwright/test";
   ```

2. **Page objects** — default imports from `../components/`:

   ```ts
   import CartPage from "../components/CartPage";
   import CheckoutPage, { type CheckoutFormFields } from "../components/CheckoutPage";
   ```

   Import component-defined types (e.g. `CheckoutFormFields`) alongside the default export when form or payload shapes are needed in the test.

3. **Test data** — named imports from `../data/`:

   ```ts
   import { AcceptedUsernames, DEFAULT_PASSWORD } from "../data/credentials";
   import { InventoryItems } from "../data/products";
   ```

## Describe / setup / test structure

```ts
test.describe("Flow - Order", async () => {
  test.beforeEach("Setup", async ({ page }) => {
    // shared preconditions
  });

  test("Order", async ({ page }) => {
    // test body
  });
});
```

| Convention | Example |
|---|---|
| Describe block name | `"Flow - {Feature}"` (e.g. `"Flow - Order"`) |
| beforeEach label | `"Setup"` |
| Test name | Short, feature-oriented (e.g. `"Order"`) |

### beforeEach — authentication setup

When a flow requires a logged-in user, centralize login in `beforeEach`:

```ts
test.beforeEach("Setup", async ({ page }) => {
  const loginForm = new LoginForm(page);

  await page.goto("/");
  await loginForm.login(AcceptedUsernames.StandardUser, DEFAULT_PASSWORD);

  await page.waitForURL("**/inventory.html");
});
```

- Use relative paths (`"/"`) — `baseURL` is set in `playwright.config.ts`.
- Use `AcceptedUsernames` enum values and `DEFAULT_PASSWORD` from `data/credentials`.
- Confirm navigation with `page.waitForURL("**/…")` glob patterns.

## Test body patterns

### Instantiate page objects at the top

Create one instance per component used in the flow before any actions:

```ts
const inventoryList = new InventoryList(page);
const primaryHeader = new PrimaryHeader(page);
const cartPage = new CartPage(page);
const checkoutPage = new CheckoutPage(page);
const checkoutCompletePage = new CheckoutCompletePage(page);
```

### Drive the flow through component methods

Tests orchestrate user flows by calling page-object methods — not raw locators or `page.getBy*` calls:

```ts
await inventoryList.addItemToCart(item);
await primaryHeader.goToCart();
await cartPage.clickCheckoutBtn();
await checkoutPage.fillCheckoutForm(checkoutFormInfo);
await checkoutPage.clickContinueBtn();
await checkoutPage.clickFinishCheckoutBtn();
```

### Use typed, centralized test data

- Product selections: `InventoryItems` enum from `data/products`.
- Form payloads: component-exported types (e.g. `CheckoutFormFields`).

```ts
const itemsToAdd = [
  InventoryItems.SauceLabsBackpack,
  InventoryItems.SauceLabsFleeceJacket,
  InventoryItems.TestallTheThingsTShirtRed,
];

const checkoutFormInfo: CheckoutFormFields = {
  firstName: "Ravi",
  lastName: "Test",
  postalCode: "12345",
};
```

### Repeat actions with `for…of`

When the same action applies to multiple items, iterate over a typed array:

```ts
for (const item of itemsToAdd) {
  await inventoryList.addItemToCart(item);
}
```

## Assertions

### Element visibility via page object elements

Assert on locators exposed through the component's typed `elements` map:

```ts
expect(checkoutCompletePage.elements.completeHeader).toBeVisible();
```

### Navigation

Combine `waitForURL` with optional URL content checks:

```ts
await page.waitForURL("**/inventory.html");
expect(page.url()).toContain("inventory.html");
```

- Prefer glob patterns (`**/inventory.html`) in `waitForURL`.
- Use `toContain` for lightweight post-navigation verification.

## Formatting

Project-wide rules come from [`.editorconfig`](../../.editorconfig) and [`biome.json`](../biome.json) in the `node/` package:

| Setting | Value |
|---|---|
| Indentation | 2 spaces (`indent_style = space`, `indent_size = 2`) |
| Line endings | LF |
| Final newline | Required |
| Quotes | Double |
| Trailing commas | All (multi-line structures) |
| Semicolons | Always |

Biome reads `.editorconfig` via `formatter.useEditorconfig` and applies the JavaScript formatter options above. Run from `node/`:

```bash
pnpm exec biome check --write .
pnpm exec biome format --write .
```

Observed in spec files:

- Blank line between logical sections (setup data, actions, assertions).
- Match the indentation and quote style of existing components in `components/`.

## Relationship to test plans

User-flow plans under `plans/user-flows/` describe prerequisites, datasets, and step-by-step actions. Spec files should mirror those steps: same item sets, same navigation sequence, same success criteria.

## Checklist for new specs

- [ ] File placed in `tests/` with `.spec.ts` suffix.
- [ ] `test.describe("Flow - …")` wrapper with descriptive name.
- [ ] Shared login/navigation in `test.beforeEach("Setup", …)` when applicable.
- [ ] Page objects instantiated at the start of each test.
- [ ] No raw locators in the spec — delegate to components.
- [ ] Test data from `data/` enums/constants or component types.
- [ ] Navigation confirmed with `waitForURL`; outcomes checked with `expect`.
- [ ] Flow steps align with the corresponding plan in `plans/user-flows/`.
- [ ] File formatted with Biome (`pnpm exec biome check --write .` from `node/`).
