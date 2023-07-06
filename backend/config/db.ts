import mongoose from 'mongoose'

mongoose.set('strictQuery', true)

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string)
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(`Error: ${(error as Error).message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
