const express = require ("express")
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 8080

const cors = require('cors')
const db = require('./DB/db')
const userRoutes = require('./Routes/userRoutes')
const productRoutes = require('./Routes/productRoutes')
const orderRoutes = require('./Routes/orderRoutes')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// CORS
const corsOptions = {
    origin: 'http://127.0.0.1:3000' || 'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Accept, Origin, authorization');
    res.setHeader('Access-Control-Expose-Headers', 'authorization');
    next();
});

app.use("/user", userRoutes)
app.use("/admin", productRoutes)
app.use("/order", orderRoutes)

app.listen(port, () => {
    console.log(`server started at ${port}`)
})