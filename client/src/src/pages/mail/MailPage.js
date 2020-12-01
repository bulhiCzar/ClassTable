import {NavLink, useParams} from 'react-router-dom'
import {useCallback, useEffect, useMemo, useState} from "react"
import {useHttp} from "../../hooks/http.hooks"
import s from './MailPage.module.css'
import GD from "../../../GD";
import {useToast} from "../../hooks/toast.hooks";



const MailPage = () => {
    const {state} = GD()
    const {request} = useHttp()
    const id = useParams().id
    const [status, setStatus] = useState(false)
    const {setToast} = useToast()

    const cb = useCallback(async ()=>{
            const res = await request(`${state.SERVER.url}/api/auth/mail/${id}`, 'POST')
            if (res.type === 'success') {
                setStatus(true)
            }
            setToast(res)
    }, [request, id])


    useEffect(() => {
        cb()
    }, [cb])

    return (
        <div className={s.wrapper}>
            <div className={s.block}>
                {status ? <div className={s.result}>Ваша почта подтверждена</div> :
                    <div className={s.result}>А подтвержать то нечего</div>}
                <div className={s.home}>
                    <NavLink to='/' className={s.link}>На главную</NavLink>
                </div>
            </div>
        </div>
    )
}

export default MailPage