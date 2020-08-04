const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const randomInt = require('random-int');
const randomCoordinates = require('random-coordinates');

const Device = require(`./models/device`);

const app = express();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true});

//Cross-Origin Request Headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    client.subscribe(`/sensorData`, err =>{
        if (!err) {
            console.log('connected');
        }
    });
});


client.on('message', (topic, message) => {
    if (topic == '/sensorData') {
        //message formatting  '{"deviceId": "Samsung Galaxy S9", "ts": "191239219", "temp": 20, "loc": { "lat": -37.31231, "lon": 152.123123 }}'
        const data = JSON.parse(message);
        console.log(data);

        //Find Requested Device in DB
        Device.findOne({name: data.deviceId}, (err, device) => {
            if (err) {
                console.log(err);
            }
            //console.log(device)

            const { sensorData } = device;
            const { ts, temp, loc } = data;
            
            //Appends the sensorData from the message
            sensorData.push({ ts, temp, loc }); 
            device.sensorData = sensorData;
            
            //Saves the data to the device
            device.save(err => {
                if (err) {
                    console.log(err)
                }
            });
        });
    }
});

const topic = '/219191105/test/hello'
const msg = 'Hello MQTT World!';

client.publish(topic, msg, () => {
    console.log("Message Sent");
});

app.post('/send-command', (req, res) => {
    const { deviceId, command } = req.body;
    const topic = `/219191105/command/${deviceId}`;
    
    client.publish(topic, command, () => {
        res.send("published new message");
    });
});

/**
* @api {put} /sensor-data Append (random) Sensor-Data
* @apiGroup Device
* @apiParam {String} deviceId Name of Device
* @apiSuccessExample Success-Response:
* published new message
* @apiErrorExample Error-Response:
* N/A
*/
app.put('/sensor-data', (req, res) => {
    const { deviceId } = req.body;

    //Generates random values for (loc, ts, temp)
    const [lat, lon] = randomCoordinates().split(", ");
    const ts = new Date().getTime();
    const loc = { lat, lon };
    const temp = randomInt(20, 50);

    const topic = `/sensorData`;
    const message = JSON.stringify({ deviceId, ts, loc, temp });

    //Sends the message under the mqtt topic /sensorData
    client.publish(topic, message, () => {
        res.send('published new message');
    });
});
    
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
