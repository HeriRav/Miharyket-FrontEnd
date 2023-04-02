import { useEffect } from "react";
import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBCardGroup,
    MDBRow,
    MDBCol,
    MDBContainer,
    MDBBtn,
    MDBTypography 
  } from 'mdb-react-ui-kit';
import { Button, Modal } from "react-bootstrap";
import Mapping from "../Mapping";

function Coop () {
    const [members, setMembers] = useState([]);
    const [product, setProduct] = useState([])
    const [allProduct, setAllProduct] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8085/api/utilisateurs/agriculteurs`)
            .then((response) => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setMembers(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // useEffect(() => {
    //     const idAggro = sessionStorage.getItem('idAggro')
    //     fetch(`http://localhost:8085/approvisionnements/agriculteur/` + idAggro)
    //     .then((response) => response.json())
    //     .then((data) => setProduct(data))
    //     .catch((error) => console.log(error))
    // },[]);

    // useEffect(() => {
    //     const idCoop = sessionStorage.getItem('idCoop')
    //     fetch(`http://localhost:8085/produits/cooperative/${idCoop}`)
    //     .then((response) => response.json())
    //     .then((data) => setAllProduct(data))
    //     .catch((err) => console.log(err));
    // }, []);

    // const Mapping = () => {

    //     const location = {
    //         address: 'Antsirabe',
    //         lat:  -19.873874,
    //         lng:  47.031963
    //       } 
      
    //     return ( 
    //         <Map location={location} zoomLevel={15} />
    //     );
    // }

    const Mapp = () => {
        navigate('/map')
    }

    members.sort((a, b) => b.id - a.id);

    return(
        <>
            <title>Mihary'ket - Nos agriculteurs</title>
            <ToastContainer />
            <div
                className="intro-section site-blocks-cover innerpage"
                style={{ backgroundImage: "url('/src/images/hero_5.jpg')" }}
            >
                <div className="container">
                <div className="row align-items-center text-center">
                    <div className="col-lg-12 mt-5" data-aos="fade-up">
                    <h1>Nos agriculteurs</h1>
                    <p className="text-white text-center">
                        <Link to="/">Accueil</Link>
                        <span className="mx-2">/</span>
                        <span>Agriculteurs</span>
                    </p>
                    </div>
                </div>
                </div>
            </div>

            <MDBRow className='row-cols-1 row-cols-md-3 g-4 mt-4 mb-4'>
                {members.map((aggro) => (
                    <MDBCol key={aggro.id}>
                        <MDBCard className='h-100 text-center' style={{backgroundColor : "#ebebeb"}}>
                        <div className="mt-3 mb-4">
                        <MDBCardImage
                            src='../src/images/user_profile.png'
                            alt='Profil'
                            position='top' className="rounded-circle img-fluid" style={{width : "100px"}}
                        />
                        </div>
                        <MDBCardBody>
                            <MDBCardTitle className="text-black">{aggro.nomUtilisateur} (<span className="text-warning">{aggro.adresseUtilisateur}</span>)</MDBCardTitle>
                            <MDBCardTitle className="text-info">{aggro.telephoneUtilisateur} <span className="text-black">|</span> {aggro.email}</MDBCardTitle>
                            <MDBCardText className="text-black mt-4">
                            "{aggro.prenomUtilisateur}"
                            </MDBCardText>
                            <div className="justify-content-between d-flex text-center mt-4 mb-2 h-100 w-100">
                                <div>
                                    <p className="mb-2 h5 text-black">Coopérative</p>
                                    <p className="mb-0 text-info">{aggro.cooperative.nomUtilisateur}</p>
                                </div>
                                <div>
                                    <p className="mb-2 h5 text-black">|</p>
                                </div>
                                <div className="px-3">
                                    <p className="mb-2 h5 text-black">Lieu</p>
                                    <p className="text-info mb-0">{aggro.cooperative.adresseUtilisateur}</p>
                                </div>
                                <div>
                                    <p className="mb-2 h5 text-black">|</p>
                                </div>
                                <div>
                                    <p className="mb-2 h5 text-black">Contact</p>
                                    <p className="text-info mb-0">{aggro.cooperative.telephoneUtilisateur}</p>
                                </div>
                            </div>
                        </MDBCardBody>
                        <MDBCardFooter className="text-center">
                            <Button
                              className="btn-info w-100 d-flex align-items-center flex-column"
                              onClick={Mapp}
                            >
                              Voir la localisation
                            </Button>
                        </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                ))}
            </MDBRow>
            {/* <Modal show={showModal} onHide={() => setShowModal(false)} key={getIdAggro}>
                <Modal.Header>
                    <Modal.Title>Détail profil</Modal.Title>
                    <button type="button" className="btn-close" aria-label="Close" onClick={closeWithSession}></button>
                </Modal.Header>
                {members.map((aggro) => (
                    <Modal.Body>
                        <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#116530', height: '200px' }}>
                            <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                            <MDBCardImage src="../src/images/user_profile.png"
                                alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                            </div>
                            <div className="ms-3" style={{ marginTop: '110px' }}>
                            <MDBTypography tag="h5">&nbsp;{aggro.nomUtilisateur}</MDBTypography>&nbsp;({getAdd})
                            <MDBCardText>&nbsp;Agriculteur</MDBCardText>
                            </div>
                        </div>
                        <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa', marginBottom : "-55px" }}>
                            <div className="d-flex justify-content-center text-center py-4">
                            <div>
                                <MDBCardText className="mb-1 h5 text-info">{getTel}</MDBCardText>
                                <MDBCardText className="small text-black mb-0">Numéro de téléphone</MDBCardText>
                            </div>
                            <div className="px-3">
                                <MDBCardText className="mb-1 h5 text-black">|</MDBCardText>
                            </div>
                            <div>
                                <MDBCardText className="mb-1 h5 text-info">{getEmail}</MDBCardText>
                                <MDBCardText className="small text-black mb-0">Adresse Mail</MDBCardText>
                            </div>
                            </div>
                        </div>
                        <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                            <div className="d-flex justify-content-center text-center py-4">
                            <div>
                                <MDBCardText className="mb-1 h5">{countProduit}</MDBCardText>
                                <MDBCardText className="small text-muted mb-0">Produit(s) vendu</MDBCardText>
                            </div>
                            <div className="px-3">
                                <MDBCardText className="mb-1 h5">{countCoopProduit}</MDBCardText>
                                <MDBCardText className="small text-muted mb-0">Vente De La Cooperative</MDBCardText>
                            </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <MDBCardText className="font-italic h4">"{sessionStorage.getItem('descAggro')}"</MDBCardText>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBCardText className="lead fw-normal mb-0">Produit(s) récent(s)</MDBCardText>
                            <MDBCardText className="mb-0"><a href="#!" className="text-muted">Voir tout</a></MDBCardText>
                        </div>
                        <MDBRow className="g-2">
                            <MDBCol className="mb-2">
                                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                alt="image 1" className="w-100 rounded-3" />
                            </MDBCol>
                        </MDBRow>
                    </Modal.Body>
                ))}
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeWithSession}>Fermer</Button>
                </Modal.Footer>
            </Modal> */}

            <Routes>
                <Route path="/map" element={<Mapping />}/>
            </Routes>
        </>
    )
}

export default Coop
