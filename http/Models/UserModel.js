
const randomstring = require("randomstring");
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const Profile = require('./ProfileModel')
const Role = require('./extras/RoleModel')
const Wallet = require('./WalletModel')

// Plugins
const timestamp = require('./plugins/timestamp')
const populate = require('./plugins/populate')


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique : true,
    },
    password: {
        type: String,
        required: true
    },
    passwordResetToken:{
        type: String
    },
    passwordResetExpires:{
        type: String
    },
    verificationCode:{
        type: String
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    verificationCodeExpires:{
        type: String, default: Date
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet'
    },
    active: {
        type: Boolean,
        default: false
    }
})

// a query / find middleware that finds all active users
// userSchema.pre(/^find/, function(next){
//     this.find({active: {$ne: false}})
//     next()
// })

userSchema.plugin(timestamp)
userSchema.plugin(populate(['role']))

userSchema.methods.updateProfile = async function(data, cb){
    let profile = {}
    try {
        profile = await Profile.findOneAndUpdate({_id: this.profile}, {'$set': data })
        console.log(profile)
    } catch (err) {
        if (err) console.log(err)
    }
    return profile;
}

// generate jwt token
userSchema.methods.signinToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

// bcrypt password encryption/ hashing
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})


// compare bcrypt hashed passwords
userSchema.methods.comparePassword = async function(userPassword, dbPassword){
    return await bcrypt.compare(userPassword, dbPassword)
}

// check if password has been changed before or after issuing JWTtimestamp
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp= parseInt(this.passwordChangedAt.getTime()/100, 10)
        console.log(this.passwordChangedAt, JWTTimestamp)
        return JWTTimestamp < changedTimestamp;
    }

    return false
}

// creating the password reset token using the schema
userSchema.methods.createPasswordResetToken = function(){
    
    this.passwordResetToken= randomstring.generate(7);

    this.passwordResetExpires= moment().add(1, "hours").format();
}


const userModel= mongoose.model('User', userSchema)

module.exports= userModel;