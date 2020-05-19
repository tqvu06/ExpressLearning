// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);


app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.render("index");
});

app.get('/todos', function(request, response) {
	response.render('todos/index', {
		todos: db.get('todos').value()
	});
});

app.get('/todos/search', function(req, response) {
	var q = req.query.q;
	var matchedTodos = db.get('todos').value().filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	response.render('users/index', {
		todos: matchedTodos
	});
  });


app.get("/todos", (request, response) => {
  response.render('todos/index');
});

app.get("/todos/create", function(request, response) {
  response.render("todos/create");
});

app.post("/todos/create", function(request, response) {
  db.get('todos').push(request.body).write();
  response.redirect("/todos");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});