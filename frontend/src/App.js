import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import LoginPage from './pages/LoginPage/LoginPage'
import AdminPage from './pages/AdminPage/AdminPage'
import LandingPage from './pages/LandingPage/LandingPage'
import NoPage from './pages/NoPage/NoPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/admin' element={<AdminPage/>}/>
          <Route path='*' element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
