// import modules
const DataBase = require('./modules/database.js');
const RepairEntry = require('./modules/repairLogEntry');
const RepairStep = require('./modules/RepairStep');
const signature = require('./modules/signuploadform')

const express = require('express');

require('dotenv').config(); // to use with enviroment variables initializes enviroment vars
const cors = require('cors');
// const fileUpload = require('express-fileupload');





const app = express();
const PORT = 8000;


// app.use(fileUpload({
//     createParentPath: true
// }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true})); //get body data

app.set('view engine', 'ejs'); // for template
app.use(express.static('public')) //use templates from folder




let dataBase = new DataBase(process.env.connectStr_,'Cata','repair-reports' )
dataBase.connect()


// 
// =============================================================
// ROUTES




//get a specified repair from database
app.get('/repairinfo/:repairId', async (request, response)=>{
    // get paremeter from url
    const repairId = request.params.repairId
    const repairObj = await dataBase.findRepair(repairId)

    console.log(`getting repair for render`,repairObj)
    response.render('repairinfo.ejs',{repair:repairObj})
})






app.get('/', async (request, response)=>{

  
    response.render('index.ejs');

})





// repair form page
app.get('/repairform', async (request, response)=>{

    response.render('repairform.ejs');
})




// repair form page
app.post('/repairform',async (request, response)=>{
   
    try {
        
        let entry = (request.body)
        console.log(`post at /repairform`,entry)

        const result = await dataBase.insertLogEntry(entry)
        response.send(result)


    } catch (error) {
        
    }
  

})

//get signature for upload form
app.get('/signform',async (request, response)=>{
    console.log(`signform get `)
    const sig = signature.signuploadform();
    response.json({
        signature: sig.signature,
        timestamp: sig.timestamp,
        cloudname: process.env.cloud_name,
        apikey: process.env.cloud_key
    })

    
    

})



//ecm logs page
app.get('/ecm-logs', async (request, response)=>{

    response.render('ecm-logs.ejs');
})










app.listen(process.env.PORT || PORT,()=>{
    console.log(`server runing on port ${PORT}`)
})



