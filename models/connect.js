const mongoose = require('mongoose')


const connectDB = async () => {
    try { 
        await mongoose.connect(process.env.DATABASE_URL,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify:false
            })
    }
    catch (err) {
        console.log(err)
    }
}

module.exports=connectDB