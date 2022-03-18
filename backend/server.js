const express = require('express')
const port = process.env.PORT || 8000
const {errorHandler} = require('./middlewares/errorMiddleware')
const colors = require('colors')
const connectDB = require('./config/db')
require('dotenv').config();
connectDB()
console.log(process.env.PORT) 
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)


app.listen(port, () => {
    console.log("Server running on Port ", port)
})