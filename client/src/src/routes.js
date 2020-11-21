import {Switch, Route, Redirect } from 'react-router-dom'
import MainPage from "./pages/main/MainPage";
import AuthPage from "./pages/auth/AuthPage";
import AddPage from "./pages/add/AddPage";
import LessonsPage from "./pages/lessons/LessonsPage";

export const useRotes = (isAuth)=>{
    if(isAuth){
        return(
            <Switch>
                <Route path='/' exact>
                    <MainPage/>
                </Route>
                <Route path='/add' exact>
                    <AddPage/>
                </Route>
                <Route path='/lessons' exact>
                    <LessonsPage/>
                </Route>
                <Redirect to='/' />
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path='/' exact>
                <AuthPage/>
            </Route>
            <Redirect to='/'/>
        </Switch>
    )
}