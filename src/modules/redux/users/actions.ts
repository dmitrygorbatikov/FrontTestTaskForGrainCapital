import {Dispatch} from "redux";
import {UserActionTypesEnum} from "./types";
import UserService from "../../../services/user.service";

export const getUsers = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({type: UserActionTypesEnum.GET_USERS_REQUEST})
            const users = await UserService.getUsers()
            dispatch({type: UserActionTypesEnum.GET_USERS_RESPONSE, payload: users})
        }
        catch (e) {
            dispatch({type: UserActionTypesEnum.GET_USERS_ERROR, payload: 'Something went wrong'})
        }
    }
}