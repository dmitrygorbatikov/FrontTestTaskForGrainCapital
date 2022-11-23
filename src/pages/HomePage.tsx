import {FC} from "react";
import {Typography} from "@mui/material";
import {Link} from "react-router-dom";

const HomePage: FC = () => {
    return (
        <div>
            <Typography variant="h4" component="h2">
                This is test task for grain capital, witch can show you
                '<Link to={'/users'}>Users</Link>'
                table, detail user page and make CRUD operations with this data
            </Typography>
        </div>
    )
}
export default HomePage