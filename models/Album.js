const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const albumSchema = new Schema({
    imageURL: String,
    albumTitle: String,
    description: String,
    date: String,
    id: String
}
)

const Album = mongoose.model("ALbum", albumSchema);

module.exports = Album;