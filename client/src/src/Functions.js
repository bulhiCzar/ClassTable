
export default class Functions {
    static htmlDecode(text){
        let el = document.createElement('textarea');
        el.innerHTML = text;
        // handle case of empty input
        return el.childNodes.length === 0 ? "" : el.childNodes[0].nodeValue;
    }

    static ParsDateYYYYMMDD(num){
        return new Date(num).toJSON().slice(0,10).split('-').reverse().join('.')
    }

    static ParsDate(num){
        const date = new Date(num).toJSON().slice(0, 10).replace(':', '-').split('-').reverse().join('.').slice(0, 5)
        // const time = new Date(num).toJSON().slice(11, 16)
        // const date = new Date(num).toString().slice(8, 11).replaceAt(0, '', 0)
        const time = new Date(num).toString().slice(16, 21)
        // setDateCarrying(Date.parse(e._d))
        // setTime(time)
        // setDate(date)
        return {date, time}
    }


}


// export const Functions = {
//     htmlDecode(text){
//         let el = document.createElement('textarea');
//         el.innerHTML = text;
//         // handle case of empty input
//         return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
//     }
// }