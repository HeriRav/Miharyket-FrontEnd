import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import iconProduct from "../../../farm-products.png";
import { Modal, Table } from "react-bootstrap";
import ListAgriculteur from "../../components/ListAgriculteur";
import ProduitsList from "../../components/ProduitsList";
import axios from "axios";
import ApprovisionnementHistorique from "../Cooperative/ApprovisionnementHistoriquePaiement";


function PaiementAgriculteur() {
  const idCoop = sessionStorage.getItem("idCoop");
  const [appros, setAppros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [produit, setProduit] = useState("");
  const [agriculteur, setAgriculteur] = useState("");
  const saveUser = JSON.parse(sessionStorage.getItem("users"));
  const [approvisionnement, setApprovisionnement] = useState({
    utilisateur: "",
    produit: "",
    quantiteApprovisionnement: 0,
    prixUnitaire: 0.0,
    dateApprovisionnement: new Date().toISOString(),
  });

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setApprovisionnement({
      ...approvisionnement,
      produit: { idProduit: value },
    });
  };


  

// Récupération de la liste de produits depuis le local storage
const savedProduits = JSON.parse(sessionStorage.getItem("produits"));
const initialProduits = savedProduits ? savedProduits : [];

// Définition de l'état initial en utilisant la liste de produits récupérée
const [produits, setProduits] = useState(initialProduits);

// Récupération de la liste de agriculteurs depuis le local storage
const savedAgriculteurs = JSON.parse(sessionStorage.getItem("agriculteurs"));
const initialAgriculteurs = savedAgriculteurs ? savedAgriculteurs : [];

// Définition de l'état initial en utilisant la liste de agriculteurs récupérée
const [agriculteurs, setAgriculteurs] = useState(initialAgriculteurs);

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setApprovisionnement({ ...approvisionnement, [name]: value });
};

const handleSelectChange1 = (event) => {
  const { value } = event.target;
  setApprovisionnement({ ...approvisionnement, utilisateur: { id: value } });
};

const handleSubmit = (event) => {
  event.preventDefault();
  axios
    .post("http://localhost:8085/approvisionnements/add", approvisionnement)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const date = Date.now();
const id = sessionStorage.getItem("idCoop");
const link = "http://localhost:8085/approvisionnements/cooperative/" + id;

useEffect(() => {
  fetch(link)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setAppros(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}, []);

return (
  <Container className="mt-5 mb-5">
    <h1 className="text-center">Paiement Agriculteur</h1>
    <h2 className="text-center">
      <div className="sidebar-brand-icon">
        <img src={iconProduct} alt="Mihary" className="img-fluid" />
      </div>
    </h2>
    <br />
    <h3 className="mt-1">Historique des activités des agriculteurs</h3>


    <ApprovisionnementHistorique approvisionnements={appros} />
    <br />
    
    
  </Container>
);
}

  

export default PaiementAgriculteur;