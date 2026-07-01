# Negative Test Plan - Order Flow: Removed Items

## Prerequisites

- Standard user is logged in
- Standard user is on the Products/inventory page

## Dataset

- 3 Items:
  - Sauce Labs Backpack
  - Sauce Labs Bolt T-Shirt
  - Test.allTheThings() T-Shirt (Red)

## Steps

1. For each of the items, click the respective "Add to cart" button
2. Click on the shopping cart button
  - User should be redirected to the cart page
3. For each of the items on the cart list, click the respective "Remove" button
  - Cart list should be empty
4. Click on the "Checkout" button
  - User should NOT be redirected to `checkout-step-one` page
