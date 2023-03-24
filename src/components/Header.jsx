import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import { useState, useEffect } from 'react'
import { Navbar } from 'react-bootstrap'
import Product from '../pages/Product'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Contact from '../pages/Contact'

const Header = () => {

  const activeLink = 'nav-link text-left active'
  const normalLink = 'nav-link text-left'

  const userLname = sessionStorage.getItem("nom")
  const userFname = sessionStorage.getItem("prenom")

  // const util = userEmail.nomUtilisateur

  const [email, setEmail] = useState("")

  const EndSession = () => {
    sessionStorage.clear()
    localStorage.clear()
    window.location.reload(true)
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
                          <NavLink to='/contact' className={({isActive}) => isActive ? activeLink : normalLink}>Contact</NavLink>
                        </li>
                        <li>
                          <NavLink to='/produits' className={({isActive}) => isActive ? activeLink : normalLink}>Produits</NavLink>
                        </li>
                      </ul>                                                                                                                                                                                                                                                                                          
                    </div>
                  </div>
    
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
                        <NavLink to="/contact" className="nav-link text-left">Contact</NavLink>
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
                        <li>
                          <Link to="/dashboard-aggro" className="nav-link text-left">Aggro</Link>
                        </li>
                        <li>
                          <Link to='/dashboard' className="nav-link text-left">Admin</Link>
                        </li>
                       
                        <li>
                          <NavLink to='/produits' className={({isActive}) => isActive ? activeLink : normalLink}>Produits</NavLink>
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
                        <Link to="/dashboard-coop" className="nav-link text-left">Coop</Link>
                      </li>
                      <li>
                        <Link to="/dashboard-aggro" className="nav-link text-left">Aggro</Link>
                      </li>
                      <li>
                        <Link to='/dashboard' className="nav-link text-left">Admin</Link>
                      </li>
                      <li>
                        <NavLink to="/contact" className="nav-link text-left">Contact</NavLink>
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
                        <li className=''>
                          <Link className="nav-link text-left text-white">
                          {/* <span><Avatar size="small" icon={<UserOutlined />} /> {userLname} {userFname}</span> */}
                          <div class="btn-group">
                            
                            <nav type="button" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <Avatar size="small" icon={<UserOutlined />} /> {userLname} {userFname}
                            </nav>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="#">Profil</a>
                              <a class="dropdown-item" href="#">Panier</a>
                              <a class="dropdown-item" href="#">Here</a>
                              <div class="dropdown-divider"></div>
                              <Link onClick={EndSession} className="dropdown-item">
                                Se déconnecter
                              </Link>
                            </div>
                          </div>
                          </Link>
                        </li>
                      </ul>
                  </div>
                </div>
  
              </div>
            )}

          </div>

        </div>
      </div>
  
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/a-propos' element={<About />}/>
          <Route path='/produits' element={<Product/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </>
  )
}

export default Header