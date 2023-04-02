import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
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

function Coop () {
    const [members, setMembers] = useState([]);
    const [product, setProduct] = useState([])
    const [allProduct, setAllProduct] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [shouldDelayEffect, setShouldDelayEffect] = useState(false);
    const [id, setId] = useState("")

    const users = localStorage.getItem('users')
    const userId = sessionStorage.getItem('idUser')

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

    function handleButtonClick(userId, coopId) {
        console.log(userId);
        sessionStorage.setItem("idAggro", userId)
        sessionStorage.setItem("idCoop", coopId)
        setShowModal(true)
        setShouldDelayEffect(true);
    }

    useEffect(() => {
        const idAggro = sessionStorage.getItem('idAggro')
        if (shouldDelayEffect) {
            setTimeout(() => {
                fetch(`http://localhost:8085/approvisionnements/agriculteur/` + idAggro)
                .then((response) => response.json())
                .then((data) => setProduct(data))
                .catch((error) => console.log(error))
            }, 100)
        } else {
            fetch(`http://localhost:8085/approvisionnements/agriculteur/` + idAggro)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.log(error))
        }
    },[shouldDelayEffect]);

    useEffect(() => {
        const idCoop = sessionStorage.getItem('idCoop')
        fetch(`http://localhost:8085/produits/reference/${idCoop}`)
            .then((response) => response.json())
            .then((data) => setAllProduct(data))
            .catch((err) => console.log(err));
    }, []);

    const closeWithSession = () => {
        setShowModal(false)
        location.reload(true)
    }

    const countProduit = product.length;

    const countCoopProduit = allProduct.length;

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

            <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                {members.map((aggro) => (
                    <MDBCol key={aggro.id}>
                        <MDBCard className='h-100 text-center'>
                        <div className="mt-3 mb-4">
                        <MDBCardImage
                            src='../src/images/user_profile.png'
                            alt='Profil'
                            position='top' className="rounded-circle img-fluid" style={{width : "100px"}}
                        />
                        </div>
                        <MDBCardBody>
                            <MDBCardTitle>{aggro.nomUtilisateur} (<span className="text-warning">{aggro.adresseUtilisateur}</span>)</MDBCardTitle>
                            <MDBCardTitle>{aggro.telephoneUtilisateur} | <span className="text-info">{aggro.email}</span></MDBCardTitle>
                            <MDBCardText>
                            This is a longer card with supporting text below as a natural lead-in to additional content.
                            This content is a little bit longer.
                            </MDBCardText>
                            <div className="justify-content-between d-flex text-center mt-5 mb-2 h-100 w-100">
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
                              onClick={() => handleButtonClick(aggro.id, aggro.cooperative.id)}
                            >
                              Voir plus de détails
                            </Button>
                        </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                ))}
            </MDBRow>
            <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Détail profil</Modal.Title>
                    <button type="button" className="btn-close" aria-label="Close" onClick={closeWithSession}></button>
                </Modal.Header>
                {product.map((aggro) => (
                    <Modal.Body>
                        <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                            <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                            <MDBCardImage src="../src/images/user_profile.png"
                                alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                            <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                                Edit profile
                            </MDBBtn>
                            </div>
                            <div className="ms-3" style={{ marginTop: '130px' }}>
                            <MDBTypography tag="h5">{aggro[3]}</MDBTypography>
                            <MDBCardText>Agriculteur</MDBCardText>
                            </div>
                        </div>
                        <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                            <div className="d-flex justify-content-end text-center py-1">
                            <div>
                                <MDBCardText className="mb-1 h5">{countProduit}</MDBCardText>
                                <MDBCardText className="small text-muted mb-0">Produit(s)</MDBCardText>
                            </div>
                            <div className="px-3">
                                <MDBCardText className="mb-1 h5">{countCoopProduit}</MDBCardText>
                                <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                            </div>
                            <div>
                                <MDBCardText className="mb-1 h5">478</MDBCardText>
                                <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                            </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <p className="lead fw-normal mb-1">Phrase d'accroche</p>
                            <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                                <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                                <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                            <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
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
            </Modal>
        </>
    )
}

export default Coop
