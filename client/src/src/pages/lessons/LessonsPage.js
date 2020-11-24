import s from './LessonsPage.module.css'
import {useHttp} from "../../hooks/http.hooks";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import GD from "../../../GD";
import {AuthContext} from "../../context/AuthContext";
import LinearProgress from "@material-ui/core/LinearProgress";
import TableCust from "./table/TableCust";
// import {Paper, TableCell, withStyles, TableRow, TableBody, TableHead, Table, TableContainer} from "@material-ui/core";


const LessonsPage = () => {
    const {token, role} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [items, setItems] = useState([])
    const {state} = GD()
    const fix = true

    // useMemo(async () => {
    //     if (items.length>0){return }
    //     const headers = {authorization: `Bearer ${token}`}
    //     const res = await request(`${state.SERVER.url}/api/lesson/all`, 'POST', {}, headers)
    //     console.log(res)
    //     setItems(res.lessons)
    //     // return res.lessons
    // }, [fix])


    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.blockTitle}>
                    <div className={s.titleText}>
                        Все ваши занятия
                    </div>
                </div>
                <div className={s.blockContent}>
                    <div className={`${s.main} ${s.one} ${loading ? '' : s.two}`}>
                        {/*<div className={s.mainItem}>*/}
                        {/*    <div className={s.nubmer}>#</div>*/}
                        {/*    <div className={s.role}>{role ? 'Студент' : 'Преподаватель'}</div>*/}
                        {/*    <div>dateCreate</div>*/}
                        {/*    <div>dateCarrying</div>*/}
                        {/*    <div>comment</div>*/}
                        {/*    <div>price</div>*/}
                        {/*    <div>Длительность</div>*/}
                        {/*    <div>checkPay</div>*/}
                        {/*    <div>owner</div>*/}
                        {/*    <div className={[s.none]}>edit | del</div>*/}

                        {/*</div>*/}
                        {/*{*/}
                        {/*    loading ? <LinearProgress /> :items.map((item, idx)=>{*/}
                        {/*        return(*/}
                        {/*            <div className={[s.mainItem]} key={idx}>*/}
                        {/*                <div className={s.nubmer}>000000#{idx}</div>*/}
                        {/*                <div className={s.role}>{role ? item.student : item.teacher}</div>*/}
                        {/*                <div>{item.dateCreate}</div>*/}
                        {/*                <div>{item.dateCarrying}</div>*/}
                        {/*                <div>{item.comment}</div>*/}
                        {/*                <div>{item.price}</div>*/}
                        {/*                <div>{item.multiplier}</div>*/}
                        {/*                <div>{item.checkPay}</div>*/}
                        {/*                <div>{item.owner}</div>*/}
                        {/*                <div>edit | del</div>*/}
                        {/*            </div>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*}*/}


                        {useMemo(() => {
                            // console.log(items)
                            if (items) {
                                // debugger
                                // return <TableCust items={items} role={role}/>
                                // return <HeaderTableCust items={items} role={role}/>
                            }
                        }, [items, role])}

                        {/*<Table items={items} role={role}/>*/}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default LessonsPage