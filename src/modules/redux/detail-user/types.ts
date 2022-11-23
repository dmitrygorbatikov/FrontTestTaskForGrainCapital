export enum UserActionTypesEnum {
    'GET_USER_REQUEST'= 'GET_USER_REQUEST',
    'GET_USER_RESPONSE'= 'GET_USER_RESPONSE',
    'GET_USER_ERROR'= 'GET_USER_ERROR',

    'EDIT_USER'= 'EDIT_USER',
}

export interface IUserItem {
    id: string
    name: string
    username: string
    edited: boolean
}