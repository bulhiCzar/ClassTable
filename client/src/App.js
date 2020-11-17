import './App.css'
import AuthPage from "./src/pages/auth/AuthPage"
import { ToastProvider } from 'react-toast-notifications'


function App() {
    return (
        <ToastProvider>
            <div className="wrapper_app">
                <AuthPage/>
            </div>
        </ToastProvider>
    );
}

export default App;
