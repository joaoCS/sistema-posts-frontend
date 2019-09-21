const INITIAL_STATE = {
    userData: {}
}

export default function course(state = INITIAL_STATE, action) {
    if (action.type === 'ASSIGN_USER') {
        return {
            ...state,
            userData: action.user
        }
    }

    return state; 
}