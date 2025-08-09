const mongoose = require('mongoose');
const shortId = require('shortid');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String, 
        required: true
    }, 
    shortCode : {
        type: String,
        unique: true,
        default: shortId.generate
    }, 
    visitCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Url', urlSchema);