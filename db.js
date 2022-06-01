const mongoose = require('mongoose');

const db = 'mongodb://localhost:27017/tabledata';
const connectDB = async () =>{
    await mongoose.connect(db,{useNewUrlParser: true})
    console.log('Database connected')
} 

module.exports = connectDB;