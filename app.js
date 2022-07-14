const express = require('express')
const app = express()
const tasks = require('./routes/task')

require('dotenv').config()
const connectDB = require('./db/connect')
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/notFound')

const port = process.env.PORT || 6000

// Built in middlewares
// app.use(express.static(__dirname + '/public'));
app.use(express.static('./public'))
app.use(express.static('public'))
// app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json())

// Custom middlewares
app.use('/api/v1/tasks', tasks) // for setting up routes
app.use(errorHandler)
app.use(notFound)   // incase any route don't match execute this



// a code alteration so that we are connected to database first and only then we connect to the server
const connectingMongo = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("DB connected")
        app.listen(port, () => {
            console.log(`Server is listening at ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

connectingMongo()



