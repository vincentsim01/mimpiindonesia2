
let express = require('express');
let app = express();
let port = 9120
const dotenv = require('dotenv');
dotenv.config();
let {ObjectId} = require('mongodb');
let bodyParser = require('body-parser');
let cors = require('cors');
let {dbConnect,getData,postData,deleteData,updateData} = require('./Controller/dbController');
const AuthController = require('./Controller/authController');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/auth', AuthController);

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

app.get('/orders',async(req,res) => {
    let query = {}
    let collection = "orders";
    if(req.query.email){
        query = {email:req.query.email}
    }
    let output = await getData(collection,query);
    res.send(output)
})

app.get('/favcard',async(req,res) => {
    let query = {}
    let collection = "favcard";
    if(req.query.email){
        query = {email:req.query.email}
    }
    let output = await getData(collection,query);
    res.send(output)
})


app.get('/actionfilter', async(req,res) =>{
    let theactionphase = req.query.phase;
    let theactionduration = req.query.duration;
    let query = {};
    if(theactionphase && theactionduration){
        query = {
            "phase": theactionphase,
            "duration": theactionduration
        } 
    }else if(theactionphase){
        query = {
            "phase": theactionphase
        } 
    }
    else if(theactionduration){
        query = {
            "duration": theactionduration
        } 
    }
    else {
        let query = {};
    }
    let collection = "Action Card";
    let output = await getData(collection,query);
    res.send(output)
});


app.get('/dreamfilter',async(req,res) => {
    let character = req.query.character;


   if(character){
        query = {
            // "mealTypes.mealtype_id":Number(mealId),
            // $and:[{cost:{$gt:lgaji,$lt:hgaji}}]

            "character": character
        }
    }
    else{
        query = {}
    }

    let collection = "Dream Card";
    let output = await getData(collection,query);
    res.send(output)
})


app.get('/eventfilter',async(req,res) => {
    let eventtype = req.query.type;


   if(eventtype){
        query = {
            // "mealTypes.mealtype_id":Number(mealId),
            // $and:[{cost:{$gt:lgaji,$lt:hgaji}}]

            "type": eventtype
        }
    }
    else{
        query = {}
    }

    let collection = "Event Card";
    let output = await getData(collection,query);
    res.send(output)
})


app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})