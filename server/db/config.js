const mongoose = require('mongoose');

// Connect to MongoDB
const connect = ()=>{
    mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });
}

module.exports = connect;