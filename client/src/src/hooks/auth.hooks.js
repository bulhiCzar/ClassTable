import {useCallback, useEffect, useState} from "react";
import {useHttp} from "./http.hooks";
import GD from "../../GD";


const storage = 'ClassTable'

export const useAuth = ()=>{
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(null)


    const login = useCallback((jwtToken)=>{
        setToken(jwtToken)

        localStorage.setItem(storage, JSON.stringify(jwtToken))

    }, [])

    const logout =  useCallback(()=>{
        setToken(null)

        localStorage.removeItem(storage)
    }, [])


    useEffect( async ()=>{
        const tokenJson = localStorage.getItem(storage)
        const data = JSON.parse(tokenJson)



        if (data){
            login(data)
        }
        setReady(true)
    })

    return{ login, logout, token, ready }
}