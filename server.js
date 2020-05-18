// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

var lists = [
      {id : 1, name: 'Đi làm'},
      {id : 2, name: 'Nấu ăn'},
      {id : 3, name: 'Tập thể dục'},
      {id : 4, name: 'Học trên CodersX'}
    ];

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('Hello CodersX');
});

app.get('/todos', (request, response) => {
  var q = request.query.q;
  var matchedList = lists.filter(function(list) {
    return list.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  
  response.render('index', {
    listToDo: matchedList
  });
  });

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
