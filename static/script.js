const btnRegister = document.querySelectorAll('.btn-register')
const btnLogin = document.querySelectorAll('.btn-login')
const btnAdd = document.querySelector('.btn-add')


const btns = document.querySelectorAll('.btn')
const inputEmail = document.querySelector('#email')
const inputLogin = document.querySelector('#login')
const inputEmailF = document.querySelector('#emailF')
const inputLoginF = document.querySelector('#loginF')
const registerlogin = document.querySelector('.register__login')

const login = 'b' + Date.now()
// registerlogin.innerText = login

// fetch(`https://api.ipify.org/?format=json`)
//     .then(r=>r.json())
//     .then(console.log)

const ip = 'fgfd'
let token


const click = async (e) => {
    const el = e.target

    const data = {
        password: '741236',
        ip
    }

    if (el.dataset.info === 'teacher'){
        data.login = inputLogin.value
        data.email = inputEmail.value
        data.role = true
    }else if(el.dataset.info === 'student'){
        data.login = inputLoginF.value
        data.email = inputEmailF.value
        data.role = false
        data.teacher = 'bulhi'
    }

    console.log(data)


    const respons = await fetch(`/api/${el.dataset.link}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    // console.log(respons)
    const res = await respons.json()
    if (res.tokenAuth) {
        token = res.tokenAuth
        // console.log(token)
    }
    console.log(res)
}

btnRegister.forEach((btn)=>{
    btn.addEventListener('click', (e) => {click(e)})
})


btnLogin.forEach((btn)=>{
    btn.addEventListener('click', (e) => {click(e)})
})

// btnLogin.addEventListener('click', (e) => {
//     click(e)
// })

btnAdd.addEventListener('click', async (e) => {
    const el = e.target
    const data = {
        less: 'sdfsdfsdf'
    }

    const respons = await fetch(`/api/${el.dataset.link}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bear ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    const res = await respons.json()
    console.log(res)
})


const inputs = document.querySelectorAll('.bulhi')
let state = []

inputs.forEach( async (input)=>{
    input.addEventListener('keydown', (e) => {

        state[e.target.name] = e.target.value

        // [state.e.target.name] = e.target.value

        console.log(state)
    })
    }
)