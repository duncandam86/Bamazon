# Bamazon

## Github link: 
* *https://github.com/duncandam86/Bamazon*

## Overview Description
We created an Amazon-like storefront using MySQL. The app will take in orders from customers and deplete stock from the store's inventory as well as track product sales across your store's departments.

* Customer App `bamazonCustomer.js`
    1. This application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
        * For example: https://github.com/duncandam86/Bamazon/blob/master/customer_images/Listing%20of%20all%20products.png

    2. The app then prompt users with two messages.
        * The first should ask them the ID of the product they would like to buy.
        * The second message should ask how many units of the product they would like to buy.
        * For example: https://github.com/duncandam86/Bamazon/blob/master/customer_images/Prompt%20questions%20for%20buyers.png
        
    3. If there is enough inventory, a purchase order will be confirmed. New inventory of the product will be updated
        * For example: https://github.com/duncandam86/Bamazon/blob/master/customer_images/Enough%20inventory%20and%20update.png
    
    4. If there is not sufficient inventory, buyer will be alerted and new prompt will be populated
        * For example: https://github.com/duncandam86/Bamazon/blob/master/customer_images/Not%20enough%20inventory.png

* Manager App `bamazonManager.js`
    1. This application will prompt manager with 4 choices of actions that they can choose from. These are: 
        * View Products for Sale
        * View Low Inventory
        * Add to Inventory
        * Add New Product
        * For example: https://github.com/duncandam86/Bamazon/blob/master/manager_images/Prompt%20questions%20for%20manager.png

    2. If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.
        * For example: https://github.com/duncandam86/Bamazon/blob/master/manager_images/Show%20all%20products.png

    3. If a manager selects `View Low Inventory`, the app lists all items with an inventory count lower than 120.
        * For example: https://github.com/duncandam86/Bamazon/blob/master/manager_images/Low%20inventory%20products.png

    4. If a manager selects `Add to Inventory`, this app displays a prompt that will let the manager "add more" of any item currently in the store and update the new inventory once all inputs are enterted.
        * For example:
