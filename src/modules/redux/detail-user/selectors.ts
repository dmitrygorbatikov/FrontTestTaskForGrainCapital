import {RootState} from "../../store";

export const userSelector = (state: RootState) => state.detailUser.user
export const userLoadingSelector = (state: RootState) => state.detailUser.loading