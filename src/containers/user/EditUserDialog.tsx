import {FC, useEffect, useState} from "react";
import {IUser} from "../../modules/redux/users/types";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";

interface IEditUserDialogProps {
    open: boolean
    handleClose: () => void
    action: () => void
    user: IUser | undefined
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
            action()
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
                <Box sx={{padding: 2}}>
                    <div>
                        <TextField
                            sx={{marginBottom: nameError ? 0 : 2}}
                            error={nameError}
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => {
                                setNameError(false)
                                setUsernameError(false)
                                setName(e.target.value)
                            }}
                        />
                        {nameError && <Typography sx={{marginBottom: 2}} color={'red'}>Field must not be empty</Typography>}
                    </div>
                    <div>
                        <TextField
                            sx={{marginBottom: usernameError ? 0 : 2}}
                            error={usernameError}
                            id="outlined-basic"
                            label="Surname"
                            variant="outlined"
                            value={username}
                            onChange={(e) => {
                                setNameError(false)
                                setUsernameError(false)
                                setUsername(e.target.value)
                            }}
                        />
                        {usernameError && <Typography sx={{marginBottom: 2}} color={'red'}>Field must not be empty</Typography>}

                    </div>
                </Box>
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