
const mongoose = require('mongoose')

// Role Schema
const TokenSchema = new mongoose.Schema({ 
    user_id : {
        type: String,
        required: false
    },

    token : {
    	type: Number
    }
}); 

const Token = mongoose.model('Token', TokenSchema)

module.exports = Token