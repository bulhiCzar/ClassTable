const btnRegister = document.querySelector('.btn-register')
const btnLogin = document.querySelector('.btn-login')
const btnAdd = document.querySelector('.btn-add')


const btns = document.querySelectorAll('.btn')
const inputEmail = document.querySelector('#email')
const inputLogin = document.querySelector('#login')
const registerlogin = document.querySelector('.register__login')

const login = 'b' + Date.now()
// registerlogin.innerText = login

// fetch(`https://api.ipify.org/?format=json`)
//     .then(r=>r.json())
//     .then(console.log)

const ip = 'fgfd'
let token


const click = async (e) => {
    // console.log()
    const el = e.target

    const data = {
        login: inputLogin.value,
        email: inputEmail.value,
        password: '741236',
        // role: true,
        role: false,
        teacher: 'bulhi',
        ip
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


btnRegister.addEventListener('click', (e) => {
    click(e)
})
btnLogin.addEventListener('click', (e) => {
    click(e)
})

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