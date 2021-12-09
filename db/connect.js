const mongoose = require('mongoose');

const connectDB = (url) =>{
    return mongoose
    .connect(url)
    .then(()=>{console.log('CONNECTED TO MONGODB SUCCESSFUL')})
    .catch((err)=>{console.log(err)})
}

module.exports = connectDB;