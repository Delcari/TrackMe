const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Device = require(`./models/device`);

const app = express();

mongoose.connect('mongodb+srv://riley:Nicholas17@trackme.xciqt.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology:true});

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
        //formatting '{"message": "wow"}'
        const data = JSON.parse(message);
        console.log(data);

        Device.findOne({user: "bob"}, (err, device) => {
            if (err) {
                console.log(err);
            }
            
            const { sensorData } = device;
            const { ts, loc, temp } = data;

            sensorData.push({ ts, loc, temp });
            device.sensorData = sensorData;

            device.save(err => {
                if (err) {
                    console.log(err);
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
    
    
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
