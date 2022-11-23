import {Box, Button, IconButton, InputAdornment, OutlinedInput, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {searchUsers} from "../../modules/redux/users/actions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {FC} from "react";
import {useDispatch} from "react-redux";
import {IUser} from "../../modules/redux/users/types";

interface IUsersHeaderProps {
    searchStr: string
    setSearchStr: (value: string) => void
    setOpenCreateUser: (value: boolean) => void
    goHome: () => void
    usersForSearch: IUser[]
}

const UsersHeader: FC<IUsersHeaderProps> = (props) => {
    const {goHome, setSearchStr, searchStr, setOpenCreateUser, usersForSearch} = props
    const dispatch = useDispatch()
    return (
        <>
        <Typography variant={'h4'}>Users Page</Typography>
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box>
            <OutlinedInput
                id="outlined-basic"
                placeholder="Search.."
                value={searchStr}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                        >
                            <SearchIcon/>
                        </IconButton>
                    </InputAdornment>
                }
                onChange={(e) => {
                    setSearchStr(e.target.value)
                    // @ts-ignore
                    dispatch(searchUsers({searchStr: e.target.value, users: usersForSearch}))
                }}
            />
            <Button
                onClick={() => setOpenCreateUser(true)}
                sx={{marginLeft: 2}}
                variant={'outlined'}
            >
                Create new user
            </Button>
        </Box>
        <Button variant="outlined" startIcon={<ArrowBackIcon/>} onClick={goHome}>
            Go home
        </Button>
    </Box>
            </>
    )
}

export default UsersHeader