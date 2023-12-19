import './App.css';
import { Routes, Route} from 'react-router-dom'

import LoginPage from './pages/LoginPage/LoginPage.jsx'
import AdminPage from './pages/AdminPage/AdminPage.jsx'
import LandingPage from './pages/LandingPage/LandingPage.jsx'
import NoPage from './pages/NoPage/NoPage.jsx'
import AdminProductPage from './pages/AdminProductPage/AdminProductPage.jsx';
import AdminHistoryPage from './pages/AdminHistoryPage/AdminHistoryPage.jsx';
import AdminAccountPage from './pages/AdminAccountPage/AdminAccountPage.jsx';
import AdminProfilePage from './pages/AdminProfilePage/AdminProfilePage.jsx';
import AdminTransPage from './pages/AdminTransPage/AdminTransPage.jsx';
import { RequireAuth } from './Components/Login/RequireAuth.js';
import Layout from './Components/Login/Layout.js';

function App() {
  return (
        <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<LandingPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>

              <Route element={<RequireAuth allowedRoles={['7134', '4169']}/>}>
                <Route path='/admin' element={<AdminPage/>}/>
                <Route path='/admin/history' element={<AdminHistoryPage/>}/>
                <Route path='/admin/transaction' element={<AdminTransPage/>}/>
                <Route path='/admin/profile' element={<AdminProfilePage/>}/>
              </Route>

              <Route element={<RequireAuth allowedRoles={['7134']}/>}>
                <Route path='/admin/product' element={<AdminProductPage/>}/>
                <Route path='/admin/account' element={<AdminAccountPage/>}/>
                <Route path='/admin/profile' element={<AdminProfilePage/>}/>
              </Route>
              <Route path='*' element={<NoPage/>}/>
            </Route>
        </Routes>
  );
}

export default App;
