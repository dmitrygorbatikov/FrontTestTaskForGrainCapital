import axios from 'axios'
import {IUser} from "../modules/redux/users/types";

class UserService {
    public getUsers() {
        return axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
            return res.data
        }).catch((e) => {
            return e.message
        })
    }

    public getOne(props: {userId: string}) {
        return axios.get(`https://jsonplaceholder.typicode.com/users/${props.userId}`).then((res) => {
            return res.data
        }).catch((e) => {
            return JSON.parse(localStorage.getItem('additionalUsers') ?? '[]').find((item: IUser) => item.id === props.userId)
        })
    }
}

export default new UserService()