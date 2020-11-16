const mongoose = require('mongoose')
const GS = require('../../globalData')

const DB = async ()=>{
    const connectInfo = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }
    if (GS.MDB.ifOneLink) {
        const connected = await mongoose.connect(GS.MDB.oneLink, connectInfo)
    } else {
        connectInfo.dbName = GS.MDB.dbName
        connectInfo.user = GS.MDB.user
        connectInfo.pass = GS.MDB.pass
        const connected = await mongoose.connect(GS.MDB.link, connectInfo)
    }
}

module.exports = DB