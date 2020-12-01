import s from "./SettingsPage.module.css";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hooks";
import GD from "../../../../GD";
import CircularProgress from "@material-ui/core/CircularProgress";
import ItemInputTheme from "./ItemInputTheme/ItemInputTheme";

const SettingsPage = () => {
    const {name, token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const {state} = GD()
    const [res, setRes] =useState('')

    const loaderUserInfo = useCallback(async ()=>{
        if (!token) return
        const headers = {authorization: `Bearer ${token}`}
        const res = await request(`${state.SERVER.url}/api/user/info`, 'POST', {login: name}, headers)
        setRes(res)
        console.log(res)
    }, [request, token, name, state.SERVER.url])

    useEffect(()=>{
        loaderUserInfo()
    }, [loaderUserInfo])




    if (loading) {
        return (
            <div className={s.wrapper}>
                <div className={s.content}>
                    <div className={s.loading}>
                        <CircularProgress />
                    </div>
                </div>
            </div>
        )
    } else if (!res.exists) {
        return (
            <div className={s.wrapper}>
                <div className={s.content}>
                    Авторизация не сошлась
                </div>
            </div>
        )
    } else if (res.exists) {
        return (
            <div className={s.wrapper}>
                <div className={s.content}>
                    <div className={s.blockTitle}>
                        <div className={s.titleText}>
                            Настройки
                        </div>
                    </div>
                    <div className={s.blockContent}>
                        <div className={s.settings}>
                            <div className={s.themeWrapper}>
                                <ItemInputTheme/>
                                <div className={s.btnGroup}>
                                    <div className={[s.btnAddInput, s.btn].join(' ')}>add input</div>
                                    <div className={[s.btnSave, s.btn].join(' ')}>save</div>
                                </div>
                            </div>
                            <div>email</div>
                            <div>password</div>
                        </div>
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

export default SettingsPage