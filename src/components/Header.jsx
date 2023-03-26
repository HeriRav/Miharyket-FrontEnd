import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import { useState, useEffect, useContext } from 'react'
import { Button, Navbar } from 'react-bootstrap'
import Product from '../pages/Product'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Contact from '../pages/Contact'
import { MDBIcon } from 'mdb-react-ui-kit'
import Cart from '../pages/Cart'

const Header = () => {

  const activeLink = 'nav-link text-left active'
  const normalLink = 'nav-link text-left'

  const prenom = sessionStorage.getItem("prenom");
  const nom = sessionStorage.getItem("nom");
  const userEmail = nom +" " + prenom;

  // const util = userEmail.nomUtilisateur

  const [email, setEmail] = useState("")
  const [counter, setCounter] = useState(localStorage.getItem("nb_article"))
  const EndSession = () => {
    sessionStorage.clear()
    localStorage.clear()
    window.location.reload(true)
  }

  // Fonction de vérification de l'authentification de l'utilisateur
  const isAuthenticated = () => {
    // Vérifie si l'utilisateur est authentifié (par exemple, en vérifiant si un jeton JWT est présent dans le stockage local ou de session)
    // Retourne true si l'utilisateur est authentifié, false sinon
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    return !!token && !!username;
  }

  return (
    <>
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>

      <div className="header-top bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 col-lg-3">
              <Link to="/" className="logo">
                <img src="mihary_logo.png" alt="Image" width="50%" className="img-fluid"/>
              </Link>
            </div>
            <div className="col-lg-3 d-none d-lg-block">
              <div className="quick-contact-icons d-flex align-items-center">
                <div className="icon align-self-center mt-3">
                  <span className="icon-room text-primary"></span>
                </div>
                <div className="text">
                  <span className="h4 d-block">Antananarivo</span>
                  <span className="caption-text">Faravohitra</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 d-none d-lg-block">
              <div className="quick-contact-icons d-flex align-items-center">
                <div className="icon align-self-center mt-3">
                  <span className="icon-phone text-primary"></span>
                </div>
                <div className="text">
                  <span className="h4 d-block">+261 34 34 022 89</span>
                  <span className="caption-text">Contact</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 d-none d-lg-block">
              <div className="quick-contact-icons d-flex align-items-center">
                <div className="icon align-self-center mt-3">
                  <span className="icon-envelope text-primary"></span>
                </div>
                <div className="text">
                  <span className="h4 d-block">contact@mihary.com</span>
                  <span className="caption-text">Email</span>
                </div>
              </div>
            </div>

            <div className="col-6 d-block d-lg-none text-right">
              <a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black"><span
                className="icon-menu h3"></span></a>
            </div>
          </div>

        </div>

        <div className="site-navbar py-2 js-sticky-header site-navbar-target d-none pl-0 d-lg-block" role="banner">
    
          <div className="container">

            {sessionStorage.getItem("username") === null ? (
              <div className="d-flex align-items-center">
              
                <div className="ms-auto">
                  <div className="site-navigation position-relative text-right" role="navigation">
                    <ul className="site-menu main-menu js-clone-nav mr-auto d-none pl-0 d-lg-block">
                      <li>
                        <NavLink to="/" className={({isActive}) => isActive ? activeLink : normalLink}>Accueil</NavLink>
                      </li>
                      <li>
                        <NavLink to="/a-propos" className={({isActive}) => isActive ? activeLink : normalLink}>À propos</NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact" className={({isActive}) => isActive ? activeLink : normalLink}>Contact</NavLink>
                      </li>
                      <li>
                        <NavLink to='/produits' className={({isActive}) => isActive ? activeLink : normalLink}>Produits</NavLink>
                      </li>
                    </ul>                                                                                                                                                                                                                                                                                          
                  </div>
                </div>
  
                <div className="ml-auto">
                  <div className="site-navigation position-relative text-right" role="navigation">
                      <ul className="site-menu main-menu js-clone-nav mr-auto d-none pl-0 d-lg-block">
                        <li>
                          <Link to='/inscription' className="nav-link text-left">S'inscrire</Link>
                        </li>
                        <li className='login-style'>
                          <Link to="/authentification" className="nav-link text-left text-white">
                            Se connecter
                          </Link>
                        </li>
                      </ul>
                  </div>
                </div>
  
              </div>
            ) : (
              <div className="d-flex align-items-center">               
              
                <div className="ms-auto">
                  <div className="site-navigation position-relative text-right" role="navigation">
                    <ul className="site-menu main-menu js-clone-nav mr-auto d-none pl-0 d-lg-block">
                      <li>
                        <NavLink to="/" className={({isActive}) => isActive ? activeLink : normalLink}>Accueil</NavLink>
                      </li>
                      <li>
                        <NavLink to="/a-propos" className={({isActive}) => isActive ? activeLink : normalLink}>À propos</NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact" className={({isActive}) => isActive ? activeLink : normalLink}>Contact</NavLink>
                      </li>
                      <li>
                        <NavLink to='/produits' className={({isActive}) => isActive ? activeLink : normalLink}>Produits</NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
  
                <div className="ml-auto">
                  <div className="site-navigation position-relative text-right" role="navigation">
                    {sessionStorage.getItem('typeUser') === "CLIENT" ? (
                      <ul className="site-menu main-menu js-clone-nav mr-auto d-none pl-0 d-lg-block">
                        <li>
                          <Link className="nav-link text-left text-white">
                          <div className="btn-group">                            
                            <nav type="button" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <img src='../src/images/user-reverse.png' width={24} height={24} alt='profil'/>&nbsp;
                              {userEmail}
                            </nav>
                            <div className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-user fa-sm fa-fw mr-2"></i>
                                  Profil
                                </a>
                                <div className="dropdown-divider"></div>
                                <Link onClick={EndSession} className="dropdown-item">
                                  <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2'></i>
                                  Se déconnecter
                                </Link>
                              </li>
                            </div>
                          </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/panier">
                            <MDBIcon fas icon="fa-solid fa-shopping-cart fa-lg" style={{ color: '#fff', position : "relative"}}/>
                            <div className='rounded-circle bg-danger d-flex justify-content-center aligh-items-center' 
                            style={{width : "1.5rem", height : "1.5rem", position : "absolute", bottom : "0", right : "0", transform : "translate(-25%, -25%)", color : "white"}}>
                              2
                            </div>
                          </Link>
                        </li>
                      </ul>
                    ) : sessionStorage.getItem("typeUser") === "COOPERATIVE" ? (
                      <ul className="site-menu main-menu js-clone-nav mr-auto d-none pl-0 d-lg-block">
                        <li>
                          <Link className="nav-link text-left text-white">
                          <div className="btn-group">                            
                            <nav type="button" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <img src='../src/images/user-reverse.png' width={24} height={24} alt='profil'/>&nbsp;
                              {nom}
                            </nav>
                            <div className="dropdown-menu">
                              <li>
                                <Link to='/dashboard-coop' className="dropdown-item">
                                  <i className="fas fa-chart-pie fa-sm fa-fw mr-2"></i>
                                  Tableau de bord
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link onClick={EndSession} className="dropdown-item">
                                  <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2'></i>
                                  Se déconnecter
                                </Link>
                              </li>
                            </div>
                          </div>
                          </Link>
                        </li>
                      </ul>
                    ) : sessionStorage.getItem("typeUser") === "AGRICULTEUR" ? (
                      <ul className="site-menu main-menu js-clone-nav mr-auto d-none pl-0 d-lg-block">
                        <li>
                          <Link className="nav-link text-left text-white">
                          <div className="btn-group">                            
                            <nav type="button" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <img src='../src/images/user-reverse.png' width={24} height={24} alt='profil'/>&nbsp;
                              {nom}
                            </nav>
                            <div className="dropdown-menu">
                              <li>
                                <Link to='/dashboard-aggro' className="dropdown-item">
                                  <i className="fas fa-chart-pie fa-sm fa-fw mr-2" beat></i>
                                  Tableau de bord
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link onClick={EndSession} className="dropdown-item">
                                  <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2'></i>
                                  Se déconnecter
                                </Link>
                              </li>
                            </div>
                          </div>
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      <ul className="site-menu main-menu js-clone-nav mr-auto d-none pl-0 d-lg-block">
                        <li>
                          <Link className="nav-link text-left text-white">
                          <div className="btn-group">                            
                            <nav type="button" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <img src='../src/images/user-reverse.png' width={24} height={24} alt='profil'/>&nbsp;
                              {nom}
                            </nav>
                            <div className="dropdown-menu">
                              <li>
                                <Link to='/dashboard' className="dropdown-item">
                                  <i className="fas fa-chart-pie fa-sm fa-fw mr-2" beat></i>
                                  Tableau de bord
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link onClick={EndSession} className="dropdown-item">
                                  <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2'></i>
                                  Se déconnecter
                                </Link>
                              </li>
                            </div>
                          </div>
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
  
              </div>
            )}

          </div>

        </div>
      </div>

      {/* <Avatar size="small" icon={<UserOutlined />} /> */}
  
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/a-propos' element={<About />}/>
          <Route path='/produits' element={<Product/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/panier' element={isAuthenticated() ? <Cart /> : <Navigate to='/authentification/login' />}/>
        </Routes>
      </>
  )
}

export default Header