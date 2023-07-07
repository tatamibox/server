const catchAsync = require('./utils/catchAsync');
const express = require('express');
const app = express();
require('dotenv').config()
const Album = require('./models/Album');
const PORT = process.env.PORT || 3001
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose')
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Mongo connection open')

    })
    .catch(err => {
        console.log("oh no, Mongo error", err)
    })



app.listen(PORT, () => {
    console.log('Server listening on port 3001')
})


app.post('/uploadAlbum', catchAsync(async (req, res) => {
    const { imageURL, albumTitle, description, date, id } = req.body;
    const currentAlbum = new Album({ imageURL: imageURL, albumTitle: albumTitle, description: description, date: date, id: id })
    await currentAlbum.save();
}))

app.post('/latestAlbums', catchAsync(async (req, res) => {
    const { albumCounter } = req.body;
    const albums = await Album.find({});
    const sortedAlbums = albums.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date)
    }).splice(0, albumCounter)

    res.json(sortedAlbums)

}))

app.post('/getAlbum', catchASync(async (req, res) => {

    const { id } = req.body;
    const currentAlbum = await Album.findOne({ id: id });
    res.json(currentAlbum)

}))
