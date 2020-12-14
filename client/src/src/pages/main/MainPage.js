import s from './MainPage.module.css'
import {useCallback, useContext, useEffect, useMemo, useState} from "react"
import moment from "moment"
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hooks";
import GD from "../../../GD";
import {DataContext} from "../../context/DataContext"
import Functions from '../../Functions'
import {connect, useDispatch} from "react-redux";


const MainPage = ({lessons}) => {
    const {token, role} = useContext(AuthContext)
    // const {lessons} = useContext(DataContext)
    const {htmlDecode, ParsDate} = Functions

    const dispatch = useDispatch()




    const [week, setWeek] = useState({firstDay: '', lastDay: '', firstDayN: '', lastDayN: ''})
    const {request} = useHttp()
    const [items, setItems] = useState([])
    const [toWeekLesson, setToWeekLesson] = useState(true)
    const {state} = GD()
    // let ToWeekLesson = true


    const dates = useMemo((current = new Date()) => {
        // current = new Date('Wed Dec 02 2020 13:18:00 GMT+0300 (Москва, стандартное время)')
        const week = [];
        current.setDate((current.getDate() - current.getDay() + 1));
        for (let i = 0; i < 7; i++) {
            week.push(
                new Date(current)
            );
            current.setDate(current.getDate() + 1);
        }
        return week;
    }, [s])

    String.prototype.replaceAt = function (index, replacement, trigger) {
        // this.indexOf('|') === 0 ? this.substring(1) : this;
        // console.log(this.indexOf('0') == 0)
        // console.log(this.substring(index + 1))
        // return this.substr(0, index) + replacement + this.substr(index + replacement.length);
        return this.indexOf(index) === trigger ? this.substring(index + 1).replace(/\s+/g, '') : this;
    }


    const getWeekDay = useCallback(() => {
        setWeek({
            // first: dates[0].toUTCString().slice(),
            firstDay: dates[0].toString().slice(8, 11).replaceAt(0, '', 0),
            lastDay: dates[6].toString().slice(8, 11).replaceAt(0, '', 0),
            firstDayN: new Date(dates[0]),
            lastDayN: new Date(dates[6])
        })
    }, [setWeek, dates])

    useEffect(() => {
        getWeekDay()
    }, [getWeekDay])

    function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 6); // adjust when day is sunday
        // console.log(d.setDate(diff))
        return new Date(d.setDate(diff));
    }

    let arrless = []

    const setLessonsWeek =
        lessons.sort((a, b) => a.dateCarrying - b.dateCarrying).map((item, idx,) => {
            const {date, time} = ParsDate(item.dateCarrying)
            const day = new Date(item.dateCarrying)

            if ((day < week.firstDayN) || (day > week.lastDayN)) {
                return
            }

            const topic = htmlDecode(item.topic)
            return (
                <div className={s.card} key={item._id}>
                    <div className={s.cardHeader}>
                        <div className={s.cardDateDay}>{date}</div>
                        <div className={s.cardDateTime}>{time}</div>
                    </div>
                    <div className={s.cardBody}>
                        {role && <div className={s.cardDateRole}>{item.student}</div>}
                        <div className={s.cardMultiplier}>На {item.multiplier} час</div>
                        <div className={s.topic}>{topic}</div>
                    </div>
                </div>
            )
        }).filter(e=>e)


    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.blockTitle}>
                    <div className={s.titleText}>
                        Ближайщие занятия
                    </div>
                </div>
                <div className={s.blockContent}>
                    <div className={`${s.main}`}>
                        <div className={s.mainItem}>
                            <div className={s.mainDate}>
                                <div className={s.mainDateTitle}>На этой недели:</div>
                                <div className={s.mainDateBlock}>
                                    <div className={s.mainDateNumber}>{week.firstDay}</div>
                                    <span className={s.line}/>
                                    <div className={s.mainDateNumber}>{week.lastDay}</div>
                                </div>
                            </div>
                            {
                                setLessonsWeek.length > 0 ?
                                    <div className={s.mainCards}>
                                        {setLessonsWeek}
                                    </div>
                                    :
                                    <div className={s.nonLessons}>
                                        У вас нет занятий на этой недели
                                    </div>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        lessons: state.lessons.lessons
    }
}

export default connect(mapStateToProps)(MainPage)