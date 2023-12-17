import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import LoginPage from './pages/LoginPage/LoginPage.jsx'
import AdminPage from './pages/AdminPage/AdminPage.jsx'
import LandingPage from './pages/LandingPage/LandingPage.jsx'
import NoPage from './pages/NoPage/NoPage.jsx'
import AdminProductPage from './pages/AdminProductPage/AdminProductPage.jsx';
import AdminHistoryPage from './pages/AdminHistoryPage/AdminHistoryPage.jsx';
import AdminAccountPage from './pages/AdminAccountPage/AdminAccountPage.jsx';
import AdminProfilePage from './pages/AdminProfilePage/AdminProfilePage.jsx';
import AdminTransPage from './pages/AdminTransPage/AdminTransPage.jsx';
import Layout from './Components/Login/Layout.jsx';
import RequireAuth from './Components/Login/RequireAuth.js';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>

            <Route index element={<LandingPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>

            <Route element={<RequireAuth/>}>
              <Route path='/admin' element={<AdminPage/>}/>
              <Route path='/admin/history' element={<AdminHistoryPage/>}/>
              <Route path='/admin/transaction' element={<AdminTransPage/>}/>

              <Route path='/admin/product' element={<AdminProductPage/>}/>
              <Route path='/admin/account' element={<AdminAccountPage/>}/>
              <Route path='/admin/profile' element={<AdminProfilePage/>}/>
            </Route>

            <Route path='*' element={<NoPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
