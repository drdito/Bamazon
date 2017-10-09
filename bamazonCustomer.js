//Required NPM packages for application
var mysql = require("mysql");
var inquirer = require('inquirer');

//Initializing connection to SQL database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'secret',
  port : 3306,
  database : 'bamazon'
});


//function that will simply list out the available products for sale
function displayProducts() {
  connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | "  + "Price: $" + res[i].price);
      console.log("--------------------------------------------------------------------");
    }
  });
  itemID();
}

//Function to acertain what product the user wants to buy
function itemID() {
  connection.query("SELECT item_id FROM products", function(err, res){
    if (err) throw err;
    //inquirer functions to ask what product ID that the user wants.
    inquirer.prompt([
      {
        type: "input",
        message: "Please enter the item ID number that you would like to purchase: ",
        name: "id",
        validate: function(value) {
          if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(result){
      var userChoice;
      userChoice = result.id;
      quantity(userChoice);
    });
  });
}

function quantity(id) {
  connection.query("SELECT stock_quantity, price FROM products WHERE ?", {item_id: id}, function(err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        type: "input",
        message: "Please enter how many of that item that you would like to buy (limit 5000): ",
        name: "quantity",
        validate: function(value) {
          if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 5000) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(data) {
      if (parseInt(data.quantity) <= res[0].stock_quantity) {
        var totalCost = data.quantity * parseFloat(res[0].price, 2);
        console.log("Successful Purchase! \n The total cost for your order is: $" + totalCost);
        var newQuantity = res[0].stock_quantity - parseInt(data.quantity);

        connection.query("UPDATE products SET ? WHERE ?", 
          [
            {
              stock_quantity: newQuantity
            },
            {
              item_id: id
            }
          ],
          function(err, res){
            if (err) throw err;
            console.log("Your purchase has been removed from inventory and is on it's way!");
            connection.end();
          });
      }
      else {
        console.log("We do not have enough items in inventory to fulfill your order, please decrease your order to proceed");
        quantity(id);
      }
    });
  }); 
}


//Running the application
connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  displayProducts();
});


