const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://grocify-admin:admin123@cluster0.efzizc1.mongodb.net/Grocify?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology:true})

const db = mongoose.connection

db.on("error", console.error.bind(console, "Database Connection Error"))

db.once("open" , function(){
    console.log("Database connected successfully")
})