const mongoose = require('mongoose')


// Event
const CostAttainedEvent = require('../../Events/CostAttainedEvent')


// Role Schema
const ProjectSchema = new mongoose.Schema({ 
    name : {
        type: String,
        required: false,
        default: null,
    },
    isApproved: {
        type: Boolean,
        required: false
    },
    creatorsMetaData: {
        type: String,
        required: false,
        default: null
    },
    canceled : {
        type : Boolean,
        default : false
    },
    NoDonators : {
        type : Number,
        default : 0
    },
    amountDonated : {
        type : Number,
        default : 0
    },
    description : {
        type: String,
    },
    cost : {
        type : Number,
        required: true
    }
}); 

ProjectSchema.pre('save', async function(next){
    if (this.amountDonated >= this.cost ) await new CostAttainedEvent(this).sendMail();
    next();
})

const Project = mongoose.model('Project', ProjectSchema)


module.exports = Project