const mongoose = require('mongoose')
const GS = require('../../globalData')

const DB = async () => {
    const connectInfo = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }
    // console.log()
    console.log(process.env)
    if (GS.MDB.ifOneLink) {
        const connected = await mongoose.connect(GS.MDB.oneLink, connectInfo)
    } else {
        console.log('run product')
        if (process.env === 'production') {
            connectInfo.dbName = GS.MDB.dbName
        } else {
            connectInfo.dbName = 'production'
        }
        
        connectInfo.user = GS.MDB.user
        connectInfo.pass = GS.MDB.pass
        const connected = await mongoose.connect(GS.MDB.link, connectInfo)
    }
}

module.exports = DB