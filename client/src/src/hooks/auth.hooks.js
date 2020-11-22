import {useCallback, useEffect, useState} from "react";
import {useHttp} from "./http.hooks";
import GD from "../../GD";


const storageGlobal = 'ClassTable'
// const storageRole = 'role'
// const storageName = 'name'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(null)
    const [name, setName] = useState('')
    const [role, setRole] = useState(false)

    const {request} = useHttp()
    const {state} = GD()


    const login = useCallback(({token, name, role}) => {
        setToken(token)
        // setRole(role)
        // setName(name)

        localStorage.setItem(storageGlobal, JSON.stringify(token))
        // localStorage.setItem(storageRole, JSON.stringify(role))
        // localStorage.setItem(storageName, JSON.stringify(name))

    }, [])

    const logout = useCallback(() => {
        setToken(null)
        // setName(null)
        // setRole(null)

        localStorage.removeItem(storageGlobal)
        // localStorage.removeItem(storageRole)
        // localStorage.removeItem(storageName)
    }, [])


    useEffect(() => {
        const tokenjson = localStorage.getItem(storageGlobal)
        // const rolejson = localStorage.getItem(storageRole)
        // const namejson = localStorage.getItem(storageName)


        const token = JSON.parse(tokenjson)
        // const role = JSON.parse(rolejson)
        // const name = JSON.parse(namejson)


        if (token) {
            login({token})
        }
        setReady(true)
    }, [login])


    const checkToken = useCallback(async ()=>{
        if (!token){return }
        setReady(false)
        const res = await request(`${state.SERVER.url}/api/auth/token`, 'POST', {token})
        if (res.exit){
            logout()
            setReady(true)
            return
        }
        setName(res.login)
        setRole(res.role)
        setReady(true)
        console.log(res)
    },[setReady, request, state.SERVER.url, token, setRole, setName, logout])

    useEffect(()=>{
        checkToken()
    }, [checkToken])



    return {login, logout, token, ready, name, role}
}

