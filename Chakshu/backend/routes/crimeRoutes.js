const router = require('express').Router()
const { body, query, param } = require('express-validator')
const { registerCrime, addFakeReport, addSupport, getPost, getAllPosts } = require('../controllers/crimeController')
const { checkCrimePostExists } = require('../models/crimePostModel')
const { checkUserExists } = require('../models/userModel')

router.get('/all', getAllPosts)

router.post('/register', [
    
    query('userId').trim()
    .not().isEmpty()
    .withMessage('User Id should not be empty')
    .isMongoId()
    .withMessage('Enter User Id as Mongo Id')
    .custom((userId, {req})=>{
        return checkUserExists(userId).then((result)=>{
            if(result && result.length === 0){
                return Promise.reject('User Name does not exists')
            }
        })
    }),

    body('title').trim()
    .not().isEmpty()
    .withMessage('Crime Title should not be empty'),

    body('description').trim()
    .not().isEmpty()
    .withMessage('Crime Description should not be empty'),

    body('street').trim()
    .not().isEmpty()
    .withMessage('Enter a valid street/locality'),

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

    body('crimeType').trim()
    .not().isEmpty()
    .withMessage('Enter a valid crime type'),

    body('severity').trim()
    .not().isEmpty()
    .withMessage('Enter a valid severity'),

    body('isWitness').trim()
    .not().isEmpty()
    .withMessage('Enter a valid Witness value')

], registerCrime)

router.post('/addSupport', [

    query('userId').trim()
    .not().isEmpty()
    .withMessage('User Id should not be empty')
    .isMongoId()
    .withMessage('Enter User Id as Mongo Id')
    .custom((userId, {req})=>{
        return checkUserExists(userId).then((result)=>{
            if(result && result.length === 0){
                return Promise.reject('User Name does not exists')
            }
        })
    }),

    query('postId').trim()
    .not().isEmpty()
    .withMessage('Post Id should not be empty')
    .custom((postId, {req})=>{
        return checkCrimePostExists(postId).then((result)=>{
            if(result && result.length === 0){
                return Promise.reject('Crime Report does not exists')
            }
        })
    }),

    body('description').trim()
    .not().isEmpty()
    .withMessage('Crime Description should not be empty'),

    body('isWitness').trim()
    .not().isEmpty()
    .withMessage('Enter a valid Witness value')

], addSupport)

router.post('/addFakeReport', [

    query('userId').trim()
    .not().isEmpty()
    .withMessage('User Id should not be empty')
    .isMongoId()
    .withMessage('Enter User Id as Mongo Id')
    .custom((userId, {req})=>{
        return checkUserExists(userId).then((result)=>{
            if(result && result.length === 0){
                return Promise.reject('User Name does not exists')
            }
        })
    }),
    
    query('postId').trim()
    .not().isEmpty()
    .withMessage('Post Id should not be empty')
    .custom((postId, {req})=>{
        return checkCrimePostExists(postId).then((result)=>{
            if(result && result.length === 0){
                return Promise.reject('Crime Report does not exists')
            }
        })
    }),

    body('description').trim()
    .not().isEmpty()
    .withMessage('Crime Description should not be empty'),

    body('isWitness').trim()
    .not().isEmpty()
    .withMessage('Enter a valid Witness value')

], addFakeReport)

router.get('/:postId',[

    param('postId').trim()
    .not().isEmpty()
    .withMessage('Post Id should not be empty')
    .isMongoId()
    .withMessage('Enter Post ID as Mongo Id')

], getPost)

module.exports = router