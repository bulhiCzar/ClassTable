import {useCallback} from "react";

export const useHttp = () => {
    const request = useCallback(async (url, method = 'GET', body, headers) => {
        try {
            body = JSON.stringify(body)
            headers = {'Content-Type': 'application/json'}

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            // if (!response.ok) {
            //     return data
            // }

            return data
        } catch (e) {
            throw e
        }
    }, [])

    return {request}
}