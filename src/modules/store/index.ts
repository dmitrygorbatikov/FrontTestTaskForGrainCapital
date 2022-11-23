import {combineReducers, applyMiddleware, createStore} from 'redux'
import usersReducer from "../redux/users/reducers";
import detailUserReducer from "../redux/detail-user/reducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    users: usersReducer,
    detailUser: detailUserReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))
export default store