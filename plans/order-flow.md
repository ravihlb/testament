# Test Plan - Order Flow

## Prerequisites

- Standard user is logged in
- Standard user is on the Products/inventory page

## Steps

1. Add to cart 3 Products from catalog:
  - Sauce Labs Backpack
  - Sauce Labs Fleece Jacket
  - Test.allTheThings() T-Shirt (Red)
2. Click on the shopping cart button
  - User should be redirected to the cart page
3. Click on the checkout button
  - User should be redirected to `checkout-step-one` page
4. Fill in name and address info, then click on the "Continue" button
  - User should be redirected to `checkout-step-two` page
5. Check that the checkout overview is correct (items, quantities, values)
6. Click "Finish"
  - User should be redirected to the `checkout-complete` page with a success message
7. Click "Back Home" button
  - User is sent to the Products page
