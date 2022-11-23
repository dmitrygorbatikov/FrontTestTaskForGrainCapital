import {IUserItem, UserActionTypesEnum} from "./types";

interface IUsersReducer {
    user?: IUserItem
    loading: boolean
    error: any
}

interface IUserAction {
    type: string,
    payload?: any
}

const defaultState: IUsersReducer = {
    loading: false,
    error: null
}

const usersReducer = (state = defaultState, action: IUserAction): IUsersReducer => {
    switch (action.type) {
        case UserActionTypesEnum.GET_USER_REQUEST:
            return {
                loading: true,
                error: null,
            }
        case UserActionTypesEnum.GET_USER_RESPONSE:
            return {
                loading: false,
                user: action.payload,
                error: null
            }
        case UserActionTypesEnum.GET_USER_ERROR:
            return {
                loading: false,
                error: action.payload,
                user: undefined
            }
        case UserActionTypesEnum.EDIT_USER:
            return {
                loading: false,
                user: action.payload,
                error: null,
            }
        default:
            return state
    }
}

export default usersReducer