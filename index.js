const express = require("express")
const dotenv = require ("dotenv")
const bodyParser = require('body-parser')
require("./database")


dotenv.config();

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const server = require('http').createServer(app)

// require routers
const UserRouter = require("./routes/userRoute")
const ProductRouter = require("./routes/productRoute")



// define routers
app.use("/user", UserRouter)
app.use("/product", ProductRouter)


  


const port = process.env.PORT || 8000
server.listen(port, () => {
    console.log(`Listening at port `)
})