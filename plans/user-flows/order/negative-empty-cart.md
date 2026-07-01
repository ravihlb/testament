# Negative Test Plan - Order Flow: Empty Cart

## Prerequisites

- Standard user is logged in
- Standard user is on the Products/inventory page

## Dataset

- N/A

## Steps

1. Click on the shopping cart button
  - User should be redirected to the cart page
2. Click on the checkout button
  - User should NOT be redirected to `checkout-step-one` page
