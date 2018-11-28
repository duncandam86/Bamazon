const inquirer = require("inquirer");
const mysql = require("mysql");
const chalk = require("chalk");

//create connection to database
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "gowabash1302!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    console.log(chalk.black.bgYellow.bold("WELCOME TO BAMAZON STORE"));
    productsForSale();
});

//function to show all products
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
            userPromptForPurchase()
        });

    // function to prompt user to ask them which item_id and how many units they like
    function userPromptForPurchase() {
        console.log(chalk.yellow.bold("What would you like to buy?"));
        // inquirer to prompt questions
        inquirer.prompt([
            {
                type: "input",
                name: "item_id",
                message: "Please enter the item_id that you like to purchase.",
                filter: Number
            },
            {
                type: "input",
                name: "quantity",
                message: "How many units do you need?",
                filter: Number
            }
        ]).then(function (res) {
            console.log(chalk.blue(`Customer has chosen item with item_id: ${chalk.red.bold(res.item_id)} and quantity: ${chalk.red.bold(res.quantity)}`))
            // Query db to confirm that the item exists
            connection.query(`SELECT* 
            FROM products 
            WHERE item_id = ${res.item_id}`, function (err, results) {
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
                        // if the quantity that the user asked for is less than the total inventory
                        if (res.quantity <= results[0].stock_quantity) {
                            console.log(chalk.black.bgGreen("We have enough inventory instock. Placing your order!"));
                            //Update databse with new inventory after placing order
                            connection.query(`Update products
                            Set stock_quantity = ${results[0].stock_quantity - res.quantity}
                            Where item_id = ${res.item_id}`, function (err, data) {
                                console.log(chalk.green(`New stock quantity of ${results[0].product_name}: ${results[0].stock_quantity - res.quantity}`));
                                if (err) {
                                    throw err
                                }
                                //Inform user how much it costs
                                console.log(`-----------------------`);
                                console.log(chalk.magenta.bold(`Your order has been placed. Your total cost is: ${(results[0].price) * (res.quantity)}
                                \nThank you for shopping with us!`));
                                console.log(`-----------------------`);

                                // end connection here
                                connection.end()
                            })
                        }
                        else {
                            console.log(chalk.red(`Unfortunately, we have insufficient quantity of the product you requested
                            \n Please modify your order or order other products`));
                            userPromptForPurchase()

                        }

                    }

                })
        })

    }

}