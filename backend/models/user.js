const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userCollection: {
        type: Array,
        default: []
    },
    cart: [{
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'carts'
        },
    }]
}, {
    timestamps: true,
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
