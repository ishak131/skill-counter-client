import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logIn, logOut } from '../../Redux/actions/auth'
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { useEffect } from 'react'
import axios from 'axios';
import { showAlert } from '../../Redux/actions/viewAlert';


const StyledMenu = withStyles({
  
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

  

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      
      },
    },
  },
}))(MenuItem);

const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME)

const api = axios.create({
    baseURL: process.env.REACT_APP_MY_BACKEND_HOST,
    timeout: 1000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        'authorization': `123=${token}`
    }
});

export default function Buttons() {
  const dispatch = useDispatch()
  

    useEffect(() => {
        if (token) {
            api.post('/auth',
                JSON.stringify({
                    token
                })
            ).then(res => {
                dispatch(logIn())
            }).catch(err => {
                console.log(err.response);
                dispatch(showAlert(` You didn't log in for more than 1 month please login again`, 'warning'))
                dispatch(logOut())
            })
        }
    }, [dispatch]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div >
      <IconButton
      className="butn"
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <MenuItem onClick={() => dispatch(logOut())}>LogOut</MenuItem>
        <MenuItem onClick={handleClose}>Add List</MenuItem>
        <MenuItem onClick={handleClose}>Delete List</MenuItem>
      </StyledMenu>
    </div>
  );
}