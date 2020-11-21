import {ToastProvider} from 'react-toast-notifications'

import NavPage from "./src/pages/nav/NavPage"
import {useAuth} from "./src/hooks/auth.hooks"
import {useRotes} from "./src/routes"
import './App.css'
import {AuthContext} from "./src/context/auth.contexnt";
import {BrowserRouter} from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import HeaderPage from "./src/pages/header/HeaderPage";



function App() {

    const {login, logout, token, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRotes(isAuthenticated)



    if (!ready){
        return(
            <LinearProgress />
        )
    }

    return (
        <AuthContext.Provider value={{login, logout, token}}>
            <ToastProvider>
                <BrowserRouter>
                <div className="wrapper_app">
                    {isAuthenticated && <HeaderPage/>}
                    <div className="wrapper_pages">
                        {isAuthenticated && <NavPage/>}

                        {/*<MainPage/>*/}
                        {/*<Lessons/>*/}
                        {/*<AddPage/>*/}
                        {routes}
                    </div>
                </div>
                </BrowserRouter>
            </ToastProvider>
        </AuthContext.Provider>
    )
}

export default App;
