import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setOpendListId } from '../../Redux/actions/opendList'
import AddNewListForm from './addNewListForm';
import { setArrayOfLists } from '../../Redux/actions/arrayOfLists';




const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        /////////////////////////////////////////
        "& .MuiAppBar-root": {
            width: "calc(100% - 48px)",
        }
    },
    addListButton: {
        height: '48px',
        marginTop: 'auto',
    }
}));


function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const ListsTapsAndAddListButton = ({ value, handleChange }) => {

    const dispatch = useDispatch();
    const classes = useStyles()
    const arrayOflists = useSelector(state => state.arrayOfListsReducer)
    
    const addListToArrayOfLists = (newList) => {
        if (arrayOflists.length < 1)
            handleChange(0)
        dispatch(
            setArrayOfLists([...arrayOflists, newList])
        )
    }

    return (

        <div className={classes.root} >
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {arrayOflists && arrayOflists.map(({ _id: listId, listName, skills }, index) => (
                        <Tab
                            key={"Tab-" + index}
                            label={listName}
                            onClick={() => {
                                dispatch(setOpendListId(index, listId, skills))
                            }}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </AppBar>
            <AddNewListForm addListToArrayOfLists={addListToArrayOfLists} classes={classes} />
        </div>
    );
}

export default ListsTapsAndAddListButton;
