const express = require("express")
const router = express.Router()

const { login , signUp , editUser , deleteUser , getUser, getAllUsers } = require("../controllers/userController")


router.post("/login", login)

router.post("/signUp", signUp)

router.get("/getUser/:id", getUser )

router.get("/allUsers",getAllUsers)

router.put("/Edit/:id",editUser)

router.delete("/Delete/:id", deleteUser )



module.exports = router;