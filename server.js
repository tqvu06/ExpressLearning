// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const low = require("lowdb");
const shortid = require('shortid')
const _ = require('lodash');

const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);



db.defaults({ todos: [] });

const todoList = db.get("todos").value();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/todos", (req, res) => {
  res.render("todos", {
    todoList: todoList
  });
});

app.get("/todos/search", (req, res) => {
  let q = req.query.q;
  let matchedQuery = todoList.filter((item) => {
    return item.text.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  
  res.render("todos", {
    todoList: matchedQuery
  });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  console.log(req.body);
  db.get("todos")
    .push({ 
      text: req.body.text,
      id: shortid.generate()
    })
    .write();
  
  res.redirect("/todos");
});

app.get("/todos/:id/delete", (req, res) => {
 
  let item = db.get("todos")
    .find({ id: req.params.id })
    .value();
  let indexItem = db.get("todos")
    .value()
    .indexOf(item);
  
  db.get("todos")
    .value()
    .splice(indexItem, 1);
  
  res.redirect('/todos');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
