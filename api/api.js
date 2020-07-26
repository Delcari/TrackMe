const express = require('express');
const mongoose = require('mongoose');

//Device Model (MONGODB)
const Device = require(`./models/device`);
//User Model (MONGODB)
const User = require(`./models/user`);


mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true});

const port = process.env.PORT || 5000;

const app = express();

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

//Authenticate the user
app.post('/api/authenticate', (req, res) => {
    const { user, password } = req.body;
    
    //Search the db for the username
    User.findOne({ name: user }, (err, data) => {
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

//Register a User
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

//Gets the list of the users devices
app.get('/api/users/:user/devices', (req, res) => {
    const { user } = req.params;
    Device.find({ "user": user }, (err, devices) => {
        err
        ? res.send(err)
        : res.send(devices)
    })
})

//Gets the device sensor data
app.get('/api/devices/:deviceId/device-history', (req, res) => {
    const { deviceId } = req.params;
    Device.findOne({"_id": deviceId }, (err, devices) => {
        const { sensorData } = devices;
        err
        ? res.send(err)
        : res.send(sensorData);
    });
});

//Post Request (Add new device)
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

//Post Request (Send Command)
app.post('/api/send-command', (req, res) => {
    console.log(req.body);
})


//Get Request (Test)
app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});

//Get Request (Send Devices)
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

