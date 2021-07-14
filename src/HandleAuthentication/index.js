import { Route, Redirect, Switch } from "react-router-dom"
import LogIn from '../views/auth/LogIn';
import SignUp from '../views/auth/SignUp';
import { useEffect } from 'react'
import Cookies from "js-cookie";


export default function HandleAuthentication() {

    useEffect(() => {
        const token = Cookies.get()
    }, []);

    const isLogged = false
    return isLogged ? (<>

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