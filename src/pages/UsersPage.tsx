import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {usersForSearchListSelector, usersListSelector, usersLoadingSelector} from "../modules/redux/users/selectors";
import {createUser, getUsers} from "../modules/redux/users/actions";
import TableComponent from "../components/table/TableComponent";
import {useNavigate} from "react-router-dom";
import DeleteUserDialog from "../containers/user/DeleteUserDialog";
import {IUser, UsersActionTypesEnum} from "../modules/redux/users/types";
import EditUserDialog from "../containers/user/EditUserDialog";
import {Box, Typography} from "@mui/material";
import CreateUserDialog from "../containers/user/CreateUserDialog";
import {deleteUser, editUser} from "../modules/redux/detail-user/actions";
import UsersHeader from "../containers/user/UsersHeader";

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

    const goHome = () => {
        navigate('/')
    }

    useEffect(() => {
        // @ts-ignore
        dispatch(getUsers())
    },[])

    const columns = ['Id', 'Name', 'Username','Actions','']
    return (
        <Box>
            <UsersHeader
                setOpenCreateUser={setOpenCreateUser}
                searchStr={searchStr}
                setSearchStr={setSearchStr}
                goHome={goHome}
                usersForSearch={usersForSearch}
            />
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
        </Box>
    )
}
export default UsersPage