const express = require("express")
const router = express.Router()
const Product = require("../models/product")
const { auth } = require("../middlewares/auth")

const { createProduct, editProduct , deleteProduct , getProduct, getAllProducts ,paginatedResults } = require("../controllers/productController")


router.post("/create",createProduct)

router.get("/productPage",(req, res, next) => auth(req, res, next, ['user']),paginatedResults )

router.get("/getProduct/:id",(req, res, next) => auth(req, res, next, ['user']), getProduct )

router.get("/getAllProducts",(req, res, next) => auth(req, res, next, ['user']) , getAllProducts)

router.put("/editProduct/:id",(req, res, next) => auth(req, res, next, ['user']), editProduct)

router.delete("/deleteProduct/:id",(req, res, next) => auth(req, res, next, ['user']), deleteProduct )



module.exports = router;