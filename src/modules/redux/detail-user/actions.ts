import {Dispatch} from "redux";
import {UserActionTypesEnum} from "./types";
import UserService from "../../../services/user.service";
import {IUser} from "../users/types";

export const getUser = (props: {userId: string}) => {
    return async (dispatch: Dispatch) => {
        const {userId} = props
        try {
            dispatch({type: UserActionTypesEnum.GET_USER_REQUEST})
            let user = await UserService.getOne({userId})
            const deletedIds = JSON.parse(localStorage.getItem('deletedIds') ?? '[]')

            if(!user || deletedIds.includes(Number(userId))) {
                dispatch({type: UserActionTypesEnum.GET_USER_RESPONSE, payload: undefined})
            }
            else {
                const {id, name, username} = user

                const editedFields: IUser[] = JSON.parse(localStorage.getItem('editedFields') ?? '[]')
                const editedFieldsIndex = editedFields.findIndex(item => item.id.toString() === userId)
                if(editedFieldsIndex !== -1) {
                    dispatch({type: UserActionTypesEnum.GET_USER_RESPONSE, payload: editedFields[editedFieldsIndex]})
                } else {
                    dispatch({type: UserActionTypesEnum.GET_USER_RESPONSE, payload: {id, name, username}})
                }
            }
        }
        catch (e) {
            dispatch({type: UserActionTypesEnum.GET_USER_ERROR, payload: 'Something went wrong'})
        }
    }
}

export const deleteUser = (props: {userId: number, users: IUser[]}) => {
    return (dispatch: Dispatch) => {
        const {userId, users} = props
        if(userId >= 1 && userId <= 10) {
            const deletedIds = JSON.parse(localStorage.getItem('deletedIds') ?? '[]')
            deletedIds.push(userId)
            localStorage.setItem('deletedIds', JSON.stringify(deletedIds))
        } else {
            const additionalUsers: IUser[] = JSON.parse(localStorage.getItem('additionalUsers') ?? '[]')

            const additionalUsersIndex = additionalUsers.findIndex(item => item.id.toString() === userId.toString())
            if(additionalUsersIndex !== -1) {
                additionalUsers.splice(additionalUsersIndex, 1)
            }

            localStorage.setItem('additionalUsers', JSON.stringify(additionalUsers))
        }
        const usersIndex = users.findIndex(item => item.id.toString() === userId.toString())
        if(usersIndex !== -1) {
            users.splice(usersIndex, 1)
        }
        dispatch({type: UserActionTypesEnum.GET_USER_RESPONSE, payload: users})
    }
}

export const editUser = (props: {id: number, name: string, username: string, users: IUser[]}) => {
    return (dispatch: Dispatch) => {
        const {name,id, users, username} = props
        const editedFields = JSON.parse(localStorage.getItem('editedFields') ?? '[]')
        const user = {
            id: id.toString(),
            name,
            username,
            actions: true,
            edited: true
        }
        const usersIndex = users.findIndex(item => item.id.toString() === id.toString())
        if(id > 0 && id <= 10) {
            if(usersIndex !== -1 && !(users[usersIndex].name === name && users[usersIndex].username === username)) {
                const editedFieldsIndex = editedFields.findIndex((item: IUser) => item.id.toString() === id.toString())
                if(editedFieldsIndex === -1 ) {
                    const newArr = [user]
                    editedFields.concat(newArr)
                    const concatArr =  editedFields.concat(newArr)
                    localStorage.setItem('editedFields', JSON.stringify(concatArr))
                } else {
                    editedFields[editedFieldsIndex] = user
                    localStorage.setItem('editedFields', JSON.stringify(editedFields))
                }
                users[usersIndex] = user
            }

        } else {
            const additionalUsers: IUser[] = JSON.parse(localStorage.getItem('additionalUsers') ?? '[]')

            const additionalUsersIndex = additionalUsers.findIndex(item => item.id.toString() === id.toString())
            if(additionalUsersIndex !== -1 && !(additionalUsers[additionalUsersIndex].name === name && additionalUsers[additionalUsersIndex].username === username)) {
                additionalUsers[additionalUsersIndex] = user
                localStorage.setItem('additionalUsers', JSON.stringify(additionalUsers))
                users[usersIndex] = user
            }
        }
        dispatch({type: UserActionTypesEnum.GET_USER_RESPONSE, payload: users})
        dispatch({type: UserActionTypesEnum.EDIT_USER, payload: user})
    }
}