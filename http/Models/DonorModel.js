
const mongoose = require('mongoose')
const { Project } = require('./extras/ProjectModel')


const donorSchema = new mongoose.Schema({
    full_name: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    amount: {
        type: Number, 
        required: true,
    },
    project : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    reference: {
        type: String, 
        required: true
    }
});

const Donor = mongoose.model('Donor', donorSchema);

module.exports = {Donor}