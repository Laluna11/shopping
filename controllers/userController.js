const User = require("../models/user");
const { createToken } = require("../utils/token.js");
const bcrypt = require("bcrypt")
const Op = require("sequelize").Op;



module.exports = {

    async login(req, res) {
       
        const {email, password } = req.body;

        //checking if email and pass are empty 
        if(email === '' || password === ''){
            return res.status(401).json({message: "email and password are required"})
        }
        //validating email using regular expression
        let emailVal = String(email)
                        .toLowerCase()
                        .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
       
        if(!emailVal){
            return res.status(401).json({message: "email must be in the right format"})
        }
        //search for the user 
        try{
            let user = await User.findOne({
          
                where: {
                   email
               }
                
            });

            if(user) {
                //compare the password from the req with the one in the database
                const dbPass = user.dataValues.password
                const result = await bcrypt.compare(password, dbPass)

                if(result){
                    //create token for authentication
                    const token = createToken({
                        id: user.dataValues.userId,
                        name: user.dataValues.name,
                        role: "user"
                    });
    
                    return res.status(200).json({
                        message: "autharized",
                        Token: token,
                    })
    
                }else {
                    return res.status(404).json({message: 'Incorrect credentials'})
                } 
                  
            }else {
                return res.status(404).json({message: "User Not Found"})
            }   
        }catch(error) {
            console.log(error)
            return res.status(500).json({ message: `${error}` })
        }
    },

    async signUp(req, res){

        const {email, password } = req.body;
        //checking if email and pass are empty 

        if(email === '' || password === ''){
            return res.status(401).json({message: "email and password are required"})
        }
        let emailVal = String(email)
                        .toLowerCase()
                        .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
       
        if(!emailVal){
            return res.status(401).json({message: "email must be in the right format"})
        }

        try{

            const emailExist = await User.findOne({
                where:{
                    email
                }
            })
            if(emailExist){
                return res.status(400).json({message: "email already exist! "})
            }
            // hash user pass 
            const salt = await bcrypt.genSalt(10)
            const newPass = await bcrypt.hash( req.body.password, salt)

            const user = await User.create({ name: req.body.name, 
                                                        email: req.body.email , 
                                                       password: newPass})
      
                                               
            return res.status(201).json({ user_created: user })                    
        } catch (error){
         
            return res.status(400).json({ message: `${error}` })
        }
    },
    

    async getUser(req, res){

        const {id} = req.params
        try {
            const user = await User.findByPk(id)
            if(user === null){
                throw "No such a user"
            }

            return res.status(201).json(user)                   
        } catch (error) {
            return res.status(400).json({ message: `${error}` })
            
        }
    },

    async getAllUsers(req , res){
        try {
            const users = await User.findAll()
            if(users === null){
                throw "No users yet! "
            }
            return res.status(201).json({users})      
        } catch (error) {
            return res.status(400).json({ message: `${error}` })
        }
    },


    async editUser(req, res){
        const {id} = req.params
        try{

            const user = await User.findByPk(id)
            if(user === null){
                throw "No such a user"
            }
                                     
            user.update(req.body)
            return res.status(201).json({ message: "User updated successfully" })                   
        } catch (error){
           
            return res.status(400).json({ message: `${error}` })
        }
    },

    async deleteUser(req, res){
        const {id} = req.params
        try {
            const user = await User.findByPk(id)
            if(user === null){
                throw "No such a user"
            }
            user.destroy()
            res.status(200).json({ message: "user deleted successfully" })      
        } catch (error) {
            return res.status(400).json({ message: `${error}` })
        }
    },
    



}