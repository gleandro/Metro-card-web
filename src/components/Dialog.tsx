import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import * as React from "react";

export interface SimpleDialogProps {
    showDialog: boolean,
    title: string,
    content: string,
    handleClose: (event: any) => void
}

export default function SimpleDialog({showDialog, title, content, handleClose}: SimpleDialogProps) {

    return (
        <Dialog open={showDialog} onClose={handleClose} aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleClose} autoFocus> Aceptar </Button>
            </DialogActions>
        </Dialog>
    )
}
