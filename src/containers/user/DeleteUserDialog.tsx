import {FC} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {IUser} from "../../modules/redux/users/types";
import {IUserItem} from "../../modules/redux/detail-user/types";

interface IDeleteUserDialogProps {
    open: boolean
    handleClose: () => void
    action: (id: string) => void
    user: IUser | IUserItem | undefined
}
const DeleteUserDialog: FC<IDeleteUserDialogProps> = (props) => {
    const {action, open, handleClose, user} = props

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`Do you want to delete '${user?.name}'?`}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button color={'error'} onClick={() => action(user?.id ?? '')} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteUserDialog