import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userLoadingSelector, userSelector} from "../modules/redux/detail-user/selectors";
import {useNavigate, useParams} from "react-router-dom";
import {deleteUser, editUser, getUser} from "../modules/redux/detail-user/actions";
import {Box, Button, Typography} from "@mui/material";
import DeleteUserDialog from "../containers/user/DeleteUserDialog";
import EditUserDialog from "../containers/user/EditUserDialog";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SkeletonItemComponent from "../components/skeleton/SkeletonItemComponent";
import {usersForSearchListSelector} from "../modules/redux/users/selectors";

const DetailUsersPage: FC = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const users = useSelector(usersForSearchListSelector)
    const loading = useSelector(userLoadingSelector)
    const navigate = useNavigate()

    const [openDeleteUser, setOpenDeleteUser] = useState<boolean>(false)
    const [openEditUser, setOpenEditUser] = useState<boolean>(false)

    const deleteUserAction = (id: string) => {
        // @ts-ignore
        dispatch(deleteUser({users, userId: Number(id)}))
        navigate('/users')
    }

    const editUserAction = (props: {id: string, name: string, username: string}) => {
        const {username, name, id} = props
        // @ts-ignore
        dispatch(editUser({users, id: Number(id), username, name}))
    }

    const handleCloseEditDialog = () => {
        setOpenEditUser(false)
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteUser(false)
    }

    const handleShowDeleteDialog = () => {
        setOpenDeleteUser(true)
    }

    const handleShowEditDialog = () => {
        setOpenEditUser(true)
    }

    const goHome = () => {
        navigate('/users')
    }

    useEffect(() => {
        // @ts-ignore
        dispatch(getUser({userId: userId ?? ''}))
    },[userId])

    return (
        <>
            {loading
                ?
                <SkeletonItemComponent width={150} count={4}/>
                :
                <Box>
                    <Box>
                        <Button variant="outlined" startIcon={<ArrowBackIcon/>} onClick={goHome}>
                            Home
                        </Button>
                    </Box>
                    {!user ? <Typography>User not found</Typography> :
                        <>
                            <Button onClick={handleShowEditDialog}>Edit</Button>
                            <Button color={'error'} onClick={handleShowDeleteDialog}>Delete</Button>
                            <DeleteUserDialog open={openDeleteUser} handleClose={handleCloseDeleteDialog}
                            action={deleteUserAction} user={user}/>
                            <EditUserDialog open={openEditUser} handleClose={handleCloseEditDialog} action={editUserAction}
                            user={user}/>
                            <Typography>name: {user?.name}</Typography>
                            <Typography>username: {user?.username}</Typography>
                        </>
                            }
                </Box>
            }
        </>
    )
}

export default DetailUsersPage