const express = require('express');
const mongoose = require('mongoose');


//Device Model (MONGODB)
const Device = require(`./models/device`);
//User Model (MONGODB)
const User = require(`./models/user`);


mongoose.connect('mongodb+srv://riley:Nicholas17@trackme.xciqt.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology:true});

const port = 5000;

const app = express();

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req,res) => {
    res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

//Body Parser Setup
const bodyParser = require('body-parser');
const user = require('./models/user');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Cross-Origin Request Headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/**
* @api {post} /api/registration Authenticate user
* @apiGroup User
* @apiParam {String} user Username
* @apiParam {String} password Password
* @apiSuccessExample {json} Success-Response:
*{
*    "success": true,
*    "message": "Authenticated successfully",
*    "isAdmin": null
*}
* @apiErrorExample Error-Response:
* Password does not match
*/
app.post('/api/authenticate', (req, res) => {
    const { user, password } = req.body;
    
    //Search the db for the username
    User.findOne({ name: user }, function(err, data) {
        //Handle the response
        if (err)
            res.send(err);
        else if (!data)
            res.send('Username not found');
        else if (data.password == password)
            res.send({
                success: true,
                message: 'Authenticated successfully',
                isAdmin: data.isAdmin
            }) 
        else
            res.send('Password does not match')
    });
});

/**
* @api {post} /api/registration Register user
* @apiGroup User
* @apiParam {String} user Username
* @apiParam {String} password Password
* @apiParam {Boolean} [isAdmin] Administrator
* @apiSuccessExample {json} Success-Response:
*{
*    "success": true,
*    "message": "Created new user"
*}
* @apiErrorExample Error-Response:
* N/A    
*/
app.post('/api/registration', (req, res) => {
    const { user, password, isAdmin } = req.body;
    
    const newUser = new User({
        name: user,
        password,
        isAdmin
    });
    
    //Saves the newUser to the db
    newUser.save(err => {
        err
        ? res.send(err)
        : res.json({
            success: true,
            message: 'Created new user'
        });
    });
});

/**
* @api {post} /api/users/:user/devices List of users devices
* @apiGroup User
* @apiParam {String} user username
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "sensorData": [
*            {
*                "ts": "1529545935",
*                "temp": 14,
*                "loc": {
*                    "lat": -37.839587,
*                    "lon": 145.101386
*                }
*            }
*        ],
*        "_id": "5f156205a417664b736008cb",
*        "name": "Bob's Samsung Galaxy",
*        "user": "bob",
*        "id": "4"
*    }
*]
* @apiErrorExample Error-Response:
* N/A    
*/
app.get('/api/users/:user/devices', (req, res) => {
    const { user } = req.params;
    Device.find({ "user": user }, (err, devices) => {
        err
        ? res.send(err)
        : res.send(devices)
    })
})

/**
* @api {get} /api/devices/:deviceId/device-history Device history
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "ts": "1529545935",
*        "temp": 14,
*        "loc": {
*            "lat": -37.839587,
*            "lon": 145.101386
*        }
*    }
*]
* @apiErrorExample Error-Response:
* N/A    
*/
app.get('/api/devices/:deviceId/device-history', (req, res) => {
    const { deviceId } = req.params;
    Device.findOne({"_id": deviceId }, (err, devices) => {
        const { sensorData } = devices;
        err
        ? res.send(err)
        : res.send(sensorData);
    });
});

/**
* @api {post} /api/devices Create new device
* @apiGroup Device
* @apiParam {String} name name of the device
* @apiParam {String} user username
* @apiParam {Object} [sensorData] Data from the Sensor
* @apiSuccessExample Success-Response:
* Successfully added device and data
* @apiErrorExample Error-Response:
* N/A    
*/
app.post('/api/devices', (req, res) => {
    const { name, user, sensorData } = req.body;
    const newDevice = new Device({
        name,
        user,
        sensorData
    });
    newDevice.save(err => {
        err 
        ? res.send(err)
        : res.send("Successfully added device and data");
    })
});

/**
* @api {post} /api/send-command Send Command to Device (WIP)
* @apiGroup Device
* @apiParam {String} command Command you wish to send
* @apiSuccessExample Success-Response:
* Console -> 'Turn on light'
*/
app.post('/api/send-command', (req, res) => {
    console.log(req.body);
})

/**
* @api {get} /api/test Checking if the API is Live
* @apiGroup Test
* @apiSuccessExample Success-Response:
* The API is Working
*/
app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});

/**
* @api {get} /api/devices AllDevices An array of all devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*[
*   {
*       "_id": "dsohsdohsdofhsofhosfhsofh",      
*       "name": "Mary's iPhone",      
*       "user": "mary",     
*       "sensorData": [        
*           {          
*               "ts": "1529542230",
*               "temp": 12,          
*               "loc": {          
*                   "lat": -37.84674,
*                   "lon": 145.115113
*               }        
*           },        
*           {          
*                   "ts": "1529572230",
*                   "temp": 17,         
*                   "loc": {         
*                       "lat": -37.850026,      
*                       "lon": 145.117683      
*                   }        
*               }     
*           ]    
*       }  
*   ]
* @apiErrorExample {json} Error-Response:
*   {    
*       "User does not exist"
*   }
*/
app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
        err  
        ? res.send(err)
        : res.send(devices)
    });
});


app.listen(port, () =>
{
    console.log(`listening on port ${port}`);
});

