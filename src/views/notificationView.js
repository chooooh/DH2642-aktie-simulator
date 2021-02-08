import React from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export const NotificationView = ({ message, close }) => {
    const [, setOpen] = React.useState(false);
    return (
        <Snackbar open={message ? true : false} autoHideDuration={4000}
            onClose={() => {
                setOpen(false); 
                close();
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            >
            <Alert 
                onClose={() => {
                    setOpen(false); 
                    close();
                }} 
                severity="info">
                {message}
            </Alert>
        </Snackbar>
    )
}