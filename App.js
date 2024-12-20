
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


app.get('/trivia', async(req,res) =>{
    let query = {};
    if(req.query.name){
        query = {
            "name":req.query.name

        } 
    }
    let collection = "Trivia Card";
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


app.get('/triviafilter', async(req,res) =>{
    let thecategory = req.query.kategori;
    let thename = req.query.name;
    let theprice = Number(req.query.Harga);
    let query = {};
    if(thecategory && theprice && thename){
        query = {
            "kategori": thecategory,
            "Harga": theprice,
            "name": thename
        } 
    }else if(thecategory){
        query = {
            "kategori": thecategory
        } 
    }
    else if(theprice){
        query = {
            "Harga": theprice
        } 
    }
    else if(thename){
        query = {
            "name": thename
        } 
    }
    else {
        let query = {};
    }
    let collection = "Trivia Card";
    let output = await getData(collection,query);
    res.send(output)
});

app.get('/dreamfilter',async(req,res) => {
    let character = req.query.character;
    let theharga = req.query.theharga;


   if(character){
        query = {
            // "mealTypes.mealtype_id":Number(mealId),
            // $and:[{cost:{$gt:lgaji,$lt:hgaji}}]
            "character": character
        }
    }else if(theharga){
        query = {
            "Harga":Number(theharga)
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


app.get('/eventdetail1/:eventname',async(req,res) => {
    let cardName = req.params.eventname;
    if(cardName){
        query = {
            "id":cardName

        }
    } else{
        query = {}
    }

    let collection = "Event Card";
    let output = await getData(collection,query);
    res.send(output)
})

app.get('/eventdetail2/:eventId',async(req,res) => {
    let cardId = Number(req.params.eventId);

    if(cardId){
        query = {
            "id2":Number(cardId)
        }
    } else{
        query = {}
    }
    let collection = "Event Card";
    let output = await getData(collection,query);
    res.send(output)
})


app.get('/moneydetail/:moneyId', async(req,res)=>{
    let cardId=Number(req.params.moneyId);

    if (cardId){
        query = {
            "id2": Number(cardId)
        }
    }else{
        query={}
    }


    let collection = "Money";
    let output = await getData(collection,query);
    res.send(output)
})



app.get('/triviadetail/:triviaId', async(req,res)=>{
    let cardId=Number(req.params.triviaId);

    if (cardId){
        query = {
            "id2": Number(cardId)
        }
    }else{
        query={}
    }


    let collection = "Trivia Card";
    let output = await getData(collection,query);
    res.send(output)
})

app.get('/actiondetail/:actionId', async(req,res)=>{
    let cardId=Number(req.params.actionId);

    if (cardId){
        query = {
            "id2": Number(cardId)
        }
    }else{
        query={}
    }


    let collection = "Action Card";
    let output = await getData(collection,query);
    res.send(output)
})

app.get('/characterdetail/:characterId', async(req,res)=>{
    let cardId=Number(req.params.characterId);

    if (cardId){
        query = {
            "id2": Number(cardId)
        }
    }else{
        query={}
    }


    let collection = "Character Card";
    let output = await getData(collection,query);
    res.send(output)
})


app.get('/dreamDetail/:dreamId', async(req,res)=>{
    let cardId=Number(req.params.dreamId);

    if (cardId){
        query = {
            "id2": Number(cardId)
        }
    }else{
        query={}
    }


    let collection = "Dream Card";
    let output = await getData(collection,query);
    res.send(output)
})
app.post('/pickfavcard',async(req,res) => {
    let body = req.body;
    let collection = 'favcard';
    let response = await postData(collection,body);
    res.send(response)
})

app.post('/contactus', async(req,res)=>{
    let body = req.body;
    let collection = 'Contact Us';
    let response = await postData(collection,body);
    res.send(response);
})

app.post('/subscriber', async(req,res)=>{
    let body = req.body;
    let collection = 'Subscriber';
    let response = await postData(collection,body);
    res.send(response);
})

app.post('/fanletter', async(req,res)=>{
    let body = req.body;
    let collection = 'fanletter';
    let response = await postData(collection,body);
    res.send(response);
})


app.post('/submitcardreview', async(req,res)=>{
    let body = req.body;
    let collection = 'cardreview';
    let response = await postData(collection,body);
    res.send(response);
})

app.get('/cardreview/:cardId', async(req,res)=>{
    let cardId=req.params.cardId;

    if (cardId){
        query = {
            "cardname": cardId
        }
    }else{
        query={}
    }


    let collection = "cardreview";
    let output = await getData(collection,query);
    res.send(output)
})


app.get('/wordofwisdom', async(req,res) =>{
    let query = {};
    if(req.query.name){
        query = {
            "name":Number(req.query.name)

        } 
    }
    let collection = "Wordofwisdom";
    let output = await getData(collection,query);
    res.send(output)
});


app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})