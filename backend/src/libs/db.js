import mongoose from 'mongoose'

const connectDb = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('mognodb is connected', conn.connection.host);
        
    } catch (error) {
        console.log("errors", error);
        process.exit(1)//1exits
        
    }
}

export default connectDb