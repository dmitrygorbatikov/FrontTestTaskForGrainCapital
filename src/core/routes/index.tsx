import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "../../pages/HomePage";
import UsersPage from "../../pages/UsersPage";
import DetailUsersPage from "../../pages/DetailUsersPage";

const useRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/users" element={<UsersPage />}/>
            <Route path="/users/:id" element={<DetailUsersPage />}/>
            <Route path="*" element={<Navigate to={'/'} replace/>}/>
        </Routes>
    )
}

export default useRoutes