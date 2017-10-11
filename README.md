# Bamazon: A Customer Facing Application

This is an Command Line application built in node.js that mimics on online retailer like Amazon.com
Below you will find screenshots and explinations of the user experience. The application runs Javascript through node and uses an SQL database to feed data into the application.
The application requires the use of the NPM packages "mysql" and "inquirer".

## User Guide

* Starting the application simply requires the user to type in "node" and the application entry point "bamazonCustomer.js as seen below:

![App Start](/images/capture1.jpg)

* Upon running the application, the user will be presented with a list of available items to buy. The user will be presented with a prompt to enter the product ID number that they would like to purchase. There is validiation built into the inquirer prompt to only allow the user to select numbers of items that actually exist.

![Product List](/images/capture2.jpg)

* After picking a product ID, the user is asked what quantity of the item they would like to buy. There is validation on two fronts. The user is only allowed to enter integer values from 1-5000. Also, after they enter a value in that range, the application checks the amount of available inventory by pulling that information from the SQL database.

![Product List](/images/capture3.jpg)

* In the instance below, the user has selected 28 units of product ID number 6 (SNES Mini). The application has informed the user that there are not enough products in stock after checking the sql database. The user is then prompted to decrease their order to proceed.

![Product List](/images/capture4.jpg)

* After the user has selected a quantity value that is less than the inventory on hand, the application informs the user that their order has been removed from inventory and is on it's way. It also informs them of the price of their purchase.

![Product List](/images/capture5.jpg)