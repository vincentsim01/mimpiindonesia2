
let mongo = require('mongodb');
let {MongoClient} = require('mongodb');
const mongoose = require('mongoose');


let mongoUrl = "mongodb+srv://vincentkiathadi:YIfp7gktEi2USAWW@cluster0.nt2oupy.mongodb.net/MimpiIndonesia?retryWrites=true&w=majority";
let mongoUrl2 = process.env.MONGO_URL;

// connect to MimpiIndonesia with Mongoose for AuthController
mongoose.connect(`${mongoUrl}`);

let client = new MongoClient(mongoUrl);


async function dbConnect(){
    await client.connect();
}

let db = client.db('MimpiIndonesia');

async function getData(colName,query){
    let output = [];
    try{
        const cursor = db.collection(colName).find(query);
        for await(const data of cursor){
            output.push(data)
        }
        cursor.closed
    }catch(err){
        output.push({"Error":"Error in getting data"})
    }
    return output
}

async function postData(colName,data){
    let output;
    try{
        output = await db.collection(colName).insertOne(data);
    }catch(err){
        output = {"response":"Error in post data"}
    }
    return output
}

async function updateData(colName,condition,data){
    let output;
    try{
        output = await db.collection(colName).updateOne(condition,data);
    }catch(err){
        output = {"response":"Error in post data"}
    }
}
  
module.exports = {
    dbConnect,
    getData,
    postData
    // ascendRating
    // sortData
}