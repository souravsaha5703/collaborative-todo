import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Register from './Pages/Authentication/Register';
import Login from './Pages/Authentication/Login';
import Todos from './Pages/Dashboard/Todos';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='todos' element={<Todos />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;