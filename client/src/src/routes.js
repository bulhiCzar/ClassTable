import {Switch, Route, Redirect } from 'react-router-dom'
import MainPage from "./pages/main/MainPage";
import AuthPage from "./pages/auth/AuthPage";
import AddPage from "./pages/add/AddPage";
import LessonsPage from "./pages/lessons/LessonsPage";
import MailPage from "./pages/mail/MailPage";

export const useRotes = (isAuth)=>{
    if(isAuth){
        return(
            <Switch>
                <Route path='/main' exact>
                    <MainPage/>
                </Route>
                <Route path='/add' exact>
                    <AddPage/>
                </Route>
                <Route path='/lessons' exact>
                    <LessonsPage/>
                </Route>
                <Redirect to='/main' />
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path='/' exact>
                <AuthPage/>
            </Route>
            <Route path='/mail/:id'>
                <MailPage/>
            </Route>
            <Redirect to='/'/>
        </Switch>
    )
}