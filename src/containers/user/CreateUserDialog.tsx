import {FC, useState} from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import UserDialogContent from "./UserDialogContent";

interface ICreateUserDialogProps {
    open: boolean
    handleClose: () => void
    action: (props: {name: string, username: string}) => void
}
const CreateUserDialog: FC<ICreateUserDialogProps> = (props) => {
    const {action, handleClose, open} = props

    const [name, setName] = useState<string>('')
    const [nameError, setNameError] = useState<boolean>(false)

    const [username, setUsername] = useState<string>('')
    const [usernameError, setUsernameError] = useState<boolean>(false)

    const onClose = () => {
        setName('')
        setUsername('')
        handleClose()
    }

    const createUser = () => {
        if(name === '') {
            setNameError(true)
        }
        if(username === '') {
            setUsernameError(true)
        }
        if(name && username) {
            action({name,username})
            onClose()
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Create new user
            </DialogTitle>
            <DialogContent>
                <UserDialogContent
                    usernameError={usernameError}
                    nameError={nameError}
                    setUsernameError={setUsernameError}
                    setNameError={setNameError}
                    setName={setName}
                    name={name}
                    setUsername={setUsername}
                    username={username}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={createUser}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateUserDialog