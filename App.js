
let express = require('express');
let app = express();
let port = 9120
let {ObjectId} = require('mongodb');
let bodyParser = require('body-parser');
let cors = require('cors');

app.get('/',(req,res) => {
    res.send("Hiii From Express")
})


app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})