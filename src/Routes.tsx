import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Register from './Pages/Authentication/Register';
import Login from './Pages/Authentication/Login';
import Todos from './Pages/Dashboard/Todos';
import ProtectedRoutes from './ProtectedRoutes';
import Page from './Pages/LandingPage/Page';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='' element={<Page/>}/>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='/user' element={<ProtectedRoutes />}>
                        <Route path='todos' element={<Todos />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;