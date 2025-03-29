import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Register from './Pages/Authentication/Register';
import Login from './Pages/Authentication/Login';
import Dashboard from './Pages/Main/Dashboard';
import AllTodos from './Pages/Main/AllTodos';
import TodoAnalytics from './Pages/Main/TodoAnalytics';
import Teams from './Pages/Main/Teams/Teams';
import TeamDashboard from './Pages/Main/Teams/TeamDashboard';
import TeamMembers from './Pages/Main/Teams/TeamMembers';
import Profile from './Pages/Main/Profile';
import ProtectedRoutes from './ProtectedRoutes';
import Page from './Pages/LandingPage/Page';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='' element={<Page />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='/user' element={<ProtectedRoutes />}>
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='all_todos' element={<AllTodos />} />
                        <Route path='analytics' element={<TodoAnalytics />} />
                        <Route path='teams' element={<Teams />} />
                        <Route path='teams/team_dashboard/:team_id' element={<TeamDashboard />} />
                        <Route path='teams/team_dashboard/:team_id/members' element={<TeamMembers />} />
                        <Route path='profile' element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;