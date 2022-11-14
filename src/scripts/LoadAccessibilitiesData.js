var AWS = require("aws-sdk");
var fs = require('fs'); // allow to interact with files system

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to Accessibilities table.");

// grab a dynamodb object
// we use the DocumentClient object to create the instace -> dynamodb
var dynamodb = new AWS.DynamoDB.DocumentClient();
var accessibilitiesData =  //load our data in json
// parse the file
  JSON.parse(fs.readFileSync('../components/data/accessibilities.json', 'utf8'));

  // for each item create the item with the attribute 'name'
  // and the value
accessibilitiesData.forEach(function(accessibililty) {
  var params = {
    TableName: "Accessibilities", // name of the table
    Item: {
      "name": accessibililty.name
    }
  };

  // debug information
  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for accessibility",
                    accessibililty.name, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", accessibililty.name, "to table.")
  })
});