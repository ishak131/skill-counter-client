import { Route, Redirect, Switch } from "react-router-dom"
import LogIn from '../views/auth/LogIn';
import SignUp from '../views/auth/SignUp';
import { useEffect } from 'react'
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../Redux/actions/viewAlert';
import { logIn, logOut } from '../Redux/actions/auth';
import axios from 'axios';

const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME)
const api = axios.create({
    baseURL: 'http://localhost:4000',
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

    useEffect(() => {

        if (token) {
            api.post('/auth',
                JSON.stringify({
                    token
                })
            ).then(res => {
                console.log(res);
                dispatch(logIn())
            }).catch(err => {
                dispatch(showAlert(` You didn't log in for more than 1 month please login again `, 'warning'))
                dispatch(logOut())
            })
        }
    }, [dispatch]);

    return isLogged ? (<>
        <button onClick={() => { console.log('work'); dispatch(logOut()) }}>logOut</button>
        you are in
    </>) :
        (<>
            <Switch>
                <Route exact path="/">
                    <LogIn />
                </Route>
                <Route exact path="/sign-up">
                    <SignUp />
                </Route>
                <Redirect to="/" />
            </Switch>
        </>)
}