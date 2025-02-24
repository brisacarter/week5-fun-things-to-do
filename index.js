//jshint esversion:6

/*
Name: Brisa Carter
Assignment: Week 5 - Fun To do List
Description: Creates a list of fun things to do extending Debasis To Do list
Date: 02/13/25
*/


/* for this activity I used AI to add jest test suites and verify if server is running
run app using  node index
- test using npm test 

What I did:
- Modified index.ejs, header.ejs, footer.ejs, package.json
- Modified CSS
- Added images folder and image
- Searched correct path for images folder - answer from Stacker Overflow
- Added npm nodemon to speed up restarting the server (tip from Angela Yu)
    • to restart the server without having to stop ntype
- Searched for html code for island emoji
*/
//adds express and body-parser
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for tests

let items = ["Paddleboard", "Play Video Games", "Hike", "Sail"];
let funItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  let day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Fun") {
    funItems.push(item);
    res.redirect("/fun");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/fun", function (req, res) {
  res.render("list", { listTitle: "Fun Things To Do List", newListItems: funItems });
});

// Start the server only if not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export app for testing
module.exports = app;
