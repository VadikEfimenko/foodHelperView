import './App.css'
import { Header } from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { UserInfo } from './components/UserInfo/UserInfo';
import { Login } from "./components/Login/Login";
import { AuthProvider } from './context/AuthProvider';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path="/admin/login" element={<Login /> }/>
                    <Route path="/admin/" element={<Main /> }/>
                    <Route path="/admin/user/:id" element={<UserInfo /> }/>

                    <Route element={<PrivateRoute />}>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
