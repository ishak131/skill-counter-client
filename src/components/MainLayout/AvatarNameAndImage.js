import React, { useEffect, useState } from 'react';
import { Avatar, Typography } from '@material-ui/core';
import API from '../../API/axios';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../Redux/actions/viewAlert';

const AvatarNameAndImage = ({ classes }) => {
    const [userName, setUserName] = useState()
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

    useEffect(() => {
        const getUserData = async () => {
            await API.get('/user/getUser')
                .then(res => setUserName(res.data.fullName))
                .catch(() => dispatch(showAlert('Somthing went wrong can you reaload the page', 'error')))
        }
        getUserData()
    }, [userName, setUserName, dispatch]);

    return (
        <span className={classes.avatar} >
            <Avatar>{changeUserNameInImage()}</Avatar>
            <Typography variant="h5">
                Hi {userName}
            </Typography>
        </span>
    );
}

export default AvatarNameAndImage;
