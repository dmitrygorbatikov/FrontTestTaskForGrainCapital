import {FC} from "react";
import {Box, TextField, Typography} from "@mui/material";

interface IUserDialogContentProps {
    nameError: boolean,
    usernameError: boolean,
    setNameError: (value: boolean) => void
    setUsernameError: (value: boolean) => void
    setName: (value: string) => void
    setUsername: (value: string) => void
    name: string
    username: string
}
const UserDialogContent: FC<IUserDialogContentProps> = (props) => {
    const {setNameError,setName,setUsernameError,usernameError,nameError, setUsername, username, name} = props
    return (
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
    )
}

export default UserDialogContent