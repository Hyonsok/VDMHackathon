const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        unique: true,
    },

    first_name: {
        type: String,
        required: true,
        unique: true,
    },

    lastName: {
        type: String,
        required: true,
        unique: true,
    },

    role: {
        type: Number,
        required: true,
    },

    Matches: {
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


module.exports = mongoose.model('User', userSchema);
