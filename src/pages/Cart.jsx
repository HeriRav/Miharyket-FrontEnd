import { Link } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import Modal from "react-modal";

const public_key =
"pk_test_51MqBM9AD78j1yqjLvHmPakZ9UxZpLY4n6QBID2WuUc6sojf67NW3Laoleg4BY26UP6KczNOsBjphJ3TTpOG0Sl6000xE6dgNzI";
const stripePromise = loadStripe(public_key);

function Cart() {
  const [max, setMax] = useState([]);
  const [produit, setProd] = useState([]);

  const [showModal, setShowModal] = useState(false); // déplacer ici

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  useEffect(() => {
    setMax([]);
    fetch("http://localhost:8085/produits/list")
      .then((response) => response.json())
      .then((data) => {
        let a = [];
        for (let i = 0; i < data.length; i++) {
          if (localStorage.getItem(data[i].nomProduit) == null) continue;

          a.push(JSON.parse(localStorage.getItem(data[i].nomProduit)));
        }
        setProd(a);
      })
      .catch((err) => console.log(err));
  }, []);

  produit.sort((a, b) => b.idProduit - a.idProduit);
  return (
    <>
      <title>Mihary'ket - Panier</title>
      <div
        className="intro-section site-blocks-cover innerpage"
        style={{ backgroundImage: "url('/src/images/hero_0.jpg')" }}
      >
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-lg-12 mt-5" data-aos="fade-up">
              <h1>Mon panier</h1>
              <p className="text-white text-center">
                <Link to="/">Accueil</Link>
                <span className="mx-2">/</span>
                <span>Mon panier</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="h-100" style={{ backgroundColor: "#eee" }}>
        {produit &&
          produit.map((panier) => {
            return (
              <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                  <MDBCol md="10">
                    <MDBCard className="rounded-3 mb-4">
                      <MDBCardBody className="p-4">
                        <MDBRow className="justify-content-between align-items-center">
                          <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage
                              className="rounded-3"
                              fluid
                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                              alt="Cotton T-shirt"
                            />
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3">
                            <p className="lead fw-normal mb-2">{panier.nom}</p>
                            <p>
                              <span className="text-muted">Quantité: </span>
                              <br />
                              <span className="text-muted">Catégorie: </span>
                              {panier.categorieProduit}
                            </p>
                          </MDBCol>
                          <MDBCol
                            md="3"
                            lg="3"
                            xl="2"
                            className="d-flex align-items-center justify-content-around"
                          >
                            <MDBBtn color="link" className="px-2">
                              <MDBIcon fas icon="minus" />
                            </MDBBtn>

                            <MDBInput
                              min={1}
                              max={max}
                              type="number"
                              size="sm"
                            />

                            <MDBBtn color="link" className="px-2">
                              <MDBIcon fas icon="plus" />
                            </MDBBtn>
                          </MDBCol>
                          <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                            <MDBTypography tag="h5" className="mb-0">
                              {panier.price} Ar
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="1" lg="1" xl="1" className="text-end">
                            <a href="#!" className="text-danger">
                              <MDBIcon fas icon="trash text-danger" size="lg" />
                            </a>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            );
          })}

        <button onClick={handleOpenModal}>Payer</button>
        <Modal isOpen={showModal} onRequestClose={handleCloseModal}>
          <h2>Entrez les coordonnées de la carte :</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm onCloseModal={handleCloseModal} />
          </Elements>
        </Modal>
      </section>
    </>
  );
}

export default Cart;
