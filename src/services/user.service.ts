import axios from 'axios'

class UserService {
    public getUsers() {
        return axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
            return res.data
        }).catch((e) => {
            return e.message
        })
    }
}

export default new UserService()