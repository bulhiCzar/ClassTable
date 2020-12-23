const mongoose = require('mongoose')
const GS = require('../../globalData')

const DB = async () => {
    const connectInfo = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }

    // if (GS.MDB.ifOneLink && !process.env.NODE_ENV) {
    //     const connected = await mongoose.connect(GS.MDB.oneLink, connectInfo)
    // } else {
        console.log('connect prod BD')
        const connected = await mongoose.connect(`mongodb+srv://${GS.MDB.user}:${GS.MDB.pass}@testing.eb8wd.mongodb.net/production`, connectInfo)
    // }
}

module.exports = DB