import s from './BlockContentItem.module.css'
import {useState} from 'react'
import {useHttp} from '../../../hooks/http.hooks'
import {useToast} from '../../../hooks/toast.hooks'

const BlockContentItem = (props) => {
    const [role, setRole]  = useState(false)
    const [input, setInput] = useState({
        login: '', password: '', email: '', teacher: ''
    })
    const {request} = useHttp()
    const {setToast} = useToast()

    const handlerInput = (e)=>{
        console.log(e.target.name)
        setInput({...input, [e.target.name]: e.target.value})
        console.log(input)
    }


    const sendAuth = async (e)=>{
        e.preventDefault()
        let user = {login: input.login, password: input.password,}

        if (e.target.dataset.info === 'login'){
            const res = await request('https://classtable.herokuapp.com/api/auth/login', 'POST', user)
            setToast(res)

        }else if (e.target.dataset.info === 'register'){
            user = {...user, email: input.email, teacher: input.teacher, role}
            const res = await request('https://classtable.herokuapp.com/api/auth/register', 'POST', user)
            setToast(res)
        }
    }

    if (props.switchBtn) {
        return (
            <div className={s.blockContentItem}>
                <form onSubmit={sendAuth} data-info="login" className={s.blockContentForm}>
                    <input type="text" placeholder="Login" name="login" onChange={handlerInput} value={input.login} className={s.blockContentFormInput}/>
                    <input type="password" placeholder="Password" name="password" onChange={handlerInput} value={input.password} className={s.blockContentFormInput}/>
                    <input type="submit" value="Войти" className={s.blockContentFormSubmit+" "+s.mt}/>
                </form>
            </div>
        )
    } else {
        return (
            <div className={s.blockContentItem}>
                <form onSubmit={sendAuth} data-info="register" className={s.blockContentForm}>
                    <input
                        type="text"
                        placeholder="Login"
                        name="login"
                        className={s.blockContentFormInput}
                        onChange={handlerInput}
                        value={input.login}
                        />
                    <input type="email" placeholder="Email" name="email" onChange={handlerInput} value={input.email} className={s.blockContentFormInput}/>
                    <input type="password" placeholder="Password" name="password" onChange={handlerInput} value={input.password}  className={s.blockContentFormInput}/>

                    <div className={s.blockContentRadio}>
                        <div
                            className={`${s.blockContentRadioItem} ${role ? null : s.blockContentRadioActive}`}
                            onClick={()=>{setRole(false)}}
                        >
                            Я Ученик
                        </div>
                        <div
                            className={`${s.blockContentRadioItem} ${role ? s.blockContentRadioActive : null}`}
                            onClick={()=>{setRole(true)}}
                        >
                            Я Учитель
                        </div>
                    </div>
                    <div className={`${s.divclass} ${s.oneclass} ${!role ? s.twoclass : null}`}>
                        <input type="text" placeholder="Ваш учитель" name="teacher"
                               onChange={handlerInput} value={input.teacher}
                               className={`${s.blockContentFormInput} ${s.blockContentFormInputDiv}`}/>
                    </div>

                    <input type="submit" value="Регистрация" className={s.blockContentFormSubmit}/>
                </form>
            </div>
        )
    }
}

export default BlockContentItem