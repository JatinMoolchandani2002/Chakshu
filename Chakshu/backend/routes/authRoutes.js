const router = require('express').Router()
const { body } = require('express-validator')
const { userLogin, superUserLogin, superUserSignup, userSignup } = require('../controllers/authController')
const { checkSuperUserExists } = require('../models/superUserModel')
const { checkUserExists } = require('../models/userModel')

router.post('/userSignUp', [

    body('userName').trim()
    .not().isEmpty()
    .withMessage("User Name shouldn't be empty")
    .isLength({min:6, max:15})
    .withMessage("Username should be of min 6 charaters and maximum 15 characters")
    .custom((userName, {req})=>{
        return checkUserExists(userName).then((result)=>{
            if(result && result.length !== 0){
                return Promise.reject('User Name already exists')
            }
        })
    }),

    body('password').trim()
    .not().isEmpty()
    .withMessage("Password shouldn't be empty")
    .isStrongPassword({minLength:8, minLowercase:1, minUppercase:1, minSymbols:1, minNumbers:1})
    .withMessage("Password should have a minimum length of 8 and it should contain at least 1 number, 1 uppercase, 1 lowercase and 1 symbol"),

    body('aadharNum').trim()
    .not().isEmpty()
    .withMessage("Aadhar Number shouldn't be empty")
    .isLength({min:12, max:12})
    .withMessage('Enter a valid Aadhar Card Number'),

    body('firstName').trim()
    .not().isEmpty()
    .isLength({min: 3})
    .withMessage('Enter a valid First Name with minimum 3 characters'),

    body('lastName').trim()
    .not().isEmpty()
    .isLength({min: 3})
    .withMessage('Enter a valid LastName with minimum 5 characters'),

    body('contactNum').trim()
    .not().isEmpty()
    .withMessage('Contact num cannot be empty')
    .isLength({min:10, max:10})
    .withMessage("Enter a valid contact number"),

    body('locality').trim()
    .not().isEmpty()
    .withMessage('Enter a valid locality'),

    body('city').trim()
    .not().isEmpty()
    .withMessage('Enter a valid city'),

    body('state').trim()
    .not().isEmpty()
    .withMessage('Enter a valid state'),

    body('pincode').trim()
    .not().isEmpty()
    .withMessage('Pincode cannot be empty')
    .isLength({min:6, max:6})
    .withMessage("Enter a valid Pincode"),

    // body('profileIcon').optional()
    // .isString()

], userSignup)

router.post('/superUserSignUp', [

    body('userName').trim()
    .not().isEmpty()
    .withMessage("User Name shouldn't be empty")
    .isLength({min:6, max:15})
    .withMessage("Username should be of min 6 charaters and maximum 15 characters")
    .custom((userName, {req})=>{
        return checkSuperUserExists(userName).then((result)=>{
            if(result && result.length !== 0){
                return Promise.reject('User Name already exists')
            }
        })
    }),

    body('password').trim()
    .not().isEmpty()
    .withMessage("Password shouldn't be empty")
    .isStrongPassword({minLength:8, minLowercase:1, minUppercase:1, minSymbols:1, minNumbers:1})
    .withMessage("Password should have a minimum length of 8 and it should contain at least 1 number, 1 uppercase, 1 lowercase and 1 symbol"),

    body('name').trim()
    .not().isEmpty()
    .isLength({min: 3})
    .withMessage('Enter a valid First Name with minimum 3 characters'),

    body('userType').trim()
    .not().isEmpty()
    .withMessage('User Type cannot be empty'),

    body('contactNum').trim()
    .not().isEmpty()
    .withMessage('Contact num cannot be empty')
    .isLength({min:10, max:10})
    .withMessage("Enter a valid contact number"),

    body('locality').trim()
    .not().isEmpty()
    .withMessage('Enter a valid locality'),

    body('city').trim()
    .not().isEmpty()
    .withMessage('Enter a valid city'),

    body('state').trim()
    .not().isEmpty()
    .withMessage('Enter a valid state'),

    body('pincode').trim()
    .not().isEmpty()
    .withMessage('Pincode cannot be empty')
    .isLength({min:6, max:6})
    .withMessage("Enter a valid Pincode"),

    // body('profileIcon').optional()
    // .isString()

], superUserSignup)

router.post('/userLogin', [

    body('userName').trim()
    .not().isEmpty()
    .withMessage("User Name shouldn't be empty"),

    body('password').trim()
    .not().isEmpty()
    .withMessage("Password shouldn't be empty")

], userLogin)

router.post('/superUserLogin', [

    body('userName').trim()
    .not().isEmpty()
    .withMessage("User Name shouldn't be empty"),

    body('password').trim()
    .not().isEmpty()
    .withMessage("Password shouldn't be empty")

], superUserLogin)

module.exports = router