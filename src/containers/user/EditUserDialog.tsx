import {FC, useEffect, useState} from "react";
import {IUser} from "../../modules/redux/users/types";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import {IUserItem} from "../../modules/redux/detail-user/types";
import UserDialogContent from "./UserDialogContent";

interface IEditUserDialogProps {
    open: boolean
    handleClose: () => void
    action: (props: {name: string, username: string, id: string}) => void
    user: IUser | IUserItem | undefined
}

const EditUserDialog: FC<IEditUserDialogProps> = (props) => {
    const {action, open, handleClose, user} = props

    const [name, setName] = useState<string | undefined>(user?.name)
    const [nameError, setNameError] = useState<boolean>(false)

    const [username, setUsername] = useState<string | undefined>(user?.username)
    const [usernameError, setUsernameError] = useState<boolean>(false)

    const editAction = () => {
        if(name === '') {
            setNameError(true)
        }
        if(username === '') {
            setUsernameError(true)
        }
        if(name && username) {
            action({id: user?.id ?? '',name,username})
            handleClose()
        }
    }

    useEffect(() => {
        setName(user?.name)
        setUsername(user?.username)
    },[user?.name, user?.username])
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`Edit '${user?.name}'`}
            </DialogTitle>
            <DialogContent>
                <UserDialogContent
                    usernameError={usernameError}
                    nameError={nameError}
                    setUsernameError={setUsernameError}
                    setNameError={setNameError}
                    setName={setName}
                    name={name ?? ''}
                    setUsername={setUsername}
                    username={username ?? ''}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button color={'error'} onClick={editAction} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditUserDialog