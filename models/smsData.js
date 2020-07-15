var mongoose = require('mongoose');

const Schema = mongoose.Schema;

let smsdb = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    city: String,
    start_date: String,
    end_date: String,
    price: String,
    status: String,
    color: String
}, {
    "collection": "smsdb"
});


module.exports = mongoose.model('smsdb', smsdb);