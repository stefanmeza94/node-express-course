const express = require('express')
const app = express();

app.get('/', (req, res) => {
  console.log('user hit the resource');
  res.status(200).send('Home page');
})

app.get('/about', (req, res) => {
  res.status(200).send('About page');
})

app.all('*', (req, res) => {
  res.status(404).send('<h1>resource not found</h1>')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000')
});

// 013 App example
// ako geldas od youtube onda je to na 05:03:10