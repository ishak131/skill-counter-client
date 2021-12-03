import { Route, Redirect, Switch } from "react-router-dom"
import LogIn from '../views/auth/LogIn';
import SignUp from '../views/auth/SignUp';
import { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../Redux/actions/viewAlert';
import { logIn, logOut } from '../Redux/actions/auth';
import axios from 'axios';
import Form from "./Form/Form"
import Lists from "./Lists"
import PersistentDrawerLeft from "../components/MainLayout/index";
import { LinearProgress } from "@material-ui/core";

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


export default function HandleAuthentication() {

    const dispatch = useDispatch()
    const isLogged = useSelector(state => state.authReducer);

    const [isChecked, setIsCheked] = useState(false);

    useEffect(() => {
        if (token) {
            api.post('/auth',
                JSON.stringify({
                    token
                })
            ).then(() => {
                setIsCheked(true)
                dispatch(logIn())
            }).catch(() => {
                setIsCheked(true)
                dispatch(showAlert(`You didn't log in for more than 1 month please login again`, 'warning'))
                dispatch(logOut())
            })
        } else
            return setIsCheked(true)

    }, [dispatch]);


    // if the client didn't checked the token.
    // then return loading bar 
    //else
    // return if statement that checks if the user is logged in successfuly or not
    // if user logged in return the app 
    //else 
    //return the authintecation

    return !isChecked ?
        <LinearProgress />
        : isLogged ? (<>
            <Switch>
                <Route exact path="/">
                    <PersistentDrawerLeft >
                        <Form />
                        <Lists />
                    </PersistentDrawerLeft>
                </Route>
                <Redirect to="/" />
            </Switch>
        </>) :
            (<>
                <Switch>
                    <Route exact path="/">
                        <LogIn />
                    </Route>
                    <Route exact path="/sign-up">
                        <SignUp />
                    </Route>

                </Switch>
            </>)
}