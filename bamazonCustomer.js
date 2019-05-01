var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");


var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"class",
	database:"bamazon_db"
});

connection.connect();

var display = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    
    console.log("This is.... Bamazon, You want it? We have it!");
    
    var table = new Table({
      head: ["Id", "Product Name","Deparment", "Cost", "In Stock" ],
      colWidths: [5, 20, 15, 8, 10],
      colAligns: ["center", "left", "right"],
      style: {
        head: ["aqua"],
        compact: true
        
      }
    });

    for (var i = 0; i < res.length; i++) {
      table.push([res[i].id, res[i].product_name, res[i].deparment_id, res[i].price, res[i].stock_quantity]);
    }

    console.log(table.toString());
    console.log("");
    shopping();
  }); 
};

var shopping = function() {
  inquirer
    .prompt({
      name: "productToBuy",
      type: "input",
      message: "Enter the Product Id of the item you wish to purchase!"
    })
    .then(function(answer1) {
      var selection = answer1.productToBuy;
      connection.query("SELECT * FROM products WHERE Id=?", selection, function(
        err,
        res
      ) {
        if (err) throw err;
        if (res.length === 0) {
          console.log(
            "That Product doesn't exist, Please enter a Product Id from the list above"
          );
          shopping();
        }

        else {
          inquirer
            .prompt({
              name: "quantity",
              type: "input",
              message: "How many items woul you like to purchase?"
            })
            .then(function(answer2) {
              var quantity = answer2.quantity;
              if (quantity > res[0].stock_quantity) {
                console.log(
                  "Our Apologies we only have " +
                    res[0].stock_quantity +
                    " items of the product selected"
                );
                shopping();
              } else {
                console.log("");
                console.log(res[0].products_name + " purchased");
                console.log(quantity + " qty @ $" + res[0].price);

                var newQuantity = res[0].stock_quantity - quantity;
                connection.query(
                  "UPDATE products SET stock_quantity = " +
                    newQuantity +
                    " WHERE id = " +
                    res[0].id,
                  function(err, resUpdate) {
                    if (err) throw err;
                    console.log("");
                    console.log("Your Order has been Processed");
                    console.log("Thank you for Shopping with us...!");
                    console.log("");
                    connection.end();
                  }
                );
              }
            });
        }
      });
    });
};

display();

          