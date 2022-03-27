const express = require('express')
const port = process.env.PORT || 8000
const {errorHandler} = require('./middlewares/errorMiddleware')
const colors = require('colors')
const connectDB = require('./config/db')
const path = require('path')
require('dotenv').config();
connectDB()
console.log(process.env.PORT) 
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// server front end
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => 
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html' )))
}else{
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)


app.listen(port, () => {
    console.log("Server running on Port ", port)
})