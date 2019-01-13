var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "*1234",
  database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connection to Database Successful")
        start();
    }
});

function start() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Hi, I'm Bmazon. What is your name?",
                name: "username"
            }
        ])
        .then(function (answer) {
            console.log("Welcome " + answer.username);
            console.log("Here´s all the items for sale");
            connection.query("SELECT item_id,product_name,department_name,price FROM products", function (err, res) {
                if (err) throw err;
                console.table(res);
                userInput();
            });
        });
        }

function userInput () {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Wich Item would you like to buy? Please enter Item ID Number.",
                name: "productid"
            },
            {
                type: "input",
                message: "How many units of this item would you like to buy?",
                name: "productunit"
            }
        ])
        .then(function (answer) {
            console.log("Verifying product availability");
            connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [answer.productid], function (err, res) {
                if (err) throw err;
                var productstock = res[0].stock_quantity;
            
             if (productstock > parseInt(answer.productunit)) {
                 console.log ("Product available");
                 var newProductStock = productstock - parseInt(answer.productunit);
                 connection.query("UPDATE products SET stock_quantity =  ? WHERE item_id = ?", 
                 [newProductStock, answer.productid],
                    function(error) {
                        if (error) throw err;
                        console.log("Your order has been placed successfully!");
                    }
                );
            }
             else {
                console.log ("Sorry, product stock not enough to cover your request")
             }
                connection.end();
            });
        });
    };

