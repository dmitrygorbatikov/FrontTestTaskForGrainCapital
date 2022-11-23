import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userLoadingSelector, userSelector} from "../modules/redux/detail-user/selectors";
import {useNavigate, useParams} from "react-router-dom";
import {deleteUser, editUser, getUser} from "../modules/redux/detail-user/actions";
import {Box, Button, IconButton, Typography} from "@mui/material";
import DeleteUserDialog from "../containers/user/DeleteUserDialog";
import EditUserDialog from "../containers/user/EditUserDialog";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SkeletonItemComponent from "../components/skeleton/SkeletonItemComponent";
import {usersForSearchListSelector} from "../modules/redux/users/selectors";
import {getUsers} from "../modules/redux/users/actions";

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

    const goPreviousPage = () => {
        const currentIndex = users.findIndex(item => item.id === userId)
        if(users[currentIndex-1]) {
            navigate(`/users/${users[currentIndex-1].id}`)
        }
    }

    const goNextPage = () => {
        const currentIndex = users.findIndex(item => item.id === userId)
        if(users[currentIndex+1]) {
            navigate(`/users/${users[currentIndex+1].id}`)
        }
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

    const goBack = () => {
        navigate('/users')
    }

    const goHome = () => {
        navigate('/')
    }

    useEffect(() => {
        // @ts-ignore
        dispatch(getUser({userId: userId ?? ''}))
        // @ts-ignore
        dispatch(getUsers())
    },[userId])

    return (
        <>
            {loading
                ?
                <SkeletonItemComponent width={150} count={4}/>
                :
                <Box>
                    <Box>
                        <Button variant="outlined" startIcon={<ArrowBackIcon/>} onClick={goBack}>
                            Back
                        </Button>
                        <Button sx={{marginLeft: 2}} variant="outlined" onClick={goHome}>
                            Home
                        </Button>
                    </Box>
                    {!user ? <Typography>User not found</Typography> :
                        <>
                            <Box>
                                <Button onClick={handleShowEditDialog}>Edit</Button>
                                <Button color={'error'} onClick={handleShowDeleteDialog}>Delete</Button>
                            </Box>
                            <Box>
                                <Typography>name: {user?.name}</Typography>
                                <Typography>username: {user?.username}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    maxWidth: 200,
                                    marginTop: 3
                                }}>
                                <IconButton onClick={goPreviousPage}>
                                    <ArrowBackIosNewIcon/>
                                </IconButton>
                                <IconButton onClick={goNextPage}>
                                    <ArrowForwardIosIcon/>
                                </IconButton>
                            </Box>
                        </>
                    }
                </Box>
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
        </>
    )
}

export default DetailUsersPage