import {RootState} from "../../store";

export const usersListSelector = (state: RootState) => state.users.users
export const usersLoadingSelector = (state: RootState) => state.users.loading