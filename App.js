
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


app.get('/money', async(req,res) =>{
    let query = {};
    if(req.query.name){
        query = {
            "name":Number(req.query.name)

        } 
    }
    let collection = "Money";
    let output = await getData(collection,query);
    res.send(output)
});


app.get('/cardcategory/', async(req,res) =>{
    let query = {};

    let collection = "Card Category";
    let output = await getData(collection,query);
    res.send(output)
});

app.get('/categoryfilter/:CategoryId', async(req,res) =>{
    // let query = {};
    if(req.params.CategoryId){
        query = {
            "id": Number(req.params.CategoryId),

        } 
    }else {
        let query = {};
    }
    let collection = "Card Category";
    let output = await getData(collection,query);
    res.send(output)
});


app.get('/dreamfilter',async(req,res) => {
    let name = req.query.name;


   if(name){
        query = {
            // "mealTypes.mealtype_id":Number(mealId),
            // $and:[{cost:{$gt:lgaji,$lt:hgaji}}]

            "name": name;
        }
    }
    else{
        query = {}
    }

    let collection = "Dream Card";
    let output = await getData(collection,query);
    res.send(output)
})


app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})