const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')

const config = {
    PORT: process.env.PORT || '3000',
    ENV: process.env.NODE_ENV || 'development',
}

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api', routes)


app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    })
})

app.listen(config.PORT, () => {
    console.log(`starting ${config.ENV} server at http://localhost:${config.PORT}`);
});