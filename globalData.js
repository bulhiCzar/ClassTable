const globalData = {
    //server
    server: {
        host: 'http://localhost:',
        port: 5000, // port starting server
        url: 'https://classtable.herokuapp.com', // url hosthost
        // url: 'http://localhost:3000', // url hosthost
    },
    // conect mongodb
    MDB: {
        oneLink: 'mongodb+srv://ClassTable:741236@testing.eb8wd.mongodb.net/firstInit', // oneLink
        ifOneLink: true, // true if you use oneLink else false || if \/(false) or /\(true)
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

