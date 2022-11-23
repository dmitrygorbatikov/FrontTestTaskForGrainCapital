import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {usersForSearchListSelector, usersListSelector, usersLoadingSelector} from "../modules/redux/users/selectors";
import {createUser, getUsers, searchUsers} from "../modules/redux/users/actions";
import TableComponent from "../components/table/TableComponent";
import {useNavigate} from "react-router-dom";
import DeleteUserDialog from "../containers/user/DeleteUserDialog";
import {IUser, UsersActionTypesEnum} from "../modules/redux/users/types";
import EditUserDialog from "../containers/user/EditUserDialog";
import { Button, IconButton, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CreateUserDialog from "../containers/user/CreateUserDialog";
import {deleteUser, editUser} from "../modules/redux/detail-user/actions";

const UsersPage: FC = () => {
    const dispatch = useDispatch()
    const users = useSelector(usersListSelector)
    const loading = useSelector(usersLoadingSelector)
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
        dispatch(createUser({users: usersForSearch, name, id: usersForSearch[usersForSearch.length-1].id, username}))
        dispatch({type: UsersActionTypesEnum.GET_USERS_RESPONSE, payload: usersForSearch})
        setSearchStr('')
    }

    const deleteUserAction = (id: string) => {
        // @ts-ignore
        dispatch(deleteUser({users: usersForSearch, userId: Number(id)}))
        handleCloseDeleteDialog()
    }

    const editUserAction = (props: {id: string, name: string, username: string}) => {
        const {username, name, id} = props
        // @ts-ignore
        dispatch(editUser({users, id: Number(id), username, name}))
    }

    const handleCloseCreateDialog = () => {
        setOpenCreateUser(false)
    }

    const handleShowDeleteDialog = (user: IUser) => {
        setUser(user)
        setOpenDeleteUser(true)
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

    console.log(users)

    const columns = ['Id', 'Name', 'Username','Actions']
    return (
        <>
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
            {!loading && users.length === 0 ? <Typography>Users not found</Typography> :
                <div>
                    <TableComponent
                        loading={loading}
                        onRowClick={onRowClick}
                        data={users}
                        columns={columns}
                        deleteAction={handleShowDeleteDialog}
                        editAction={handleShowEditDialog}
                    />
                </div>
            }
            <DeleteUserDialog
                open={openDeleteUser}
                handleClose={handleCloseDeleteDialog}
                action={deleteUserAction}
                user={user}
            />
            <EditUserDialog
                open={openEditUser}
                handleClose={handleCloseEditDialog}
                action={editUserAction}
                user={user}
            />
            <CreateUserDialog
                open={openCreateUser}
                handleClose={handleCloseCreateDialog}
                action={createUserAction}
            />
        </>
    )
}
export default UsersPage