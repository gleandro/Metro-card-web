import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import {Alert} from "@mui/material";

export default function SnackBar() {

    const [open, setOpen] = React.useState(false);
    
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                This is a success message!
            </Alert>
        </Snackbar>
    )
}