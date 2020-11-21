import React, {useContext} from 'react'
import {useState} from 'react'
import {useHttp} from '../../../hooks/http.hooks'
import {useToast} from '../../../hooks/toast.hooks'
import s from './BlockContentItem.module.css'
import {AuthContext} from "../../../context/auth.contexnt";
import GD from "../../../../GD";

const BlockContentItem = (props) => {
    const auth = useContext(AuthContext)
    const [role, setRole]  = useState(false)
    const [active1, setActive1] =useState(true)
    const [active2, setActive2] =useState(true)
    const [input, setInput] = useState({
        login: '', password: '', email: '', teacher: ''
    })

    const {request, loading} = useHttp()
    const {setToast} = useToast()
    const {state} = GD()

    const handlerInput = (e)=>{
        setInput({...input, [e.target.name]: e.target.value})
    }

    const sendAuth = async (e)=>{
        e.preventDefault()
        let user = {login: input.login, password: input.password,}

        if (e.target.dataset.info === 'login'){
            const res = await request('https://classtable.herokuapp.com/api/auth/login', 'POST', user)
            setToast(res)
            auth.login(res.tokenAuth)

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
                    <input type="submit" value={!loading ? 'Войти' : 'Загрузка'} className={s.blockContentFormSubmit+" "+s.mt}/>
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
                            className={`${s.blockContentRadioItem} ${!(!role && active2) ? '' : s.blockContentRadioActive}`}
                            onClick={()=>{setRole(false)}}
                            onMouseEnter={()=>{setActive1(false)}}
                            onMouseOut={()=>{setActive1(true)}}
                        >
                            Я Ученик
                        </div>
                        <div
                            className={`${s.blockContentRadioItem} ${(role && active1) ? s.blockContentRadioActive : ''}`}
                            onClick={()=>{setRole(true)}}
                            onMouseEnter={()=>{setActive2(false)}}
                            onMouseOut={()=>{setActive2(true)}}
                        >
                            Я Учитель
                        </div>
                    </div>
                    {/*<div className={`${s.divclass} ${s.oneclass} ${(!(role && active1) && (!role && active2)) ? s.twoclass : ''}`}>*/}
                    <div className={`${s.divclass} ${s.oneclass} ${(!role && !( active1 && !active2 ) || ( !active1 && active2 )) ? s.twoclass : ''}`}>
                        <input type="text" placeholder="Ваш учитель" name="teacher"
                               onChange={handlerInput} value={input.teacher}
                               className={`${s.blockContentFormInput} ${s.blockContentFormInputDiv}`}/>
                    </div>

                    <input type="submit" value={!loading ? 'Регистрация' : 'Загрузка'} className={s.blockContentFormSubmit}/>
                </form>
            </div>
        )
    }
}

export default BlockContentItem