const GD = ()=>{
    const state =  {
        SERVER: {
            url: 'https://classtable.herokuapp.com',
            // url: 'http://localhost:5000'
        },
        LEARN: {
            themes: [
                {value: 'HTML&CSS', label: 'HTML&CSS', price: 800},
                {value: 'JavaScript', label: 'JavaScript', price: 900},
                {value: 'React&NodeJS', label: 'React&NodeJS', price: 1000},
            ]
        },
    }
    return {state}
}
export default GD