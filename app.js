const { engine } = require('express-handlebars')
const express = require('express')
const app = express()
const port = 3001
const restaurant = require('./public/jsons/restaurant.json').results

app.listen(port, () => {
  console.log(`express server started.`)
})

app.get('/', (req, res) => {
  res.render('index', { shops: restaurant })
})

// form action 導向 /search
app.get('/search', (req, res) => {
  // input name 是 keyword
  const keyword = req.query.keyword?.trim() || '';
  const matchedShops = keyword ? restaurant.filter((item) => {
    return Object.values(item).some((property) => {
      if (typeof property === 'string') {
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  }) : restaurant
  res.render('index', { shops: matchedShops })
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

