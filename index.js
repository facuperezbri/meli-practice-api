var express = require('express');
var morgan = require('morgan');
const axios = require('axios')

var app = express();
const PORT = process.env.PORT || 3001;
var cors = require('cors');
const { restart } = require('nodemon');

app.use(morgan('dev')) // Morgan recibe tipo de config
app.use(express.json()); // Bodyparser a JSON
app.use(cors());

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`)
});

app.get('/', function (req, res) {
  res.send('Welcome to my MeLi practice challenge')
})

app.get('/items', async function (req, res) {
  const { name } = req.query
  const data = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${name}`)
  res.send(data.data)
})

app.get('/items/:id', async function (req, res) {
  const { id } = req.params
  let data = await axios.get(`https://api.mercadolibre.com/items/${id}`)
  res.send(data.data)
})