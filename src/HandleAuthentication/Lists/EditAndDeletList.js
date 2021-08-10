import React, { useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { showAlert } from '../../Redux/actions/viewAlert'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import { setArrayOfLists } from '../../Redux/actions/arrayOfLists';
import ModalWithForm from '../../components/ModalWithForm';
import AlertWithOptions from '../../components/AlertWithOptions';
import { DeleteForever } from '@material-ui/icons';
import { setOpendListId } from '../../Redux/actions/opendList';


const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME)

const api = axios.create({
    baseURL: `${process.env.REACT_APP_MY_BACKEND_HOST}/list`,
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        'authorization': `123=${token}`
    }
});


const EditAndDeletList = ({ classes, listId, orignalListName, listIndex }) => {

    const [listName, setListName] = useState('ishak ishak ishak')
    const [open, setOpen] = useState(false)
    const [isShowen, setIsShowen] = useState(false);

    const dispatch = useDispatch()
    const arrayOfLists = useSelector(state => state.arrayOfListsReducer)

    const changeListNameInReduxState = (newListName) => {
        arrayOfLists[listIndex].listName = newListName
        return dispatch(setArrayOfLists([...arrayOfLists]))
    }

    const updateListName = async () => {
        await api.put('/updateListName', {
            listName,
            listId
        }).then(
            () => {
                changeListNameInReduxState(listName)
                dispatch(showAlert('List name is updated successfully', 'success'))
            }
        ).catch(() => dispatch(showAlert('Sorry somthing went wrong')))
    }

    const handleDeleteMeFromReduxState = () => {
        dispatch(setOpendListId())
        arrayOfLists.splice(listIndex, 1)
        return dispatch(setArrayOfLists([...arrayOfLists]))
    }

    const deleteMe = async () => {
        setIsShowen(false)
        await api.delete(`/deleteList/${listId}`).then(
            () => {
                handleDeleteMeFromReduxState(listName)
                dispatch(showAlert('List is deleted successfully', 'success'))
            }
        ).catch(() => dispatch(showAlert("Sorry we couldn't delet the list ")))
        return
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.editButtons}>
            <Tooltip title="Edit List Name" >
                <IconButton disabled={open || isShowen} onClick={handleOpen} >
                    <EditIcon color="primary" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete this List">
                <IconButton disabled={open || isShowen} onClick={() => setIsShowen(true)} >
                    <DeleteForever color="secondary" />
                </IconButton>
            </Tooltip>

            <ModalWithForm
                label="List Name"
                handleClose={handleClose}
                open={open}
                action="Update List"
                title="Edit List Name"
                onChange={(e) => { setListName(e.target.value) }}
                onSubmit={updateListName}
            />

            <AlertWithOptions
                isShowen={isShowen}
                action={deleteMe}
                handleClose={() => setIsShowen(false)}
                message={<>Are you really want to delete <strong> {orignalListName} </strong> List This process is irreversible </>}
            />
        </div>
    );
}

export default EditAndDeletList;
