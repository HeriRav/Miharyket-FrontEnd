import { Link, Route, Routes, useNavigate } from 'react-router-dom';
//import '../css/register-style.css'
import React from 'react';
import { useState } from 'react';
import '../../css/dashboardCooperative.css'
import miharyImage from "../../../mihary_logo_dark.png";
import DashboardFooter from './DashboardFooter'
import ProduitsList from '../../components/ProduitsList';
import PaiementAgriculteur from './PaiementAgriculteur';
import ListeMembre from './ListeMembre';
import StatCooperative from './StatCooperative';
import ApprovisionementProduitCooperative from './ApprovisionnementProduitCooperative';
import AjouterProduit from './AjouterProduit';
import ListAgriculteur from '../../components/ListAgriculteur';

function Dashboard() {
   const idCooperative = sessionStorage.getItem("idUser");

   const nom = sessionStorage.getItem("nom")
   
    const [activeMenu, setActiveMenu] = useState(0);
    
    const handleMenu0Click = () => {
        setActiveMenu(0);
    };

    const handleMenu1Click = () => {
        setActiveMenu(1);
        };
    
    const handleMenu2Click = () => {
        setActiveMenu(2);
    };
    
    const handleMenu3Click = () => {
        setActiveMenu(3);
    };
    
    const handleMenu4Click = () => {
        setActiveMenu(4);
    };
      
    const refresh = () => {
        navigate('/')
        window.location.reload(true)
    }
       
    let navigate = useNavigate()
    const change = () => {
    sessionStorage.clear()
    localStorage.clear()
    window.location.reload(true)
    let path = '/'
    navigate(path)
  }
    return (
        <>
        <title>Mihary'ket - Dashboard Coopérative</title>
        <ProduitsList/>
        <ListAgriculteur />
        <div id="wrapper" className='side'>
        <ul className="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion sidenav" id="accordionSidebar">
            <div className="sidebar-brand d-flex align-items-center justify-content-center">
            <Link onClick={refresh}>
            <div className="sidebar-brand-icon">
                <img src={miharyImage} alt="Mihary" className="img-fluid" />
            </div>
            </Link>
            </div>
            <hr className="sidebar-divider my-0"/>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard-coop" onClick={handleMenu0Click}>
                    <i className="fas fa-fw fa-tachometer-alt" style={{fontSize: '1.05em'}}></i>
                    <span className="img-fluid d-md-none" style={{fontSize: '0.8em'}}>Coopérative</span>
                    <span className="img-fluid d-none d-md-inline d-lg-none" style={{fontSize: '0.9em'}}>Coopérative</span>
                    <span className="img-fluid d-none d-lg-inline" style={{fontSize: '1.05em'}}>Coopérative</span>
                </Link>
            </li>

          
            <hr className="sidebar-divider"/>
            <div className="sidebar-heading">
                Agriculteur
            </div>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard-coop" onClick={handleMenu1Click}>
                    <i className="fas fa-fw fa fa-users"></i>
                    <span>Membres</span>
                </Link>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Components:</h6>
                        <a className="collapse-item" href="buttons.html">Buttons</a>
                        <a className="collapse-item" href="cards.html">Cards</a>
                    </div>
                </div>
            </li>
            <li className="nav-item">
                <Link className="nav-link " to="/dashboard-coop" onClick={handleMenu2Click}>
                    <i className="fas fa-fw fa fa-credit-card"></i>
                    <span>Paiement</span>
                </Link>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Utilities:</h6>
                        <a className="collapse-item" href="utilities-color.html">Colors</a>
                        <a className="collapse-item" href="utilities-border.html">Borders</a>
                        <a className="collapse-item" href="utilities-animation.html">Animations</a>
                        <a className="collapse-item" href="utilities-other.html">Other</a>
                    </div>
                </div>
            </li>
            <hr className="sidebar-divider"/>
            <div className="sidebar-heading">
                Produit
            </div>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard-coop" onClick={handleMenu4Click}
                    aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-shopping-bag"></i>
                    <span>Produits</span>
                </Link>
                <Link className="nav-link" to="/dashboard-coop" onClick={handleMenu3Click}
                    aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-shopping-bag"></i>
                    <span>Approvisionnement</span>
                </Link>
            </li>
           
            
            <hr className="sidebar-divider d-none d-md-block"/>
            

        </ul>
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>
                    <form
                        className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div className="input-group">
                            <input type="text" className="form-control bg-light border-0 small" placeholder="Rechercher..."
                                aria-label="Search" aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown no-arrow d-sm-none">
                            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-search fa-fw"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown">
                                <form className="form-inline mr-auto w-100 navbar-search">
                                    <div className="input-group">
                                        <input type="text" className="form-control bg-light border-0 small"
                                            placeholder="Search for..." aria-label="Search"
                                            aria-describedby="basic-addon2"/>
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-arrow mx-1">
                            <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-bell fa-fw"></i>
                                <span className="badge badge-danger badge-counter">3+</span>
                            </a>
                            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="alertsDropdown">
                                <h6 className="dropdown-header">
                                    Alerts Center
                                </h6>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-primary">
                                            <i className="fas fa-file-alt text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 12, 2019</div>
                                        <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-success">
                                            <i className="fas fa-donate text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 7, 2019</div>
                                        $290.29 has been deposited into your account!
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-warning">
                                            <i className="fas fa-exclamation-triangle text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 2, 2019</div>
                                        Spending Alert: We've noticed unusually high spending for your account.
                                    </div>
                                </a>
                                <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-arrow mx-1">
                            <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-envelope fa-fw"></i>
                                <span className="badge badge-danger badge-counter">7</span>
                            </a>
                            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="messagesDropdown">
                                <h6 className="dropdown-header">
                                    Message Center
                                </h6>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        {/* <img className="rounded-circle" src="img/undraw_profile_1.svg"
                                            alt="..."/> */}
                                        <div className="status-indicator bg-success"></div>
                                    </div>
                                    <div className="font-weight-bold">
                                        <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                            problem I've been having.</div>
                                        <div className="small text-gray-500">Emily Fowler · 58m</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        {/* <img className="rounded-circle" src="img/undraw_profile_2.svg"
                                            alt="..."/> */}
                                        <div className="status-indicator"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">I have the photos that you ordered last month, how
                                            would you like them sent to you?</div>
                                        <div className="small text-gray-500">Jae Chun · 1d</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        {/* <img className="rounded-circle" src="img/undraw_profile_3.svg"
                                            alt="..."/> */}
                                        <div className="status-indicator bg-warning"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">Last month's report looks great, I am very happy with
                                            the progress so far, keep up the good work!</div>
                                        <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                            alt="..."/>
                                        <div className="status-indicator bg-success"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                            told me that people say this to all dogs, even if they aren't good...</div>
                                        <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                    </div>
                                </a>
                                <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                            </div>
                        </li>

                        <div className="topbar-divider d-none d-sm-block"></div>
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{nom}</span>
                                <img src='../src/images/user.png' width={24} height={24} alt='profil'/>
                            </a>
                            
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <a className="dropdown-item" href="#">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profil
                            </a>
                            
                            
                            <a className="dropdown-item dropdown-item-button" href="#" onClick={change}>
                                <Link className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></Link>
                                Déconnexion
                            </a>
                            </div>

                        </li>

                    </ul>

                </nav>
                <div className="container-fluid">
                {activeMenu === 0 && <StatCooperative />}
                {activeMenu === 1 && <ListeMembre />}
                {activeMenu === 2 && <PaiementAgriculteur />}
                {activeMenu === 3 && <ApprovisionementProduitCooperative/>}
                {activeMenu === 4 && <AjouterProduit/>}
               
                <DashboardFooter></DashboardFooter>
                </div>
            

        </div>

        </div>
      </div>
      </>
    )
  }
  
export default Dashboard