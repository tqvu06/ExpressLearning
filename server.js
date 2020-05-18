// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var lists = [
  { id: 1, name: "Đi làm" },
  { id: 2, name: "Nấu ăn" },
  { id: 3, name: "Tập thể dục" },
  { id: 4, name: "Học trên CodersX" }
];

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.render("index");
});

app.get('/todos', function(request, response) {
	response.render('todos/index', {
		lists: lists
	});
});

app.get("/todos", (request, response) => {
  response.render('todos/index');
});

app.get("/todos/create", function(request, response) {
  response.render("todos/create");
});

app.post("/todos/create", function(request, response) {
  lists.push(request.body);
  response.redirect("/todos");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
