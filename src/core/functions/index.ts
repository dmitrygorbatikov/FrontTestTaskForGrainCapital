import {IUser} from "../../modules/redux/users/types";

export const normalizeUsersList = (users: any): IUser[] => {
    return users.map((user: any) => {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            actions: true
        }
    })
}