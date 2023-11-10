const { engine } = require('express-handlebars')
const express = require('express')
const app = express()
const port = 3000
const restaurant = require('./public/jsons/restaurant.json').results

app.listen(port, () => {
  console.log(`express server started.`)
})

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurant })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const shop = restaurant.find((item) => {
    return item.id.toString() === id
  })
  res.render('show', { restaurant, shop })
})

app.engine('.hbs', engine({extname: 'hbs'}))
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.static('public'))

