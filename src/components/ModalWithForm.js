import { Button, Modal, TextField, Typography } from '@material-ui/core';
import React from 'react';

const ModalWithForm = ({ handleClose, open = false, onSubmit, onChange, title, action, label }) => {

    return (
        <Modal
            className={'AddNewListForm'}
            open={open}
            onClose={handleClose}
        >
            <form onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
                handleClose()
            }} >
                <Typography variant="h4" align="center" > {title} </Typography>
                <TextField onChange={onChange} name="listName" label={label} variant="outlined" />
                <Button variant="contained" color="primary" type="submit" > {action} </Button>
            </form>
        </Modal>
    );
}

export default ModalWithForm;
