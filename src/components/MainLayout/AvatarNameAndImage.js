import React, { useEffect, useState } from 'react';
import { Avatar, Button, Input, Modal, Typography } from '@material-ui/core';
import API from '../../API/axios';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../Redux/actions/viewAlert';
import ModalWithForm from '../ModalWithForm';
import Cookies from 'js-cookie';
import axios from 'axios';



const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME)
const api = axios.create({
    baseURL: `${process.env.REACT_APP_MY_BACKEND_HOST}/upload`,
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'multipart/form-data',
        'authorization': `123=${token}`
    }
});


const AvatarNameAndImage = ({ classes }) => {
    const [userName, setUserName] = useState()
    const [modalIsOpend, setModalIsOpend] = useState(false)
    const [avatarImage, setAvatarImage] = useState('')

    const dispatch = useDispatch()
    const changeUserNameInImage = () => {
        if (!userName)
            return
        let userAvatar = ''
        const userNameSplitedIntoArray = userName.split(" ")
        for (let index = 0; index < userNameSplitedIntoArray.length; index++) {
            if (userNameSplitedIntoArray[index][0])
                userAvatar += userNameSplitedIntoArray[index][0]
        }
        return userAvatar
    }

    const uploadAvatarImage = async () => {
        const data = new FormData()
        data.append('avatar', avatarImage)
        await api.post('/uploadAvatar', data).then(res => {
            console.log(res);
        }).catch(err => console.log(err))
    }

    const handleClose = () => {
        setModalIsOpend(false)
    }
    const handleOpen = () => {
        setModalIsOpend(true)
    }

    useEffect(() => {
        const getUserData = async () => {
            await API.get('/user/getUser')
                .then(res => setUserName(res.data.fullName))
                .catch(() => dispatch(showAlert('Somthing went wrong can you reaload the page', 'error')))
        }
        getUserData()
    }, [userName, setUserName, dispatch]);

    return (

        <span onClick={handleOpen} className={classes.avatar} >
            <Modal
                className={'AddNewListForm'}
                open={modalIsOpend}
                handleClose={handleClose}
            >
                <form onSubmit={(e) => {
                    e.preventDefault()
                    uploadAvatarImage()
                    handleClose()
                }}>
                    <Typography variant="h4" align="center" > choose image </Typography>
                    <input multiple type="file" onChange={(e) => setAvatarImage(e.target.value)} label={'choose image'} variant="outlined" />
                    <Button variant="contained" color="primary" type="submit" > upload avatar </Button>
                </form>
            </Modal>
            <Avatar>{changeUserNameInImage()}</Avatar>
            <Typography variant="h5">
                Hi {userName}
            </Typography>
        </span>
    );
}

export default AvatarNameAndImage;
