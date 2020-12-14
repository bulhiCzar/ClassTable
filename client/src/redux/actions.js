import {ADD_LESSON, DELETE_LESSONS, FETCH_LESSONS} from "./types";


export const addLesson = (post) => {
    return {
        type: ADD_LESSON,
        payload: post
    }
}

export const fetchLesson = (posts) => {
    return {
        type: FETCH_LESSONS,
        payload: posts
    }
}

export const delLesson = (post) => {
    return {
        type: DELETE_LESSONS,
        payload: post
    }
}