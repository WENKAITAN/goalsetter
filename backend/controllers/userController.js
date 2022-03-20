const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../model/userModel")


//@desc     register a new user
//@route    POST /api/users/
//@access   public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please add all field")
    }

    //check if the user is already registered
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("User already registered")
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)

    const hashPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)

        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }

})

//@desc     authenticate a user
//@route    POST /api/users/login
//@access   public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("Please add all field")
    }

    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password) )){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid credentials")
    }

})


//@desc     get user data
//@route    get /api/users/me
//@access   private
const getMe = asyncHandler(async (req, res) => {
    const { _id, email, name } = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        email,
        name
    })
})


//generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}
module.exports = {  
    registerUser,
    loginUser,
    getMe,
 }