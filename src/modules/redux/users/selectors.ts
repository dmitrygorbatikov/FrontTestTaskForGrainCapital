import {RootState} from "../../store";

export const usersListSelector = (state: RootState) => state.users.users
export const usersForSearchListSelector = (state: RootState) => state.users.usersForSearch
export const usersLoadingSelector = (state: RootState) => state.users.loading