import {useCallback, useEffect, useMemo, useState} from "react"
import {useHttp} from "./http.hooks"
import GD from "../../GD"


export const useData = ({role, name, token}) => {
    const {request} = useHttp()
    const {state} = GD()

    const [lessons, setLessons] = useState([])
    const [students, setStudents] = useState([])
    const [teacher, setTeacher] = useState('')
    const [loading, setLoading] = useState(null)

    //
    // if (!(!!role || name)){
    //     // let lessons, students, teacher
    //     return {lessons, students, teacher}
    // }


    const checkToken = useCallback(async () => {
        if (!token) {
            return
        }
        setLoading(false)
        const headers = {authorization: `Bearer ${token}`}
        const res = await request(`${state.SERVER.url}/api/lesson/all`, 'POST', {}, headers)
        setLessons(res.lessons)


        setLoading(true)
        // console.log(res)
    }, [request, state.SERVER.url, token, setLoading, setLessons])

    useEffect(() => {
        checkToken()
    }, [checkToken])

    const reload = useCallback(checkToken, [checkToken])


    return {lessons, students, teacher, loading, reload}
}
