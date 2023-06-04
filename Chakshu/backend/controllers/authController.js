const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { User } = require('../models/userModel')
const { SuperUser } = require('../models/superUserModel')
const fs = require('fs')

dotenv.config()

const userLogin = (req, res, next)=>{
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        const error = new Error('New User could not be created')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }
    const { userName, password } = req.body

    User.findOne({userName:userName}).then((result)=>{
        if(!result){
            const error = new Error('User Name does not exists')
            error.statusCode = 422
            throw error
        }

        bcrypt.compare(password, result.password).then((isEqual)=>{
            if(!isEqual){
                const error = new Error('Authentication Failed')
                error.statusCode = 401
                throw error
            }
            else{
                const token  = jwt.sign({
                    userName:result.userName,
                    userId:result._id.toString()
                }, process.env.JWT_KEY, {expiresIn: '24h'})
                
                delete result.password
        
                res.status(200).json({message:'Authentication Successful', data:{JWT:token, userInfo:result}})
            }
        }).catch((err)=>{
            if(!err.statusCode){
                err.statusCode = 500
                err.message= 'Not allowed! Check Headers and Body Again'
            }
            next(err)
        })

    }).catch((err)=>{
        if(!err.statusCode){
            err.statusCode = 500
            err.message= 'Not allowed! Check Headers and Body Again'
        }
        next(err)
    })
}

const superUserLogin = (req, res, next)=>{
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        const error = new Error('New User could not be created')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }
    const { userName, password } = req.body

    SuperUser.findOne({userName:userName}).then((result)=>{
        if(!result){
            const error = new Error('User Name does not exists')
            error.statusCode = 422
            throw error
        }

        bcrypt.compare(password, result.password).then((isEqual)=>{
            if(!isEqual){
                const error = new Error('Authentication Failed')
                error.statusCode = 401
                throw error
            }
            else{
                const token  = jwt.sign({
                    userName:result.userName,
                    userId:result._id.toString()
                }, process.env.JWT_KEY, {expiresIn: '24h'})

                delete result.password
        
                res.status(200).json({message:'Authentication Successful', data:{JWT:token, userInfo:result}})
            }
        }).catch((err)=>{
            if(!err.statusCode){
                err.statusCode = 500
                err.message= 'Not allowed! Check Headers and Body Again'
            }
            next(err)
        })

    }).catch((err)=>{
        if(!err.statusCode){
            err.statusCode = 500
            err.message= 'Not allowed! Check Headers and Body Again'
        }
        next(err)
    })
}

const userSignup = (req, res, next)=>{
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        const error = new Error('New User could not be created')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const {
        userName,
        password,
        aadharNum, 
        contactNum,
        firstName,
        lastName,
        locality,
        city,
        state,
        pincode
    } = req.body

    const { buffer, originalname} = req.files[0]
    const buf = new Buffer.from(buffer)

    fs.writeFile(`./assets/profileIcon/${userName + originalname}`, buf, (err)=>{
        if(err){
            throw err
        }
    })

    const profileIcon = `./assets/profileIcon/${userName + originalname}`

    bcrypt.hash(password, parseInt(process.env.PASSWORD_ENCRYPT_LEN)).then((hashedPassword)=>{
        return User.create({
            userName:userName, 
            password:hashedPassword,
            name:{
                firstName:firstName,
                lastName:lastName
            },
            aadharNum:aadharNum,
            contactNum:contactNum,
            address:{
                locality:locality,
                city:city,
                state:state,
                pincode:pincode
            },
            profileIcon:profileIcon
        })
    }).then((createdUser)=>{
        res.status(201).json(
            {
                message:'User Successfully created', 
                data:{
                    userId:createdUser._id, 
                    userName:createdUser.userName, 
                    userType:createdUser.userType
                }
            }
        )
    }).catch((err)=>{
        if(!err.statusCode){
            err.statusCode = 500
            err.message= 'Not allowed! Check Headers and Body Again'
        }
        next(err)
    })
}

const superUserSignup = (req, res, next)=>{
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        const error = new Error('New User could not be created')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const {
        userName,
        password,
        name,
        contactNum,
        locality,
        city,
        state,
        pincode,
        userType
    } = req.body

    const { buffer, originalname} = req.files[0]
    const buf = new Buffer.from(buffer)

    fs.writeFile(`./assets/profileIcon/${userName + originalname}`, buf, (err)=>{
        if(err){
            throw err
        }
    })

    const profileIcon = `./assets/profileIcon/${userName + originalname}`

    bcrypt.hash(password, parseInt(process.env.PASSWORD_ENCRYPT_LEN)).then((hashedPassword)=>{
        return SuperUser.create({
            userName:userName, 
            password:hashedPassword,
            name:name,
            contactNum:contactNum,
            userType:userType,
            address:{
                locality:locality,
                city:city,
                state:state,
                pincode:pincode
            },
            profileIcon:profileIcon
        })
    }).then((createdUser)=>{
        res.status(201).json(
            {
                message:'User Successfully created', 
                data:{
                    userId:createdUser._id, 
                    userName:createdUser.userName, 
                    userType:createdUser.userType
                }
            }
        )
    }).catch((err)=>{
        if(!err.statusCode){
            err.statusCode = 500
            err.message= 'Not allowed! Check Headers and Body Again'
        }
        next(err)
    })
}

module.exports = {
    userLogin,
    superUserLogin,
    userSignup,
    superUserSignup
}
