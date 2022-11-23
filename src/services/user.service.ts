import axios from 'axios'
import {IUser} from "../modules/redux/users/types";

class UserService {
    baseUrl = 'https://jsonplaceholder.typicode.com/users'
    public getUsers() {
        return axios.get(this.baseUrl).then((res) => {
            return res.data
        }).catch((e) => {
            return e.message
        })
    }

    public getOne(props: {userId: string}) {
        return axios.get(`${this.baseUrl}/${props.userId}`).then((res) => {
            return res.data
        }).catch((e) => {
            return JSON.parse(localStorage.getItem('additionalUsers') ?? '[]')
                .find((item: IUser) => item.id === props.userId)
        })
    }
}

export default new UserService()