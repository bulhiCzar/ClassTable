import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const request = useCallback(async (url, method = 'GET', body, headers={} ) => {
        try {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
            // headers = 'application/json'

            setLoading(true)
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            // if (!response.ok) {
            //     return data
            // }

            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            throw e
        }
    }, [])

    return {request, loading}
}