import {ADD_LESSON, DELETE_LESSONS, FETCH_LESSONS} from "../types";

const initialState = {
    lessons: []
}

export const lessonsReducer = (state = initialState, action)=>{
    switch (action.type) {
        case ADD_LESSON:
            return { ...state, lessons: state.lessons.concat([action.payload]) }
        case FETCH_LESSONS:
            return {lessons: state.lessons.concat(action.payload) }
        case DELETE_LESSONS:
            return { ...state, lessons: state.lessons.filter(e => e._id !== action.payload) }
        default: return state
    }
}