const mongoose=require('mongoose');

//connection string 
const mongoURI="mongodb://127.0.0.1:27017/cms"
//cms is the database name inside that tables are as collection
const connectToMongo=async()=>{
    //to handle the exception we use try and catch
    try{
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB Successfull....")
    }
    catch(error){
        console.log("Could not connect to MongoDB.... try this as URI  - mongodb://127.0.0.1:27017/cms",error);
        console.log("----------------------------------------")
    }
}
module.exports = connectToMongo