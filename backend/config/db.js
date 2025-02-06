import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

export const connectDb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1) //process code 1 means failure and 0 means success
    }
}