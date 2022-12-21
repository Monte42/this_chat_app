const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userKey = process.env.USERS_KEY

module.exports = {
    register: async (req,res) => {
        // const newUser = await User.create(req.body)
        // try {
        //     const userToken = jwt.sign({_id:newUser._id,email:newUser.email}, userKey)
        //     res.status(201).cookie("userToken",userToken,{httpOnly:true,expires:new Date(Date.now() + 900000)}).json({msg:"success", user:newUser})
        // } catch(error){
        //     console.log(error)
        // }

        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({id:user._id,email:user.email}, userKey)
                res.status(201).cookie("userToken",userToken,{httpOnly:true,expires:new Date(Date.now() + 9000000)}).json({msg:"success", user:user})
            })
            .catch(err => res.status(400).json(err))
            
    },
    login: async (req,res) => {
        const user = await User.findOne({email:req.body.email})
        if (!user) return res.status(400).json({error:"Invalid password/email!!!"})// if user null
        try {
            const isValid = await bcrypt.compare(req.body.password, user.password)
            if(!isValid) return res.status(400).json({error:"Invalid password/email"})
            const userToken = jwt.sign({id:user._id,email:user.email}, userKey)
            res.status(201).cookie("userToken",userToken,{httpOnly:true,expires:new Date(Date.now() + 9000000)}).json({msg:"success", user:user})
        } catch (error) {
            res.status(400).json({error:"Invalid password/email..."})
        }

            // .then(user => {
            //     const payload = {
            //         id:user._id,
            //         email:user.email,
            //         // Socket.Id???
            //     }
            //     if (!user) return res.status(400).json({error:"Invalid password/email!!!"})// if user null
            //     const isValid = bcrypt.compare(user.password, req.body.password) // otherwise compare form pwd to db
            //     if (!isValid) return res.status(400).json({error:"Invalid password/email"})// if pwds don't match
            //     const userToken = jwt.sign(payload, userKey)// otherwise create token
            //     // jwt is a third party pkg, .sign signs in the user. It stores data about the the user and our
            //     // Secret Key we stored else where. BELOW we create a cookie in the browser to hold Data
            //     // .cookie(cookieVarName, aboveToken, {httpOnly:true, tokenExpiration}).json({msg,user})
            //     res.status(201).cookie("userToken",userToken,{httpOnly:true,expires:new Date(Date.now() + 90000)}).json({msg:"success", user:user})
            // })
            // .catch(() => res.status(400).json({error:"Invalid password/email..."}))//catch all
    },
    logout: (req,res) => {
        res.clearCookie("userToken")// deleteing our userToken from the browser
        res.json({msg:"Logged out"})
    },
    fecthAllUsers: (req,res) => {
        User.find()
            .then(allUsers => res.json(allUsers))
            .catch(err => res.json(err))
    },
    fecthUserById: (req,res) => {
        User.findById({_id:req.params.id})
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },
    updateUser: (req,res) => {
        User.updateOne({_id:req.params.id}, req.body, {runValidators:true})
            .then(results => res.json(results))
            .catch(err => res.status(400).json(err))
    },
    deleteUser: (req,res) => {
        User.findByIdAndDelete({_id:req.params.id})
            .then(results => res.json(results))
            .catch(err => res.json(err))
    }
}