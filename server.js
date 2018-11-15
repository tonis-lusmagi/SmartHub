const express = require('express');
const path = require('path');

const LikeSaver = require('./serverjs/LikeSaver');

const app = express();
const port = 3000;

let saver = new LikeSaver();

app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));
app.use('/img', express.static(path.join(__dirname, 'img')));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));


app.post('/like', (req, res) => {

    let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

    let ua = req.get('User-Agent');

    console.log('received like');

    saver.writeToDb(ip + ua);

    let obj = {
        count: saver.count
    };

    res.send(JSON.stringify(obj));
});


app.get('/likecount', (req, res) => {

    let obj = {
        count: saver.count
    };

    res.send(JSON.stringify(obj));
});


app.listen(port, () => console.log(`SmartHub app listening on port ${port}!`))