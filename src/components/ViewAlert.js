import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../Redux/actions/viewAlert';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    position: "fixed",
    top: "50%",
    left: "50%",
    zIndex: 10000,
    transform: "translate(-50%, -50%)",
    animationName: "&hide",
    animationDuration: "1s",
    animationDelay: "2s",

  },
  "@keyframes hide": { from: { opacity: 1 }, to: { opacity: 0 } }
}))

function ViewAlert() {

  const viewAlertState = useSelector(state => state.viewAlertReducer);
  const { display, message, severity } = viewAlertState;
  const dispatch = useDispatch();
  const classes = useStyles();
  if (display === 'block') {
    setTimeout(() => {
      dispatch(hideAlert());
    }, 3000);
  }

  return (
    <div style={{ display }} className={classes.root}>
      <Alert severity={severity || 'error'}>{message}</Alert>
    </div>
  );
}

export default ViewAlert;
