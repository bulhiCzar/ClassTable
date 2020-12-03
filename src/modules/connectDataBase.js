const mongoose = require('mongoose')
const GS = require('../../globalData')

const DB = async () => {
    const connectInfo = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }

    if (GS.MDB.ifOneLink && !process.env.NODE_ENV) {
        console.log('run dev')
        const connected = await mongoose.connect(GS.MDB.oneLink, connectInfo)
    } else {
        console.log('run product')
        // connectInfo.dbName = 'production'
        // connectInfo.user = GS.MDB.user
        // connectInfo.pass = GS.MDB.pass
        const connected = await mongoose.connect(`mongodb+srv://${GS.MDB.user}:${GS.MDB.pass}@testing.eb8wd.mongodb.net/production`, connectInfo)
    }
}

module.exports = DB