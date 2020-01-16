//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",  function(req, res){
  //console.log(req.body.crypto);
  //console.log(req.body.fiat);

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  // Concatenate the two string
  var baseURL = "https://apiv2.bitcoinaverage.com/convert/global";

  var options = {
    url: baseURL,
    method:"GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  }

  // Response apa yg dikasih url itu ke kita
  request(options, function(eror, response, body){
    // Take the data from JSON
    var data = JSON.parse(body);
    // Status conversion
    var status = data.success;
    // Price
    var price = data.price;
    // Date
    var date = data.time;

    res.write("<h1>The current price of " + crypto  + " is " + price + fiat + "</h1>");
    res.write("<h2>Current date " + date + "</h2>");
    res.send();

    console.log(price);
  })
});



app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
