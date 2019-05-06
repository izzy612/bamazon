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

connection.connect(function(err){
	if(err)throw err;
	console.log("Restocking Bamazon");
});

function displayInventory(){
	connection.query('SELECT * FROM Products', function(err, res) {
    
    if (err) { console.log(err) };
    
    var table = new Table({
      
      head: ["Id", "Product Name","Deparment", "Cost", "Quantity"],
      
      colWidths: [5, 20, 15, 8, 10]
		});
    
    for (i = 0; i < res.length; i++) {
    
      table.push([
        res[i].id,
        res[i].product_name,
        res[i].deparment_id,
        res[i].price,
        res[i].stock_quantity
      ]);
		}
		console.log(table.toString());
    
    inquirerForUpdates();
	});
};

function inquirerForUpdates(){
	inquirer.prompt([{
		name:"action",
		type: "list",
		message: "Choose an option below to manage current inventory:",
		choices: ["Restock Inventory", "Add New Product", "Remove An Existing Product"]
	}]).then(function(answers){
		switch(answers.action){
			case 'Restock Inventory':
				restockRequest();
				break;
			case 'Add New Product':
				addRequest();
				break;
			case 'Remove An Existing Product':
				removeRequest();
				break;		
		}
	});
};

function restockRequest(){
	inquirer.prompt([
	{
		name:"ID",
		type:"input",
		message:"What is the item number of the item you would like to restock?"
	},
	{
		name:"Quantity",
		type:"input",
		message:"What is the quantity you would like to add?"
	},
	]).then(function(answers){
		var quantityAdded = answers.Quantity;
		var IDOfProduct = answers.Id;
		restockInventory(IDOfProduct, quantityAdded);
	});
};

function restockInventory(id, quantity){
	connection.query('SELECT * FROM products WHERE id = 2 '+ id, function(err,res){
		if(err){console.log(err)};
		connection.query('UPDATE products SET stock_quantity = stock_quantity + ' + stock_quantity + 'WHERE id = ?' + id);

		displayInventory();
	});
};

function addRequest(){
	inquirer.prompt([

	{
		name: "ID",
		type: "input",
		message: "Add ID Number"

	},	
	{
		name: "Name",
		type: "input",
		message: "What is name of product you would like to stock?"
	},
	{
		name:"Category",
		type:"input",
		message:"What is the category for product?"
	},
	{
		name:"Price",
		type:"input",
		message:"What is the price for item?"
	},
	{
		name:"Quantity",
		type:"input",
		message:"What is the quantity you would like to add?"
	},

	]).then(function(answers){
		var id = answers.Id;
		var name = answers.Name;
		var category = answers.Category;
		var price = answers.Price;
		var quantity = answers.Quantity;
		buildNewItem(id,name,category,price,quantity); 
	});
  };

  function buildNewItem(name,category,price,quantity){
    connection.query('INSERT INTO products (id,product_name,department_id,price,stock_quantity) VALUES("' + id + '", "' + name + '", "' + category + '", ' + price + ', ' + quantity +  ')');
  	displayInventory();
};


  function removeRequest(){
  	inquirer.prompt([{
  		name:"ID",
  		type:"input",
  		message:"What is the item number of the item you would like to remove?"
  	}]).then(function(answers){
  		var id = answers.ID;
  		removeInventory(id); 
  	});
  };

  function removeInventory(id){
  	connection.query('DELETE FROM products WHERE id = ? ' + id);
  	displayInventory();
  };

  displayInventory();