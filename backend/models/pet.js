const mongoose = require('mongoose');
const { Schema } = mongoose;

const { Types: { ObjectId } } = Schema;
const petSchema = new Schema({
    adpator: {
        type: ObjectId, 
        required: true,
        ref: 'User',
    },

    pet_name: {
        type: String,
        required: true,
        unique: true,
    },

    role: {
        type: Number,
        required: true,
    },

    birthday: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('Pet', petSchema);
