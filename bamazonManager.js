const inquirer = require("inquirer");
const mysql = require("mysql");
const chalk = require("chalk");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "gowabash1302!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    productsForSale()
});

//function to show all products for sale
function productsForSale() {
    connection.query(`SELECT*
    FROM products`, function (err, results) {
            if (err) {
                throw err;
            };
            results.forEach(function (row) {
                console.log(`------------------------------`);
                console.log(chalk.cyan(`item_id: ${row.item_id}
                \nProduct: ${row.product_name}
                \nPrice: ${row.price}`));
                console.log(`------------------------------`);
            })
            // lowInventory();
            addInventory();
        });
    connection.end()
}

//function to show products with low inventory
function lowInventory() {
    connection.query(`SELECT*
    FROM products
    Where stock_quantity < 120`, function (err, results) {
            if (err) {
                throw err;
            };
            console.log(`These items have low inventory`)
            results.forEach(function (row) {
                console.log(`------------------------------`);
                console.log(chalk.red(`item_id: ${row.item_id}
                \nProduct: ${row.product_name}
                \nDepartment: ${row.department_name}
                \nPrice: ${row.price}
                \nQuantity: ${row.stock_quantity}`));
                console.log(`------------------------------`);
            })
        });
    connection.end()
}

//function add an inventory to stock
function addInventory() {
    //console.log("hello")
    //prompt manager to add new inventory
    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "Please enter the item ID",
            filter: Number
        },
        {
            type: "input",
            name: "stock_quantity",
            message: "Please enter the amount of units you would like to add",
            filter: Number
        }
    ]).then(function (input) {
        console.log(chalk.blue(`You have added ${input.stock_quantity} units of item with ID number ${input.item_id}`));
        // Update new inventory in database
        connection.query(`SELECT* 
            FROM products 
            WHERE item_id = ${input.item_id}`, function (err, results) {
                // console.log(results)
                if (err) {
                    throw err
                };
                // make sure that item_id input was valid
                if (results.length === 0) {
                    console.log(chalk.bgRed("Invalid item ID. Please enter an valid item ID"));
                    productsForSale();
                }
                else {
                    console.log("Updating inventory!")
                    // Update database with new inventory
                    connection.query(`Update products 
                    Set stock_quantity = ${results[0].stock_quantity + input.stock_quantity}
                    Where item_id = ${results[0].item_id}`, function (err, data) {
                        if (err) {
                            throw err;
                        };
                        console.log(`------------------------------`);
                        console.log(chalk.cyan(`item_id: ${results[0].item_id}
                            \nProduct: ${results[0].product_name}
                            \nNew Quantity: ${input.stock_quantity + results[0].stock_quantity}`));
                        console.log(`------------------------------`);

                    });

                }
            });
    });
}

//function adding a new product
function addNewProduct(){
    // prompt to add new product
    inquirer.prompt([
        
    ]) 
}