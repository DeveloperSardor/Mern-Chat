const mongoose = require('mongoose')



const connectDb = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDb connected');
    } catch (error) {
        console.log (`Error: ${error.message}`)
        process.exit();
    }
}


module.exports = connectDb;