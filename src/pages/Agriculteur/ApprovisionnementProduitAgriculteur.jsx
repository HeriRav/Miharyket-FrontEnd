import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import iconProduct from "../../../farm-products.png";
import { Dropdown } from 'primereact/dropdown';
import axios from "axios";

function ApprovisionnementProduitAgriculteur() {
  const [produit, setProduit] = useState();
  const [produitsAjoutes, setProduitsAjoutes] = useState([]);
  const [agriculteur, setAgriculteur] = useState("");
  const savedAgriculteur = JSON.parse(localStorage.getItem("user"));

  const [approvisionnement, setApprovisionnement] = useState({
    // utilisateur: '',
    utilisateur: savedAgriculteur,
    produit: "",
    quantiteApprovisionnement: 0,
    //uniteApprovisionnement:'',
    prixUnitaire: 0.0,
    dateApprovisionnement: new Date().toISOString(),
  });
  const handleInputChange = event => {
    const { name, value } = event.target;
    setApprovisionnement({ ...approvisionnement, [name]: value });
    };
  // const handleSelectChange = (event) => {
  //   const { value } = event.target;
  //   setApprovisionnement({
  //     ...approvisionnement,
  //     produit: { idProduit: value },
  //   });
  // };
  // Récupération de la liste de produits depuis le local storage
  const savedProduits = JSON.parse(localStorage.getItem("produits"));
  const initialProduits = savedProduits ? savedProduits : [];

  // Définition de l'état initial en utilisant la liste de produits récupérée
  const [produits, setProduits] = useState(initialProduits);

  
  

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8085/approvisionnements/add", approvisionnement)
      .then((response) => {
        const produitAjoute = { ...approvisionnement, idProduitAjoute: response.data.idProduit };
        setProduitsAjoutes([...produitsAjoutes, produitAjoute]);
        setApprovisionnement({
          utilisateur: savedAgriculteur,
          produit: "",
          quantiteApprovisionnement: 0,
          prixUnitaire: 0.0,
          dateApprovisionnement: new Date().toISOString(),
        });
        setProduit("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <Container className="mb-5">
      <h1 className="text-center mb-5">Approvisionnement</h1>
      <h2 className="text-center mb-5">
        <div className="sidebar-brand-icon">
          <img src={iconProduct} alt="Mihary" className="img-fluid" />
        </div>
      </h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} sm={6} md={6}>
          <Form.Label className="mt-4">Nom du produit</Form.Label>
            <Form.Control
              as="select"
              value={produit}
              onChange={handleInputChange}
            >
              <option value="">Sélectionnez un produit</option>
              {produits.map((produit) => (
                <option
                  key={approvisionnement.produit.idProduit}
                  value={produit.idProduit}
                >
                  {produit.nomProduit}
                </option>
              ))}
            </Form.Control> 
           </Col>

          {/* <Col xs={12} sm={6} md={6}>
            <Form.Label>Nom de l'agriculteur</Form.Label>
            <Form.Control
              type="text"
              name="nomApprovisionnement"
              readOnly
              value={
                approvisionnement.utilisateur.nomUtilisateur +
                " " +
                approvisionnement.utilisateur.prenomUtilisateur
              }
            />
          </Col> */}

          <Col xs={12} sm={6} md={6}>
            <Form.Group controlId="quantite">
              <Form.Label className="mt-4">Quantité</Form.Label>
              <Form.Control
                type="number"
                name="quantiteApprovisionnement"
                value={approvisionnement.quantiteApprovisionnement}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={6}>
            <Form.Group controlId="unite">
              <Form.Label className="mt-4">Unité</Form.Label>
              <Form.Control
                as="select"
                type="text"
                name="uniteApprovisionnement"
                value={approvisionnement.uniteApprovisionnement}
                onChange={handleInputChange}
              >
                <option value="">Sélectionnez une unité</option>
                <option value="litre">Litre</option>
                <option value="kg">Kilogramme</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Form.Group as={Col} md={6} controlId="prix">
            <Form.Label className="mt-4">Prix en Ar/Unité</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="prixUnitaire"
              value={approvisionnement.prixUnitaire}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Col xs={12} sm={15} md={6}>
          <ul>
    {produitsAjoutes.map((produitAjoute) => (
      <li key={produitAjoute.idProduitAjoute}>
        {produitAjoute.produit.nomProduit} - {produitAjoute.quantiteApprovisionnement}
      </li>
    ))}
  </ul>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Button variant="primary" type="submit" block className="mt-5">
              Ajouter
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ApprovisionnementProduitAgriculteur;
