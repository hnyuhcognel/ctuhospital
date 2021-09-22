const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000

const route = require('./routes') 
const db = require('./config/db')

db.connect()

app.use(express.static(path.join(__dirname, '/public')))

app.use(morgan('combined'))

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

var hbs = exphbs.create({})
app.engine('hbs', exphbs({
  extname: 'hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

app.use(methodOverride('_method'))

app.use(cookieParser())
route(app)

hbs.handlebars.registerHelper("inc", function(value)
{
    return parseInt(value) + 1
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})