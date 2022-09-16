const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE, {useNewUrlParser:true, useUnifiedTopology:true})

const db = mongoose.connection

db.on("error", console.error.bind(console, "Database Connection Error"))

db.once("open" , function(){
    console.log("Database connected successfully")
})