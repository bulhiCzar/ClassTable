import s from "./profilePage.module.css";
import {useParams} from 'react-router-dom'
import {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../../hooks/http.hooks";
import GD from "../../../../GD";
import {AuthContext} from "../../../context/AuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProfilePage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const loginLink = useParams().login
    const {state} = GD()
    const [d, setD] = useState('')
    const [res, setRes] = useState('')

    const loaderLoginInfo = useCallback(async () => {
        if (!token) return
        const headers = {authorization: `Bearer ${token}`}
        const res = await request(`${state.SERVER.url}/api/user/user/${loginLink}`, 'POST', {}, headers)
        setD(res.user)
        setRes(res)
    }, [request, loginLink, token, state.SERVER.url])


    useEffect(() => {
        loaderLoginInfo()
    }, [loaderLoginInfo])



    if (loading) {
        return (
            <div className={s.wrapper}>
                <div className={s.content}>
                    <div className={s.loading}>
                    <CircularProgress color="secondary" />
                    </div>
                </div>
            </div>
        )
    } else if (!res.exists) {
        return (
            <div className={s.wrapper}>
                <div className={s.content}>
                    такого пользователя не найдено
                </div>
            </div>
        )
    } else if (res.exists) {
        return (
            <div className={s.wrapper}>
                <div className={s.content}>
                    <div className={s.blockTitle}>
                        <div className={s.titleText}>
                            <div>
                                {d.role ? 'Учитель ' : 'Ученик '}
                                {d.login}
                            </div>
                        </div>
                    </div>
                    <div className={s.blockContent}>
                        <div>Дата регистрации: {new Date(d.registered).toJSON().slice(0,10).split('-').reverse().join('.')}</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                чет фигня какая-то
            </div>
        </div>
    )
}

export default ProfilePage