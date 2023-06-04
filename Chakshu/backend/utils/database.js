const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

const ATLAS_URI = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_CLUSTER_NAME}.8wktiye.mongodb.net/${process.env.ATLAS_DBNAME}`

mongoose.set('strictQuery', true)
mongoose.set('strictPopulate', false)

const connectDB = ()=>{
    mongoose.connect(uri=ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
        console.log('Database Successfully Connected!')
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = {
    connectDB
}