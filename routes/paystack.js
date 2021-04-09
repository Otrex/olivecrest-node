const _ = require('lodash');
const path = require('path');
const request = require('request');
const crypto= require('crypto');
const route = require('express').Router()

// Model
const Donor = require('../http/Models/DonorModel')
const { Project } = require('../http/Models/extras/ProjectModel')

// Error
const PaymentError = require('../services/Exceptions')

// Tools
const {initializePayment, verifyPayment} = require('../providers/paystack')(request);


route.post('/pay/:projectID', (req, res) => {
    const form = _.pick(req.body,['amount','email','full_name']);
    form.metadata = {
        full_name : form.full_name,
        projectID : req.params.projectID
    }
    form.amount *= 100;
    form.reference = crypto.randomBytes(4).toString("hex")
    
    initializePayment(form, (error, body)=>{
        if(error) throw new PaymentError()
        response = JSON.parse(body);
        res.redirect(response.data.authorization_url)
    });
});

route.get('/callback', (req, res) => {
    const ref = req.query.reference;
    verifyPayment(ref, async (error,body)=>{
        if(error) throw new PaymentError()
        response = JSON.parse(body);        

        const data = _.at(response.data, ['reference', 'amount','customer.email', 
                                        'metadata.full_name', 'metadata.projectID']);

        [reference, amount, email, full_name, projectID] =  data;
        
        let project = await Project.findById(projectID) 
        newDonor = {
            reference, 
            amount, email, 
            full_name, 
            project
        }

        const donor = new Donor(newDonor)

        donor.save().then((donor)=>{
            if(!donor) throw new PaymentError()
            res.redirect('/receipt/'+donor._id);
        }).catch((e)=>{
            throw new PaymentError()
        })
    })
});

route.get('/receipt/:id', (req, res)=>{
    const id = req.params.id;
    Donor.findById(id).then(async (donor)=>{
        if(!donor) throw new PaymentError()

        donor.populate('project')
        let project = donor.project

        // Update the Amount on the project
        project.amountDonated  += donor.amount
        project.NoDonators += 1
        project.save()


        let user = await User.findOne({email: donor.email})
        if (user) user.populate('profile')

        new PaymentEvent(donor, req).sendMail()
        res.status(200).json({
        	status:'ok',
            profile : user.profile,
        	donor, 
        })
    }).catch((e)=>{
        throw new PaymentError()
    })
})

// route.get('/error', (req, res)=>{
//     throw new PaymentError();
// })

module.exports = route