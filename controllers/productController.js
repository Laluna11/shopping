const Product = require("../models/product");


module.exports = {


    async createProduct(req, res){
        try{
            const product = await Product.create({ productName: req.body.productName, 
                                                    description: req.body.description , 
                                                })
      
                                               
            return res.status(201).json({ product_created: product })                    
        } catch (error){
         
            return res.status(400).json({ message: `${error}` })
        }
    },
    
    async getAllProducts(req , res){
        try {
            const products = await Product.findAll()
            if(products === null){
                throw "No products yet! "
            }
            return res.status(201).json({products})      
        } catch (error) {
            return res.status(400).json({ message: `${error}` })
        }
    },
   
    async paginatedResults(req , res){
            //getting the page num and how many product should be displayed from the req 
            const page = parseInt(req.query.page)
            const limits = parseInt(req.query.limits)

            const startIndex = (page-1) * limits
            const endIndex = page * limits 

            const results ={}
            
            //get how many products exist
            const length = await Product.count()
            
            //check if there is a next page 
            if(endIndex < length ){
                results.next = {
                        page: page + 1,
                        limits: limits
                    }
            }
            //check if there is a previous page 
            if(startIndex > 0){
                results.previous = {
                    page: page - 1,
                    limits: limits
                }
            }
            try{
                //bring the needed products between startIndex and endIndex
                results.results = await Product.findAll({ offset: startIndex, limit: endIndex })
                
                
            }catch(error){
                return res.status(500).json({ message: error.message })
            }
            return res.status(201).json(results) 
         
    },

    async getProduct(req, res){

        const {id} = req.params

        try {
            const product = await Product.findByPk(id)
            if(product === null){
                throw "No such product"
            }

            return res.status(201).json(product)                   
        } catch (error) {
            return res.status(400).json({ message: error })
            
        }
    },


    async editProduct(req, res){
        const {id} = req.params

        try{

            const product = await Product.findByPk(id)
            if(product === null){
                throw "No such product"
            }
                                     
            product.update(req.body)
            return res.status(201).json({ message: "product updated successfully" })                   
        } catch (error){
           
            return res.status(400).json({ message: error })
        }
    },

    async deleteProduct(req, res){
        const {id} = req.params

        try {
            const product = await Product.findByPk(id)
            if(product === null){
                throw "No such product"
            }
            product.destroy()
            res.status(200).json({ message: "product deleted successfully" })      
        } catch (error) {
            return res.status(400).json({ message: error })
        }
    }

    



}