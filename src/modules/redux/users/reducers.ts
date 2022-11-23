import {IUser, UsersActionTypesEnum} from "./types";

interface IUsersReducer {
    users: IUser[]
    user?: IUser
    usersForSearch: IUser[]
    loading: boolean
    error: any
}

interface IUserAction {
    type: string,
    payload?: any
}

const defaultState: IUsersReducer = {
    users: [],
    usersForSearch: [],
    loading: false,
    error: null
}

const usersReducer = (state = defaultState, action: IUserAction): IUsersReducer => {
    switch (action.type) {
        case UsersActionTypesEnum.GET_USERS_REQUEST:
            return {
                loading: true,
                error: null,
                users: [],
                usersForSearch: []
            }
        case UsersActionTypesEnum.GET_USERS_RESPONSE:
            return {
                loading: false,
                users: action.payload,
                usersForSearch: action.payload,
                error: null
            }
        case UsersActionTypesEnum.GET_USERS_ERROR:
            return {
                loading: false,
                error: action.payload,
                users: [],
                usersForSearch: []
            }
        case UsersActionTypesEnum.SEARCH_USERS:
            return {
                loading: false,
                usersForSearch: state.usersForSearch,
                users: action.payload,
                error: null
            }
        case UsersActionTypesEnum.CREATE_USER:
            return {
                loading: false,
                usersForSearch: state.usersForSearch,
                users: action.payload,
                error: null
            }
        default:
            return state
    }
}

export default usersReducer