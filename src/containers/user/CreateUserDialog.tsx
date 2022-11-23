import {FC, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";

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
                            {nameError && <Typography sx={{marginBottom: 2}} color={'red'}>Fields must not be empty</Typography>}
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
                            {usernameError && <Typography sx={{marginBottom: 2}} color={'red'}>Fields must not be empty</Typography>}

                        </div>
                    </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={createUser}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateUserDialog