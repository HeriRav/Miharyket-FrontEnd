import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
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
import AjoutProduit from './pages/Agriculteur/AjoutProduit'
import ListProduit from './components/ProduitsList'
import ListAgriculteur from './components/ListAgriculteur'
import Register_coop from './pages/Register-coop'
import CooperativeList from './components/CooperativeList'
import UserList from './components/UserList'
import Product from './pages/Product'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Portefeuille from './pages/Agriculteur/Portefeuille'
import Coop from './pages/Client/Coop'

// Fonction de vérification de l'authentification de l'utilisateur
const isAuthenticated = () => {
  // Vérifie si l'utilisateur est authentifié (par exemple, en vérifiant si un jeton JWT est présent dans le stockage local ou de session)
  // Retourne true si l'utilisateur est authentifié, false sinon
  const token = sessionStorage.getItem('token');
  const username = sessionStorage.getItem('username');
  return !!token && !!username;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/ >}>
        <Route index element={<Home />}/>
        <Route path='/a-propos' element={<About />}/>
        <Route path='/produits' element={<Product />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/panier' element={isAuthenticated() ? <Cart /> : <Navigate to='/authentification/login' />}/>
        <Route path='/cooperatives' element={isAuthenticated() ? <Coop /> : <Navigate to='/authentification/login' />}/>
      </Route>

      <Route path='/authentification/*' element={<Login />}/>
      <Route path='/inscription/*' element={<Register />}/>
      <Route path='/inscription-coop/*' element={<Register_coop />}/>
      <Route path='/inscription-client/*' element={<Register_client />}/>

      {/* Routes protégées */}
      <Route path='/dashboard' element={isAuthenticated() ? <DashboardAdmin /> : <Navigate to='/authentification/login' />} />
      <Route path='/listProduit' element={isAuthenticated() ? <ListProduit /> : <Navigate to='/authentification/login' />} />
      <Route path='/listAgriculteurs' element={isAuthenticated() ? <ListAgriculteur /> : <Navigate to='/authentification/login' />} />
      <Route path='/portefeuille' element={isAuthenticated() ? <Portefeuille /> : <Navigate to='/authentification/login' />} />
      <Route path='/ajoutProduit' element={isAuthenticated() ? <AjoutProduit /> : <Navigate to='/authentification/login' />} />
      <Route path='/dashboard-coop' element={isAuthenticated() ? <DashboardCooperative /> : <Navigate to='/authentification/login' />} />
      <Route path='/dashboard-aggro' element={isAuthenticated() ? <DashboardAgriculteur /> : <Navigate to='/authentification/login' />} />
      {/* <Route path='*' element={<Error404/>}/> */}
    </Routes>
  </BrowserRouter>,
)
