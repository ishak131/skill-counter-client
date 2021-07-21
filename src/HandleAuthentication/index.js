import { Route, Redirect, Switch } from "react-router-dom"
import LogIn from '../views/auth/LogIn';
import SignUp from '../views/auth/SignUp';
import {useSelector } from 'react-redux'
import Form from "./Form/Form"
import Lists from "./Lists/Lists"



export default function HandleAuthentication() {

   
    const isLogged = useSelector(state => state.authReducer);

   



    return isLogged ? (<>
       
        <Form />
        <Lists />
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