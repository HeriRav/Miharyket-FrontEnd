import './App.css'
import Layout from './components/Layout'
import './css/aos.css'
import './css/style.css'
import './css/login-style.css'
// import './css/bootstrap.min.css'
import './css/jquery-ui.css'
import './css/jquery.fancybox.min.css'
import './css/owl.carousel.min.css'
import './css/owl.theme.default.min.css'
import './css/bootstrap-datepicker.css'
import './fonts/flaticon/font/flaticon.css'
import './fonts/icomoon/style.css'
import ListAgriculteur from './components/ListAgriculteur'
import ProduitsList from './components/ProduitsList'
import UserList from './components/UserList'
import CooperativeList from './components/CooperativeList'
import { createContext, useState } from 'react'
import Home from './pages/Home'
import Header from './components/Header'

export const NotificationProduit = createContext(0)

function App() {
  const [counter, setCounter] = useState(localStorage.getItem("nb_article") != null ? Number.parseInt(localStorage.getItem("nb_article")): 0)
  return (
    <>
    <NotificationProduit.Provider value={{counter, setCounter}}>
      <Layout />
      <CooperativeList/>
      <UserList/>
    </NotificationProduit.Provider>
    </>
  )
}

export default App
