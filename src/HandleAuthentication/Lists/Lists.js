import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Skills from './Skills'
import { useState } from 'react';
import { setOpendListId } from '../../Redux/actions/opendList'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import Cookies from 'js-cookie'
import { showAlert } from '../../Redux/actions/viewAlert'


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
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function Lists() {

  const classes = useStyles();
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0);
  const [arrayOflists, setArrayOfLists] = useState()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getAllMyLists = async () => {
      await api.get('/getAllMyLists')
        .then(res => {
          const arrayOfResult = res.data.arrayOfLists
          setArrayOfLists(arrayOfResult);
          dispatch(setOpendListId(arrayOfResult[0].listId, arrayOfResult[0].skills))
        })
        .catch(err => dispatch(showAlert(err.response.data, 'error')))
    }
    if (arrayOflists)
      return
    getAllMyLists()
  }, [setArrayOfLists, arrayOflists, dispatch]);



  return !arrayOflists ? <>...loading</> :
    (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {arrayOflists.map(({ listId, listName, skills }, index) => (
              <Tab
                key={"Tab-" + index} label={listName}
                onClick={() => {
                  dispatch(setOpendListId(listId, skills))
                }}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </AppBar>
        {arrayOflists.map(({ skills, listId }, listIndex) => (
          <TabPanel key={"listIndex-" + listIndex} value={value} index={listIndex}>
            <ol>
              {skills.map(({ skillName, skillScore, skillId }, skillIndex) => (
                <Skills
                  skillName={skillName}
                  skillId={skillId}
                  listId={listId}
                  skillScore={skillScore}
                  skillIndex={skillIndex}
                />
              ))}
            </ol>
          </TabPanel>
        ))}
      </div>
    );
}

