
let express = require('express');
let app = express();
let port = 9120
let {ObjectId} = require('mongodb');
let bodyParser = require('body-parser');
let cors = require('cors');
let {dbConnect,getData,postData,deleteData,updateData} = require('./Controller/dbController');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res) => {
    res.send("Hiii From Express")
})

app.get('/character', async(req,res) =>{
    let query = {};
    if(req.query.name){
        query = {
            "name":req.query.name

        } 
    }
    let collection = "Character Card";
    let output = await getData(collection,query);
    res.send(output)
});

app.get('/dream', async(req,res) =>{
    let query = {};
    if(req.query.name){
        query = {
            "name":req.query.name

        } 
    }
    let collection = "Dream Card";
    let output = await getData(collection,query);
    res.send(output)
});

app.get('/event', async(req,res) =>{
    let query = {};
    if(req.query.name){
        query = {
            "name":req.query.name

        } 
    }
    let collection = "Event Card";
    let output = await getData(collection,query);
    res.send(output)
});

app.get('/actioning', async(req,res) =>{
    let query = {};
    if(req.query.name){
        query = {
            "name":req.query.name

        } 
    }
    let collection = "Action Card";
    let output = await getData(collection,query);
    res.send(output)
});

app.get('/filter',async(req,res) => {
    let lgaji = Number(req.query.lgaji);
    let hgaji = Number(req.query.hgaji);

   if(lgaji && hgaji){
        query = {
            // "mealTypes.mealtype_id":Number(mealId),
            // $and:[{cost:{$gt:lgaji,$lt:hgaji}}]

            "gaji":{$gt:lgaji,$lt:hgaji}
        }
    }
    else{
        query = {}
    }

    let collection = "restaurants";
    let output = await getData(collection,query);
    res.send(output)
})


app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})