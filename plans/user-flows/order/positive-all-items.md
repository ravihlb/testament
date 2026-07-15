# Positive Test Plan - Order Flow: All Items

## Prerequisites

- Standard user is logged in
- Standard user is on the Products/inventory page

## Dataset

- All Items:
  - Sauce Labs Backpack
  - Sauce Labs Bike Light
  - Sauce Labs Bolt T-Shirt
  - Sauce Labs Fleece Jacket
  - Sauce Labs Onesie
  - Test.allTheThings() T-Shirt (Red)

## Steps

1. For each of the items, click the respective "Add to cart" button
2. Click on the shopping cart button
  - User should be redirected to the cart page
3. Click on the checkout button
  - User should be redirected to `checkout-step-one` page
4. Fill in name and address info, then click on the "Continue" button
  - User should be redirected to `checkout-step-two` page
5. Click "Finish"
  - User should be redirected to the `checkout-complete` page with a success message
6. Click "Back Home" button
  - User is sent to the Products page
