import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { showAlert } from '../../Redux/actions/viewAlert'
import { setOpendListId } from '../../Redux/actions/opendList'
import { setArrayOfLists } from '../../Redux/actions/arrayOfLists'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import Cookies from 'js-cookie'
import ListsTapsAndAddListButton from '../../components/ListsTapsAndAddListButton/index';
import List from './List';
import { LinearProgress } from '@material-ui/core';


const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME)
const api = axios.create({
  baseURL: `${process.env.REACT_APP_MY_BACKEND_HOST}/skill`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json',
    'authorization': `123=${token}`
  }
});

function TabPanel(props) {

  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },

  TapPanel: {
    display: 'flex',
    justifyContent: 'space-between',
  }
  , editButtons: {
    display: 'flex',
    flexDirection: 'column',
  }
}));


export default function Lists() {

  const classes = useStyles();
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0);
  const arrayOflists = useSelector(state => state.arrayOfListsReducer)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //////////////////////////////////////////////
  const compare = (a, b) =>
    b.skillScore - a.skillScore

  const sortOneListSkills = useCallback((indexOfList = 0) => {
    arrayOflists && arrayOflists[indexOfList].skills.sort(compare)
    dispatch(setArrayOfLists([...arrayOflists]))

  }, [arrayOflists, dispatch])

  //////////////////////////////////////////////////////

  const sortAllMyLists = useCallback(() => {
    for (let index = 0; index < arrayOflists.length; index++) {
      sortOneListSkills(index)
    }
  }, [sortOneListSkills, arrayOflists.length])

  ///////////////////////////////////////////////////////////

  useEffect(() => {
    const getAllMyLists = async () => {
      await api.get('/getAllMyLists')
        .then(res => {
          const arrayOfResult = res.data.arrayOfLists
          dispatch(setArrayOfLists(arrayOfResult))
          if (arrayOfResult.length < 1)
            return dispatch(showAlert('You have to add new list to start working', 'info'))
          dispatch(setOpendListId(0, arrayOfResult[0]._id, arrayOfResult[0].skills))
          sortAllMyLists()
        })
        .catch(err => {
          dispatch(showAlert('Somthing went wrong please reload the page', 'error'))
        })
    }
    if (arrayOflists)
      return
    getAllMyLists()
  }, [arrayOflists, dispatch, sortAllMyLists]);



  return !arrayOflists ? <LinearProgress /> :
    (
      <div className={classes.root}>
        <ListsTapsAndAddListButton handleChange={handleChange} value={value} />
        {arrayOflists && arrayOflists.map(({ skills, _id: listId }, listIndex) => (
          <TabPanel key={"listIndex-" + listIndex} value={value} index={listIndex}>
            <List listIndex={listIndex} skills={skills} listId={listId} classes={classes} sortOneListSkills={sortOneListSkills} />
          </TabPanel>
        ))}
      </div>
    );
}

