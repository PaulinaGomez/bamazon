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
            },
            {
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product",
                    "Buy a Product"
                ]
            }
        ])
        .then(function (answer) {
            console.log("Welcome " + answer.username);

            switch (answer.action) {
                case "View Products for Sale":
                    viewAllProducts();
                    break;

                case "View Low Inventory":
                    viewLowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;

                case "Buy a Product":
                    toBuyaProduct();
                    break;
            }
        });
}

//Working OK. 
function viewAllProducts() {
    console.log("Here are all the items for sale");
    connection.query("SELECT item_id,product_name,department_name,price FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        restart();
    })
}

//Working OK. 
function viewLowInventory() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Verifying items with stock lower than 5 units.",
                name: "lowstock"
            }
        ])
        .then(function () {
            connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
                if (err) throw err;
                console.table(res);
                restart();
            });
        });

}

//Working OK.
function addInventory() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Wich Item would you like to add inventory to? Please enter Item ID Number.",
                name: "productid"
            },
            {
                type: "input",
                message: "How many units of this item would you like to add to inventory?",
                name: "productunit"
            }
        ])
        .then(function (answer) {
            console.log("Verifying data");
            var query = connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [answer.productid], function (err, res) {
                var productstock = res[0].stock_quantity;
                console.log(res[0].stock_quantity)
                console.log(query.sql);
                var newProductStock = productstock + parseInt(answer.productunit);
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                    [newProductStock, answer.productid],
                    function (error) {
                        if (error) throw err;
                        console.log("Database updated.");
                        restart();
                    }
                );
            });
        });
};

//Working Ok. 
function addNewProduct() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the item you would like to submit? Please enter Item Name.",
                name: "productname"
            },
            {
                type: "input",
                message: "What category would you like to place your item in?",
                name: "productcategory"
            },
            {
                type: "input",
                message: "What price would you like to place for this item?",
                name: "productprice"
            },
            {
                type: "input",
                message: "How many units of this item would you like to add to inventory?",
                name: "productunit"
            }
        ])
        .then(function (answer) {
            console.log("Adding New Item to Database");
            var query = connection.query("INSERT INTO products SET ?",
                {
                    product_name: answer.productname,
                    department_name: answer.productcategory,
                    price: answer.productprice,
                    stock_quantity: answer.productunit
                },
                function (error) {
                    if (error) throw err;
                    console.log("Item added successfully!");
                    restart();
                }
            );
            console.log(query.sql);
        });
}

//Working OK. 
function toBuyaProduct() {
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
            var query = connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [answer.productid], function (err, res) {
                if (err) throw err;
                var productstock = res[0].stock_quantity;
                if (productstock > parseInt(answer.productunit)) {
                    console.log("Product available");
                    var newProductStock = productstock - parseInt(answer.productunit);
                    connection.query("UPDATE products SET stock_quantity =  ? WHERE item_id = ?",
                        [newProductStock, answer.productid],
                        function (error) {
                            if (error) throw err;
                            console.log("Your order has been placed successfully!");
                            restart();
                        }
                    );
                }
                else {
                    console.log("Sorry, product stock not enough to cover your request")
                    restart();
                }

            });
        });
};

//Working OK. 
function closeApp() {
    inquirer
        .prompt({
            name: "exit",
            type: "confirm",
            message: "Are you sure you want to exit?",
            default: true
        })
        .then(function (answer) {
            console.log("Goodbye!, Connection ended.");
        });
}

//Working OK. 
function restart() {
    inquirer
        .prompt({
            name: "reestart",
            type: "list",
            message: "Would you like to make another action?",
            choices: [
                "Return to menu",
                "Close Application"
            ]
        })
        .then(function (answer) {
            switch (answer.reestart) {
                case "Return to menu":
                    start();
                    break;

                case "Close Application":
                    closeApp();
                    connection.end();
                    break;
            }
        });
}
