import {IUser} from "../../modules/redux/users/types";

export const normalizeUsersList = (props: {users: any, editedFields: string}): IUser[] => {
    const {editedFields,users} = props

    const editedUsersArray: IUser[] = JSON.parse(editedFields)
    const additionalUsers: IUser[] = JSON.parse(localStorage.getItem('additionalUsers') ?? '[]')
    console.log(additionalUsers)
    console.log(editedUsersArray)
    return users.map((user: any) => {
        let index = additionalUsers.findIndex(item => item.id.toString() === user.id.toString() && item.edited)
        if(index !== -1) {
            return additionalUsers[index]
        } else {
            index = editedUsersArray.findIndex(item => item.id.toString() === user.id.toString())
            if(index !== -1) {
                return editedUsersArray[index]
            }
        }
        return {
            id: user.id.toString(),
            name: user.name,
            username: user.username,
            actions: true,
            edited: false
        }
    })
}