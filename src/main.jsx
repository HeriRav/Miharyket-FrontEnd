import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'
import About from './pages/About'
import DashboardAdmin from './pages/Administrateur/DashboardAdmin'
import DashboardCooperative from './pages/Cooperative/DashboardCooperative'
import DashboardAgriculteur from './pages/Agriculteur/DashboardAgriculteur'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Register_client from './pages/Register-client'
import Register_coop from './pages/Register-coop'
import Product from './pages/Product'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/ >}>
        <Route index element={<Home />}/>
        <Route path='/a-propos' element={<About />}/>
        <Route path='/produits' element={<Product />}/>
      </Route>
      <Route path='/authentification/*' element={<Login />}/>
      <Route path='/inscription/*' element={<Register />}/>
      <Route path='/inscription-coop/*' element={<Register_coop />}/>
      <Route path='/inscription-client/*' element={<Register_client />}/>
      <Route path='/dashboard' element={<DashboardAdmin />}/>
      <Route path='/dashboard-coop' element={<DashboardCooperative />}/>
      <Route path='/dashboard-aggro' element={<DashboardAgriculteur />}/>
      {/* <Route path='*' element={<Error404/>}/> */}
    </Routes>
  </BrowserRouter>,
)
