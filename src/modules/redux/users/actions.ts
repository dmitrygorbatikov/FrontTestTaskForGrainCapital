import {Dispatch} from "redux";
import {IUser, UserActionTypesEnum} from "./types";
import UserService from "../../../services/user.service";
import {normalizeUsersList} from "../../../core/functions";

export const getUsers = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({type: UserActionTypesEnum.GET_USERS_REQUEST})
            const users = await UserService.getUsers()
            dispatch({type: UserActionTypesEnum.GET_USERS_RESPONSE, payload: normalizeUsersList(users)})
        }
        catch (e) {
            dispatch({type: UserActionTypesEnum.GET_USERS_ERROR, payload: 'Something went wrong'})
        }
    }
}

export const searchUsers = (props: {searchStr: string, users: IUser[]}) => {
    return (dispatch: Dispatch) => {
        const {searchStr, users} = props

        console.log(users)

        const filteredUsers = users.filter(item => {
            if (
                item.id.toString().toLowerCase().includes(searchStr.toLowerCase())
                || item.name.toLowerCase().includes(searchStr.toLowerCase())
                || item.username.toLowerCase().includes(searchStr.toLowerCase())
            ) {
                return item
            }
        })
        dispatch({type: UserActionTypesEnum.SEARCH_USERS, payload: filteredUsers})
    }
}

export const createUser = (props: { id: string, name: string, username: string, users: IUser[] }) => {
    return (dispatch: Dispatch) => {
        const { id, name, username, users } = props
        users.push({
            id,
            name,
            username,
            actions: true
        })
        dispatch({type: UserActionTypesEnum.CREATE_USER, payload: users})
    }
}