const fs = require('fs')
const { validationResult } = require('express-validator')
const { CrimePost } = require('../models/crimePostModel')

const registerCrime = (req, res, next)=>{
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        const error = new Error('Crime Report could not be registered')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const {title, description, street, city, state, pincode, crimeType, severity, location, date, time} = req.body
    const isWitness = req.body.isWitness==='true'?true:false
    const userId = req.query.userId
    let dateArr = date.includes('/')?date.split('/'):date.split('-')
    let timeArr = time.split(':')

    let dateTime = new Date(Date.UTC(dateArr[0], parseInt(dateArr[1])-1, dateArr[2], timeArr[0], timeArr[1], 0)).toISOString()

    let media = []
    new Promise((resolve)=>{
        Array.from(req.files).forEach((file)=>{
            const { buffer, originalname} = file
            const buf = new Buffer.from(buffer)
            fs.writeFile(`./assets/media/${userId + originalname}`, buf, (err)=>{
                if(err){
                    throw err
                }
            })
            const path = `./assets/media/${userId + originalname}`
            media.push(path.toString())
        })
        resolve()
    }).then(()=>{
        let crimeDoc = {
            userId:userId,
            title:title,
            description:description,
            crimeType:crimeType,
            isWitness:isWitness,
            date:dateTime,
            address:{
                locality:street,
                city:city,
                state:state,
                pincode:pincode,
                location:location.split(',')
            },
            severity:severity,
            media:media
        }
    
        CrimePost.create(crimeDoc).then((createdCrimePost)=>{
            res.status(201).json(
                {
                    message:'Crime Report Successfully created', 
                    data:{
                        postId:createdCrimePost._id
                    }
                }
            )
        }).catch((err)=>{
            console.log(err)
            if(!err.statusCode){
                err.statusCode = 500
                err.message= 'Not allowed! Check Headers and Body Again'
            }
            next(err)
        })
    })
}

const addSupport = (req, res, next)=>{
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        const error = new Error('Support to the Post could not be added')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const description = req.body.description
    const isWitness = req.body.isWitness==='true'?true:false
    const userId = req.query.userId
    const postId = req.query.postId
    let media = []

    new Promise((resolve)=>{
        Array.from(req.files).forEach((file)=>{
            const { buffer, originalname} = file
            const buf = new Buffer.from(buffer)
            fs.writeFile(`./assets/media/${userId + originalname}`, buf, (err)=>{
                if(err){
                    throw err
                }
            })
            const path = `./assets/media/${userId + originalname}`
            media.push(path.toString())
        })
        resolve()
    }).then(()=>{
        const updateDoc = {
            userId:userId,
            media:media,
            description:description,
            isWitness:isWitness
        }

        CrimePost.updateOne({_id:postId}, {$push:{supportPost:updateDoc}}).then((updatedDoc)=>{
            res.status(201).json({message:'Support to Crime Report Added successfully', data:updatedDoc._id})
        })
    }).catch((err)=>{
        console.log(err)
        if(!err.statusCode){
            err.statusCode = 500
            err.message= 'Not allowed! Check Headers and Body Again'
        }
        next(err)
    })
}

const addFakeReport = (req, res, next)=>{
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        const error = new Error('Post could not be reported fake')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const description = req.body.description
    const isWitness = req.body.isWitness==='true'?true:false
    const userId = req.query.userId
    const postId = req.query.postId
    let media = []

    new Promise((resolve)=>{
        Array.from(req.files).forEach((file)=>{
            const { buffer, originalname} = file
            const buf = new Buffer.from(buffer)
            fs.writeFile(`./assets/media/${userId + originalname}`, buf, (err)=>{
                if(err){
                    throw err
                }
            })
            const path = `./assets/media/${userId + originalname}`
            media.push(path.toString())
        })
        resolve()
    }).then(()=>{
        const updateDoc = {
            userId:userId,
            media:media,
            description:description,
            isWitness:isWitness
        }

        CrimePost.updateOne({_id:postId}, {$push:{reportedFakePost:updateDoc}}).then((updatedDoc)=>{
            res.status(201).json({message:'Support to Crime Report Added successfully', data:updatedDoc._id})
        })
    }).catch((err)=>{
        console.log(err)
        if(!err.statusCode){
            err.statusCode = 500
            err.message= 'Not allowed! Check Headers and Body Again'
        }
        next(err)
    })
}

const getPost = (req, res, next)=>{
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        const error = new Error('Post could not be fetched')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const postId = req.params.postId

    CrimePost.findById(postId).populate([{path:'userId', select:{profileIcon:1 }}, {path:'verification.verifiedBy.userId', select:{profileIcon:1} }]).then((postDoc)=>{
        res.status(201).json({message:'Crime Post Fetched successfully', data:postDoc})
    }).catch((err)=>{
        console.log(err)
        if(!err.statusCode){
            err.statusCode = 500
            err.message= 'Not allowed! Check Headers and Body Again'
        }
        next(err)
    })
}

const getAllPosts = (req, res, next)=>{
    CrimePost.find({}).populate([{path:'userId', select:{profileIcon:1 }}, {path:'verification.verifiedBy.userId', select:{profileIcon:1} }]).then((result)=>{
        res.status(201).json({message:'Crime Post Fetched successfully', data:result})
    }).catch((err)=>{
        console.log(err)
        if(!err.statusCode){
            err.statusCode = 500
            err.message= 'Not allowed! Check Headers and Body Again'
        }
        next(err)
    })
}

module.exports = {
    registerCrime,
    addSupport,
    addFakeReport,
    getPost,
    getAllPosts
}