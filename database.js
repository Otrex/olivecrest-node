const mongoose = require('mongoose');
const { DBError } = require('./services/Exceptions');

const connect = () => {
    // insert the password into the db link
    const DB = process.env.DB_URI.replace('<password>', process.env.DB_PASSWORD)
                .replace('<username>', process.env.DB_USERNAME)
                .replace('<dbname>', process.env.DB_NAME)

    mongoose.connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }).then((conn)=>{
        console.log(`::MONGODB CONNECTED :: @${conn.connection.host}`)
    }).catch((err)=>{
        new DBError(`DATABASE CONNECTION FAILED`, ()=>{process.exit(1)})
    })
}


module.exports = { connect };