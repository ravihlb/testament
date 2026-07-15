# Positive Test Plan - Order Flow: Add Items From Details Page 

## Prerequisites

- Standard user is logged in
- Standard user is on the Products/inventory page

## Dataset

- 3 Items:
  - Sauce Labs Backpack
  - Sauce Labs Onesie
  - Sauce Labs Bike Light

## Steps

1. For each of the 3 items:
  a. click on the item title
  b. click on the "Add to cart" button
  c. click on the "Back to products" button
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
