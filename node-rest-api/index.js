const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const dbConfig = require('./config/database.config.js');
const cors = require('cors');
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());

// Connect to the database
setTimeout(()=>{
    console.log('Establishing connection with database.Please wait......');
},5000);

setTimeout(()=>
mongoose.connect(dbConfig.url, {
    useNewUrlParser: false
}).then(() => {
    console.log("Successfully connected to the database.....");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
}),8000);

//Default Route >>
router.get('/',(req,res,next) =>{
    res.status(200).json({
        message: 'Handling NODE REST API request for EagleAccess'
    })
});

//Register router object
app.use('/',router);

//Import Routes
require('./app/routes/employee.routes.js')(app);
require('./app/routes/odc.routes.js')(app);
require('./app/routes/request.routes.js')(app);

app.listen(port,()=>{console.log(`Server Up and Running on port ${port}...`)});




