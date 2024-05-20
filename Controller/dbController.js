let mongo = require('mongodb');
let {MongoClient} = require('mongodb');
let mongoUrl = "mongodb+srv://vincentkiathadi:YIfp7gktEi2USAWW@cluster0.nt2oupy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;
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
    return output
}

async function deleteData(colName,condition,){
    let output;
    try{
        output = await db.collection(colName).deleteOne(condition);
    }catch(err){
        output = {"response":"Error in post data"}
    }
    return output
}


module.exports = {
    dbConnect,
    getData,
    postData,
    updateData,
    deleteData
}