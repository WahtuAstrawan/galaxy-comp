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

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/admin' element={<AdminPage/>}/>
          <Route path='/admin/product' element={<AdminProductPage/>}/>
          <Route path='/admin/history' element={<AdminHistoryPage/>}/>
          <Route path='/admin/account' element={<AdminAccountPage/>}/>
          <Route path='/admin/profile' element={<AdminProfilePage/>}/>
          <Route path='/admin/transaction' element={<AdminTransPage/>}/>
          <Route path='*' element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
