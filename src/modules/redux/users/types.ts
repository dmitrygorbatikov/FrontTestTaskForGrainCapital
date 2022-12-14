export enum UsersActionTypesEnum {
    'GET_USERS_REQUEST'= 'GET_USERS_REQUEST',
    'GET_USERS_RESPONSE'= 'GET_USERS_RESPONSE',
    'GET_USERS_ERROR'= 'GET_USERS_ERROR',
    'SEARCH_USERS'= 'SEARCH_USERS',
    'CREATE_USER'= 'CREATE_USER',
}

export interface IUser {
    id: string
    name: string
    username: string
    actions: boolean
    edited: boolean
}