import s from "./ItemLessons.module.css";
import Functions from "../../../Functions";
import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";

import DeleteIcon from '@material-ui/icons/Delete';
import PaymentIcon from '@material-ui/icons/Payment';
import InfoIcon from '@material-ui/icons/Info';
import {useHttp} from "../../../hooks/http.hooks";
import GD from "../../../../GD";
import {DataContext} from "../../../context/DataContext";

const ItemLessons = ({item, idx}) => {
    const {role, token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const {reload} = useContext(DataContext)
    const {state} = GD()
    const {htmlDecode, ParsDate} = Functions
    const {date, time} = ParsDate(item.dateCarrying)
    const day = date.slice(0, 2)
    const topic = htmlDecode(item.topic)

    const [menu, setMenu] = useState(false)
    const [menuContext, setMenuContext] = useState(false)

    const id = item._id

    const deleteLesson = async (el)=>{
        const headers = {'Authorization': `Bearer ${token}`}
        const res = await request(`${state.SERVER.url}/api/lesson/${id}`, 'DELETE', {}, headers)
        console.log(res)
        reload()
    }

    return (
        <div className={s.card} key={idx}
             onMouseEnter={()=>{setMenu(true)}} onMouseLeave={()=>{setMenu(false)}}
        >
            {/*{del ? <div className={s.delete}><HighlightOffIcon/></div> : ''}*/}
            <div className={s.cardHeader}>
                <div className={s.cardDateDay}>{date}</div>
                <div className={s.cardDateTime}>{time}</div>
            </div>
            <div className={s.cardBody}>
                {role && <div className={s.cardDateRole}>{item.student}</div>}
                <div className={s.cardMultiplier}>На {item.multiplier} час</div>
                <div className={s.topic}>{topic}</div>
            </div>
            <div className={`
                ${s.cardMenu}
                ${!menu ? s.one : s.two}
                ${!(menu && menuContext) ? '' : s.menuContext}
                `}
                 onMouseEnter={()=>{setMenuContext(true)}}
                 onMouseLeave={()=>{setMenuContext(false)}}
                 >
                <InfoIcon className={s.info}/>
                <PaymentIcon className={s.payment}/>
                <DeleteIcon className={s.delete} onClick={deleteLesson}/>
            </div>
        </div>
    )
}

export default ItemLessons