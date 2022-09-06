// import packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const logger = require('morgan')
const flash = require('express-flash')
const passport = require('passport')
const session = require('express-session') //enables them to stay logged in 
const MongoStore = require('connect-mongo')
const mongooseDb= require('./config/dbM')

require('dotenv').config(); // to use with enviroment variables initializes enviroment vars

require('./config/passport')(passport)

//database collection connection
// ! const dataBase = require('./modules/database.js');
mongooseDb()
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs'); 
app.use(flash())
app.use(require('./midware/httpsRedirect').httpsRedirect)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true})); //get body data
app.use(logger('dev'))
app.use(express.static('public')) 

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ 
        // mongooseConnection: mongoose.connection 
        mongoUrl: process.env.connectStr_,
        }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())




// routes files
// const repairInfoRoutes = require('./routes/repairInfoRoutes')
const signformRoutes = require('./routes/signformRoutes')
const repairFormRoutes = require('./routes/repairformRoutes')
const repairRoutes = require('./routes/repairRoutes')
const loginRoutes = require('./routes/login')


// =============================================================
// ROUTES
app.use('/', loginRoutes) //todo login route

app.use('/repair', repairRoutes) // '/repair'
// app.use(repairInfoRoutes)
app.use(repairFormRoutes)
app.use(signformRoutes)


app.listen(process.env.PORT || PORT,()=>{
    console.log(`server runing on port ${PORT}`)
})




