import {useToasts} from 'react-toast-notifications'
import {useCallback} from "react";

export const useToast = (props) => {
    const {addToast} = useToasts()
// console.log(props)
    const setToast = (props) => {
        console.log(props)
            addToast(props.content, {
                content: props.m,
                appearance: props.type,
                autoDismiss: true,
            })
        }

    return {setToast}
}