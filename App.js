
let express = require('express');
let app = express();
let port = 9120
let {ObjectId} = require('mongodb');
let bodyParser = require('body-parser');
let cors = require('cors');
let {dbConnect,getData,postData,deleteData,updateData} = require('./Controller/dbController');

app.get('/',(req,res) => {
    res.send("Hiii From Express")
})

app.get('/character', async(req,res) =>{
    let query = {};
    let collection = "Character Card";
    let output = await getData(collection,query);
    res.send(output)
});


app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})