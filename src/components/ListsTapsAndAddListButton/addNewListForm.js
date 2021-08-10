import { IconButton, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import { showAlert } from '../../Redux/actions/viewAlert'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAddSharp';
import axios from 'axios'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux';
import ModalWithForm from '../ModalWithForm';


const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME)

const api = axios.create({
    baseURL: `${process.env.REACT_APP_MY_BACKEND_HOST}/list`,
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        'authorization': `123=${token}`
    }
});

const AddNewListForm = ({ classes, addListToArrayOfLists }) => {

    const [open, setOpen] = useState(false)
    const [listName, setListName] = useState(false)

    const dispatch = useDispatch()

    const addNewList = async () => {
        await api.post('/createNewList', {
            listName
        }).then(
            (res) => {
                addListToArrayOfLists(res.data.savedList);
                dispatch(showAlert('the List is add successfully', 'success'))
            }
        ).catch(() => dispatch(showAlert('Sorry you can not add more than 3')))
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Tooltip title="Add New List" aria-label="add">
                <IconButton className={classes.addListButton} onClick={handleOpen} >
                    <PlaylistAddIcon color="primary" />
                </IconButton>
            </Tooltip>
            <ModalWithForm
                label="List Name"
                handleClose={handleClose}
                open={open}
                action="Add the list "
                title="Add New List"
                onChange={(e) => { setListName(e.target.value) }}
                onSubmit={addNewList}
            />
        </>
    );
}

export default AddNewListForm;
