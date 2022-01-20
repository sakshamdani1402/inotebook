const mongoose= require('mongoose');
const mongoURI= "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connnectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('Mongo connected');
    })
}

module.exports= connnectToMongo;
