import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {usersForSearchListSelector, usersListSelector} from "../modules/redux/users/selectors";
import {createUser, getUsers, searchUsers} from "../modules/redux/users/actions";
import TableComponent from "../components/table/TableComponent";
import {useNavigate} from "react-router-dom";
import DeleteUserDialog from "../containers/user/DeleteUserDialog";
import {IUser, UserActionTypesEnum} from "../modules/redux/users/types";
import EditUserDialog from "../containers/user/EditUserDialog";
import {Button, IconButton, InputAdornment, OutlinedInput, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CreateUserDialog from "../containers/user/CreateUserDialog";
const UsersPage: FC = () => {
    const dispatch = useDispatch()
    const users = useSelector(usersListSelector)
    const usersForSearch = useSelector(usersForSearchListSelector)
    const navigate = useNavigate()

    const [openCreateUser, setOpenCreateUser] = useState<boolean>(false)
    const [openDeleteUser, setOpenDeleteUser] = useState<boolean>(false)
    const [openEditUser, setOpenEditUser] = useState<boolean>(false)
    const [user, setUser] = useState<IUser | undefined>(undefined)

    const [searchStr, setSearchStr] = useState<string>('')

    const createUserAction = (props: {name: string, username: string}) => {
        const { username, name } = props
        // @ts-ignore
        dispatch(createUser({users: usersForSearch, name, id: (usersForSearch.length+1).toString(), username}))
        dispatch({type: UserActionTypesEnum.GET_USERS_RESPONSE, payload: usersForSearch})
        setSearchStr('')
    }

    const deleteUserAction = () => {
        console.log('delete')
    }

    const editUserAction = () => {
        console.log('edit')
    }

    const handleShowDeleteDialog = (user: IUser) => {
        setUser(user)
        setOpenDeleteUser(true)
    }

    const handleCloseCreateDialog = () => {
        setOpenCreateUser(false)
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteUser(false)
    }

    const handleCloseEditDialog = () => {
        setOpenEditUser(false)
    }

    const handleShowEditDialog = (user: IUser) => {
        setUser(user)
        setOpenEditUser(true)
    }

    const onRowClick = (id: string) => {
        navigate(`/users/${id}`)
    }
    useEffect(() => {
        // @ts-ignore
        dispatch(getUsers())
    },[])

    const columns = ['Id', 'Name', 'Username','Actions']
    return (
        <div>
            <Typography variant={'h4'}>Users Page</Typography>
            <OutlinedInput
                id="outlined-basic"
                placeholder="Search.."
                value={searchStr}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
                onChange={(e) => {
                    setSearchStr(e.target.value)
                    // @ts-ignore
                    dispatch(searchUsers({searchStr: e.target.value, users: usersForSearch}))
                }}
            />
            <Button onClick={() => setOpenCreateUser(true)} sx={{marginLeft: 2}} variant={'outlined'}>Create new user</Button>
            <TableComponent
                onRowClick={onRowClick}
                data={users}
                columns={columns}
                deleteAction={handleShowDeleteDialog}
                editAction={handleShowEditDialog}
            />
            <DeleteUserDialog open={openDeleteUser} handleClose={handleCloseDeleteDialog} action={deleteUserAction} user={user}/>
            <EditUserDialog open={openEditUser} handleClose={handleCloseEditDialog} action={editUserAction} user={user}/>
            <CreateUserDialog open={openCreateUser} handleClose={handleCloseCreateDialog} action={createUserAction}/>
        </div>
    )
}
export default UsersPage