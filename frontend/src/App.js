import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import LoginPage from './pages/LoginPage/LoginPage'
import AdminPage from './pages/AdminPage/AdminPage'
import LandingPage from './pages/LandingPage/LandingPage'
import NoPage from './pages/NoPage/NoPage'
import AdminProductPage from './pages/AdminProductPage/AdminProductPage';
import AdminHistoryPage from './pages/AdminHistoryPage/AdminHistoryPage';
import AdminAccountPage from './pages/AdminAccountPage/AdminAccountPage';
import AdminProfilePage from './pages/AdminProfilePage/AdminProfilePage';
import AdminTransPage from './pages/AdminTransPage/AdminTransPage';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
