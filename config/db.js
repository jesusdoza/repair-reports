const mongoose = require('mongoose')



const connectDB =  async ()=>{
    try {
        const conn = await mongoose.connect(process.env.connectStr_, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           
        })

        console.log(`mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

module.exports = connectDB;