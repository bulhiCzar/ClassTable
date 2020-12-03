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
        connectInfo.dbName = 'production'
        connectInfo.user = GS.MDB.user
        connectInfo.pass = GS.MDB.pass
        const connected = await mongoose.connect(GS.MDB.link, connectInfo)
    }
}

module.exports = DB