const mongoose = require('mongoose');
const { Schema } = mongoose;

const user_schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    user_id: {
        type: String,
        required: true,
        unique: true,
    },

    hashed_password: {
        type: String,
        required: true,
        unique: true,
    },

    first_name: {
        type: String,
        required: true,
        unique: true,
    },

    last_name: {
        type: String,
        required: true,
        unique: true,
    },

    role: {
        type: Number,
        required: true,
    },

    matches: {
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


module.exports = mongoose.model('User', user_schema);
