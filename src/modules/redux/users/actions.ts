import {Dispatch} from "redux";
import {IUser, UsersActionTypesEnum} from "./types";
import UserService from "../../../services/user.service";
import {normalizeUsersList} from "../../../core/functions";

export const getUsers = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({type: UsersActionTypesEnum.GET_USERS_REQUEST})
            const users = await UserService.getUsers()
            const editedFields = localStorage.getItem('editedFields') ?? '[]'
            if(Array.isArray(users)) {
                const additionalUsers = JSON.parse(localStorage.getItem('additionalUsers') ?? '[]')
                const deletedIds = JSON.parse(localStorage.getItem('deletedIds') ?? '[]')
                const concatArr = users.concat(additionalUsers)
                const result = concatArr.filter(item => !deletedIds.includes(item.id))
                dispatch({type: UsersActionTypesEnum.GET_USERS_RESPONSE, payload: normalizeUsersList({users: result, editedFields})})
            }
        }
        catch (e) {
            dispatch({type: UsersActionTypesEnum.GET_USERS_ERROR, payload: 'Something went wrong'})
        }
    }
}

export const searchUsers = (props: {searchStr: string, users: IUser[]}) => {
    return (dispatch: Dispatch) => {
        const {searchStr, users} = props

        const filteredUsers = users.filter(item => {
            if (
                item.id.toString().toLowerCase().includes(searchStr.toLowerCase())
                || item.name.toLowerCase().includes(searchStr.toLowerCase())
                || item.username.toLowerCase().includes(searchStr.toLowerCase())
            ) {
                return item
            }
        })
        dispatch({type: UsersActionTypesEnum.SEARCH_USERS, payload: filteredUsers})
    }
}

export const createUser = (props: { id: string, name: string, username: string, users: IUser[] }) => {
    return (dispatch: Dispatch) => {
        const { id, name, username, users } = props
        const userId = (Number(id) > 10 ? Number(id) + 1 : 11).toString()

        const user = {
            id: userId,
            name,
            username,
            actions: true,
            edited: false
        }

        users.push(user)
        const additionalUsers = JSON.parse(localStorage.getItem('additionalUsers') ?? '[]')

        additionalUsers.push(user)
        localStorage.setItem('additionalUsers', JSON.stringify(additionalUsers))
        dispatch({type: UsersActionTypesEnum.CREATE_USER, payload: users})
    }
}