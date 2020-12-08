import {ToastProvider} from 'react-toast-notifications'
import NavPage from "./src/pages/nav/NavPage"
import {useAuth} from "./src/hooks/auth.hooks"
import {useRotes} from "./src/routes"
import {AuthContext} from "./src/context/AuthContext";
import {BrowserRouter} from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import HeaderPage from "./src/pages/header/HeaderPage";
import {useHttp} from "./src/hooks/http.hooks";
import GD from "./GD";
import {DataContext} from "./src/context/DataContext";
import {useData} from "./src/hooks/data.hooks";
import './App.css'


function App() {

    const {login, logout, token, ready, name, role} = useAuth()
    const {students, lessons, teacher, loading, reload} = useData({role, name, token})
    const isAuthenticated = !!token
    const routes = useRotes(isAuthenticated)

    const {request} = useHttp()
    const {state} = GD()

    if (!ready) {
        return (
            <LinearProgress/>
        )
    }
    return (
        <AuthContext.Provider value={{login, logout, token, name, role}}>
            <ToastProvider>
                <BrowserRouter>
                    <div className="wrapper_app">
                        {/*{!loading && <LinearProgress className='progressLine' style={{position: 'absolute', top: '0', bottom: '0', left: '0', right: '0'}}/>}*/}
                        {isAuthenticated && <HeaderPage loading={loading}/>}


                        <DataContext.Provider value={{lessons, students, teacher, reload}}>
                            <div className="wrapper_pages">
                                {isAuthenticated && <NavPage loading={loading}/>}



                                {/*<MainPage/>*/}
                                {/*<Lessons/>*/}
                                {/*<AddPage/>*/}
                                {routes}
                            </div>
                        </DataContext.Provider>
                    </div>
                </BrowserRouter>
            </ToastProvider>
        </AuthContext.Provider>
    )
}

export default App;
