import s from './LessonsPage.module.css'
import {useHttp} from "../../hooks/http.hooks";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import GD from "../../../GD";
import {AuthContext} from "../../context/AuthContext";
import LinearProgress from "@material-ui/core/LinearProgress";
import {DataContext} from "../../context/DataContext";
import Functions from "../../Functions";
import ItemLessons from "./ItemLessons/ItemLessons";


const LessonsPage = () => {
    // const {token, role} = useContext(AuthContext)
    const {lessons} = useContext(DataContext)
    // const {request, loading} = useHttp()
    // const [items, setItems] = useState([])
    // const {htmlDecode, ParsDate} = Functions
    // const {state} = GD()

    // console.log(lessons)
    const setLessonsWeek =
        lessons.sort((a,b)=>a.dateCarrying - b.dateCarrying).map((item, idx,) => {
            return <ItemLessons item={item} idx={idx} key={item._id + idx}/>
        })

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.blockTitle}>
                    <div className={s.titleText}>
                        Все ваши занятия
                    </div>
                </div>
                {}
                <div className={s.blockContent}>
                    <div className={s.main}>
                        {
                            !(lessons.length > 0) ?
                                <div className={s.nonLessons}>
                                    У вас нет занятий
                                </div>
                                :
                                <div className={s.mainCards}>
                                    {setLessonsWeek}
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LessonsPage