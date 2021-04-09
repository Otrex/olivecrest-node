
const mongoose = require('mongoose')

// Role Schema
const RoleSchema = new mongoose.Schema({ 
    admin : {
        type: Boolean,
        required: false
    },
}); 

const Role = mongoose.model('Role', RoleSchema)


module.exports = Role