import {combineReducers, applyMiddleware, createStore} from 'redux'
import usersReducer from "../redux/users/reducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    users: usersReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))
export default store