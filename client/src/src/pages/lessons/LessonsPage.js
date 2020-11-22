import s from './LessonsPage.module.css'
import {useHttp} from "../../hooks/http.hooks";
import {useCallback, useContext, useEffect} from "react";
import GD from "../../../GD";
import {AuthContext} from "../../context/auth.contexnt";

const LessonsPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const {state} = GD()

    const getLessons = useCallback(async () => {
        const headers = {authorization: `Bearer ${token}`}
        const res = await request(`${state.SERVER.url}/api/lesson/all`, 'POST', {}, headers)
        console.log(res.lessons)
    }, [ request, state.SERVER.url, token])

    useEffect(()=>{
        getLessons()
    }, [getLessons])


    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.blockTitle}>
                    <div className={s.titleText}>
                        Все ваши занятия
                    </div>
                </div>
                <div className={s.blockContent}>
                    <div className={s.main}>
                        <div className={s.mainItem}>
                            <div>#</div>
                            <div>teacher | student</div>
                            <div>dateCreate</div>
                            <div>dateCarrying</div>
                            <div>comment</div>
                            <div>price</div>
                            <div>checkPay</div>
                            <div>owner</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LessonsPage