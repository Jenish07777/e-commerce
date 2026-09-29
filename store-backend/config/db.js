import mongoose from "mongoose"

const connectDB = async()=> {
  try{
  console.log ("connecting database....")
  const connection= await mongoose.connect(process.env.MONGO_URI) //process.env le import garirako // kina ki env js hoina so export defult garne mildaina
  console.log ("successfully connected to database")
  }
  catch (error){
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
  finally {
    console.log("Running")
  }
}
export default connectDB