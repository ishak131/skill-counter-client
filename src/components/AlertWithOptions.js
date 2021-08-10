import React from 'react';
import { IconButton, Modal, Tooltip } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';


const AlertWithOptions = ({ action, handleClose, message, isShowen, tooltipTitle = "delete", icon = <DeleteIcon /> }) => {

    return (
        <Modal
            open={isShowen}
            onClose={handleClose}
        >
            <Alert severity="warning" className="alert">
                <AlertTitle> Warning </AlertTitle>
                <span className="alert-message"> {message} </span>
                <br />
                <div className='alert-actions'>
                    <Tooltip title={tooltipTitle} >
                        <IconButton
                            variant="contained"
                            color="secondary"
                            onClick={action}
                            size="small"
                        >
                            {icon}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='cancel' >
                        <IconButton
                            variant="contained"
                            color="primary"
                            onClick={handleClose}
                            size="small"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </Alert>
        </Modal>
    );
}

export default AlertWithOptions;
