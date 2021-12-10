const EXPRESS = require('express');
const app = EXPRESS();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect');
const { connect } = require('./routes/tasks')
require('dotenv').config()

//middleware

// app.use(EXPRESS.static('public'));
app.use(EXPRESS.json())
app.use('/api/v1/tasks', tasks)
app.use(EXPRESS.static('public'))

//routes
app.get('/hello', (req, res) => {
    res.send('Task Manager App')
})

const PORT = 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`server is listening on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()