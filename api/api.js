const express = require('express');
const mongoose = require('mongoose');

const Device = require(`./models/device`);

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true});


const app = express();
const port = process.env.PORT || 5000;

app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});


app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
        return err  
            ? res.send(err)
            : res.send(devices);
    });
});

app.listen(port, () =>
{
    console.log(`listening on port ${port}`);
});

