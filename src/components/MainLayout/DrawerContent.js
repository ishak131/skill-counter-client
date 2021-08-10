import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux';
import { logOut } from '../../Redux/actions/auth';

const DrawerContent = () => {
    const dispatch = useDispatch()
    return (
        <>
            <List>
                <ListItem button onClick={() => dispatch(logOut())}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary={'LOGOUT'} />
                </ListItem>
            </List>
        </>
    );
}

export default DrawerContent;
