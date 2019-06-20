const redis = require('redis');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');


const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.get('MongoURI'),  { useNewUrlParser: true })
.then( () => console.log('Connected to MongoDB.....'));

const client = redis.createClient(config.get('RedisURI'));

// const client = redis.createClient({
//     host:config.get('RedisURI'),
//     port:6379
// });

client.set('visits',0);

app.get('/', (req, res) => {
    client.get('visits', (err, visits)=>{
        res.send(`Hi, there! Visits: ${visits}`);
        client.set('visits',parseInt(visits)+1);
    })
    
});


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
});