import React, { useEffect, useState } from 'react';
import { Avatar, Button, Modal, Typography } from '@material-ui/core';
import API from '../../API/axios';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../Redux/actions/viewAlert';
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
    const [userName, setUserName] = useState([])
    const [avatarPath, setAvatarPath] = useState('')
    const [modalIsOpend, setModalIsOpend] = useState(false)

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
        var imagefile = document.querySelector('#avatar');
        data.append("avatar", imagefile.files[0]);
        await api.post('/uploadAvatar', data).then(res => {
            setAvatarPath(res.data.avatarImage.filename)
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
                .then(res => {
                    setUserName(res.data.fullName)
                })
                .catch(() => dispatch(showAlert('Somthing went wrong can you reaload the page', 'error')))
        }
        getUserData()
        const getUserAvatar = async () => {
            await api.get('/getAvatar')
                .then(res => {
                    setAvatarPath(res.data.imagePath)
                })
                .catch(() => dispatch(showAlert('Somthing went wrong can you reaload the page', 'error')))
        }
        getUserAvatar()
    }, [userName, setUserName, dispatch]);
    console.log( process.env.REACT_APP_MY_BACKEND_HOST + process.env.REACT_APP_AVATAR_PATH + avatarPath);
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
                    <input multiple type="file" id="avatar" label={'choose image'} variant="outlined" />
                    <Button variant="contained" color="primary" type="submit" > upload avatar </Button>
                </form>
            </Modal>
            <Avatar src={
                process.env.REACT_APP_MY_BACKEND_HOST + process.env.REACT_APP_AVATAR_PATH + avatarPath
            } >{changeUserNameInImage()}</Avatar>
            <Typography variant="h5">
                Hi {userName}
            </Typography>
        </span>
    );
}

export default AvatarNameAndImage;
