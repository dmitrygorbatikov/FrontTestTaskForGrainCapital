import {UserActionTypesEnum} from "./types";


interface IUsersReducer {
    users: any[],
    loading: boolean,
    error: any
}

interface IUserAction {
    type: string,
    payload?: any
}

const defaultState: IUsersReducer = {
    users: [],
    loading: false,
    error: null
}

const usersReducer = (state = defaultState, action: IUserAction): IUsersReducer => {
    switch (action.type) {
        case UserActionTypesEnum.GET_USERS_REQUEST:
            return {
                loading: true,
                error: null,
                users: []
            }
        case UserActionTypesEnum.GET_USERS_RESPONSE:
            return {
                loading: false,
                users: action.payload,
                error: null
            }
        case UserActionTypesEnum.GET_USERS_ERROR:
            return {
                loading: false,
                error: action.payload,
                users: []
            }
        default:
            return state
    }
}

export default usersReducer