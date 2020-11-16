const globalData = {
    //server
    server: {
        host: 'http://localhost:',
        port: 5000, // port starting server
    },
    // conect mongodb
    MDB: {
        oneLink: 'mongodb+srv://ClassTable:741236@testing.eb8wd.mongodb.net/firstInit', // oneLink
        ifOneLink: false, // true if you use oneLink else false || if \/(true) or /\(false)
        link: 'mongodb+srv://testing.eb8wd.mongodb.net', // link 
        dbName: 'firstInit', // name db
        user: 'ClassTable',  // user
        pass: '741236'        // password
    },
    // jsonWebToken
    JWT:{
        secretKey: 'bulhiKeySecret' // private key for token
    },
    TYPE:{
        success: 'success',
        warning: 'warning',
        error: 'error'
    }

}

module.exports = globalData

