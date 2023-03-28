import { Link } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import visa from "../images/visa.png";

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
// import Swal from "sweetalert2";
import CheckoutForm from "./CheckoutForm";
import Swal from "sweetalert2";
import Modal from "react-modal";

const public_key =
  "pk_test_51MqBM9AD78j1yqjLvHmPakZ9UxZpLY4n6QBID2WuUc6sojf67NW3Laoleg4BY26UP6KczNOsBjphJ3TTpOG0Sl6000xE6dgNzI";
const stripePromise = loadStripe(public_key);
const map1 = new Map();
const images = [
  { categorieProduit: "Viande", src: "/src/images/meat.jpg" },
  { categorieProduit: "Légume", src: "/src/images/organic-vegetable.jpg" },
  { categorieProduit: "Fruit", src: "/src/images/organic-fruit.jpg" },
  { categorieProduit: "Produit laitier", src: "/src/images/dairy-product.jpg" },
  { categorieProduit: "Céréale", src: "/src/images/cereal.jpg" },
  {
    categorieProduit: "Produit arômatique",
    src: "/src/images/aromatic-product.jpg",
  },
];

function Cart() {
  const [max, setMax] = useState([]);
  const [produit, setProd] = useState([]);
  //const [grandTotal, setGrandTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalProduit, setTotalProduit] = useState([]);
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
        let total = 0;
        
        let a = [];
        for (let i = 0; i < data.length; i++) {
          if (localStorage.getItem(data[i].nomProduit) == null) continue;

          const item = JSON.parse(localStorage.getItem(data[i].nomProduit));
          item.quantité = 1; // initialiser la quantité à 1
          item.total = item.price;
          total += item.total;
          a.push(item);
        }
        setProd(a);
        setTotal(total);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleQuantityChange(idProduit, value) {
    // const newProduit = [...produit];
    // const index = newProduit.findIndex((p) => p.idProduit === idProduit);
    // console.log(index);
    // newProduit[index].quantité = value;
    // setProd(newProduit);
    // // Mettre à jour le prix total
    // const newTotal = newProduit.reduce(
    //   (acc, p) => acc + p.price * p.quantité,
    //   0
    // );
    // setTotal(newTotal);
  }

  function handlePriceUpdate(pr, value) {
    // Convertir la valeur en nombre et vérifier si elle dépasse la quantité disponible
    const newValue = parseInt(value, 10);
    const limitedValue = newValue > pr.stock ? pr.stock : newValue;
  
    // Vérifier si la quantité dépasse la quantité disponible et définir le message d'erreur en conséquence
    const errorMessage = newValue > pr.stock ? `Quantité maximale disponible: \${pr.stock}` : "";
  
    const updatedItems = produit.map((item) => {
      if (item.id === pr.id) {
        return { ...item, total: item.price * limitedValue };
      } else {
        return item;
      }
    });
    setProd(updatedItems);
  
    // Mettez à jour le montant total en utilisant la fonction setTotal
    const newTotal = updatedItems.reduce((acc, p) => acc + p.total, 0);
    setTotal(newTotal);
  
    // Mettre à jour le message d'erreur en utilisant la fonction setErrorMessage
    setErrorMessage(errorMessage);
    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
  }
  
  
  

  produit.sort((a, b) => b.idProduit - a.idProduit);

  const supprimerProduit = (id, nom) => {
    const select = localStorage.getItem(nom);
    console.log(select);
    localStorage.removeItem(nom);
    const nouveauPanier = produit.filter((panier) => panier.id !== id);
    setProd(nouveauPanier);
    window.location.reload(true)
  };
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
           
              <MDBContainer className="py-1 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                  <MDBCol md="10">
                    <MDBCard className="rounded-3 mb-4">
                      <MDBCardBody className="p-1">
                        <MDBRow className="justify-content-between align-items-center">
                          <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage
                              className="rounded-3"
                              fluid
                              src={
                                images.find(
                                  (image) =>
                                    image.categorieProduit === panier.category
                                )?.src
                              }
                              alt="Cotton T-shirt"
                            />
                          </MDBCol>
                          <MDBCol md="4" lg="4" xl="4">
                            <p className="lead fw-normal mb-2">{panier.nom}</p>
                            <p>
                              <span className="text-muted">
                                Prix par unité :{" "}
                              </span>
                              {panier.price} Ar
                              <br />
                              <br />
                              <span className="text-muted">
                                Quantité disponible:{" "}
                              </span>
                              {panier.stock} {panier.unit}
                              
                            </p>
                          </MDBCol>

                          <MDBCol
                            md="3"
                            lg="3"
                            xl="2"
                            className="d-flex align-items-center justify-content-around"
                          >
                            {/* <MDBBtn
                              color="link"
                              className="px-2"
                              // onClick={() =>
                              //   handleQuantityChange(
                              //     panier.idProduit,
                              //     panier.quantité - 1
                              //   )
                              // }
                            > */}
                            {/* <MDBIcon fas icon="minus" /> */}
                            {/* </MDBBtn> */}

                            <MDBInput
                              min={1}
                              // max={max}
                              type="number"
                              size="sm"
                              onChange={(e) =>
                                handlePriceUpdate(panier, e.target.value)
                              }
                              //value={panier.quantité}
                              // onChange={(e) =>
                              //   handleQuantityChange(
                              //     panier.idProduit,
                              //     parseInt(e.target.value)
                              //   )s
                              // }
                            />

                            {/* <MDBBtn
                              color="link"
                              className="px-2"
                              onClick={() =>
                                handleQuantityChange(
                                  panier.idProduit,
                                  panier.quantité + 1
                                )
                              }
                            >
                              <MDBIcon fas icon="plus" />
                            </MDBBtn> */}
                          </MDBCol>
                          <MDBCol md="1" lg="2" xl="2" className="offset-lg-1">
                            Prix total par produit:
                            <MDBTypography tag="h5" className="mb-0">
                              {panier.total} Ar
                            </MDBTypography>
                            
                          </MDBCol>
                          <MDBCol
                            md="1"
                            lg="1"
                            xl="1"
                            className="text-end"
                            key={produit.id}
                          >
                            <a
                              href="#!"
                              className="text-danger"
                              onClick={() => {
                                Swal.fire({
                                  title:
                                    "Êtes-vous sûr de vouloir supprimer ce produit?",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#8bc34a",
                                  cancelButtonColor: "#999DA0",
                                  confirmButtonText: "Oui, supprimer!",
                                  cancelButtonText: "Annuler",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    supprimerProduit(panier.id, panier.nom);
                                  }
                                });
                              }}
                            >
                              <i className="fa fa-trash"></i>
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

        <MDBContainer className="py-1 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="10">
              <MDBCard className="rounded-3 mb-1">
                <div className="justify-content-center align-items-center h-100">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "95%",
                    }}
                  >
                    <p style={{ margin: "0" }}>Prix total à payer :</p>
                    <p style={{ margin: "0" }}>{total} Ar</p>
                  </div>
                </div>

                <br />
                <button
                  onClick={handleOpenModal}
                  variant="primary"
                  className="btn btn-success btn-lg gradient-custom-4 px-5 text-white"
                >
                  Paiement
                </button>
                
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <Modal
          isOpen={showModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "90%",
              height: "auto",
              maxWidth: "600px",
              maxHeight: "80%",
              margin: "auto",
            },
          }}
        >
          <div class="modal-header">
            <div class="row justify-content-left">
              <img
                src={visa}
                alt="visa"
                className="img-fluid"
                style={{ width: "20%" }}
              />

              <h1 class="md-5 mt-4 ml-5"> PAIEMENT</h1>
            </div>

            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <p>Prix à payer : {total} Ar</p>

          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Modal>
      </section>
    </>
  );
}

export default Cart;
