const dataNow = ()=>{
    return new Date().toJSON().slice(0,10).split('-').reverse().join('.')
}
module.exports = dataNow