import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import iconProduct from "../../../farm-products.png";
import axios from "axios";
import GetCooperativeId from "../../components/GetCooperativeId";

function ApprovisionnementProduitAgriculteur() {

  const [produit, setProduit] = useState("");
  const [agriculteur, setAgriculteur] = useState("");
const saveUser =  JSON.parse(sessionStorage.getItem("user"));
  const [approvisionnement, setApprovisionnement] = useState({
    utilisateur: saveUser,
    //utilisateur: {login : 2},
    produit: '',
    quantiteApprovisionnement: 0,
    //uniteApprovisionnement:'',
    prixUnitaire: 0.00,
    dateApprovisionnement: new Date().toISOString()
  });
  const handleSelectChange = event => {
    const { value } = event.target;
    setApprovisionnement({ ...approvisionnement, produit: { idProduit: value } });
    };
  // Récupération de la liste de produits depuis le local storage
const savedProduits = JSON.parse(localStorage.getItem('produits'));
const initialProduits = savedProduits ? savedProduits : [];

// Définition de l'état initial en utilisant la liste de produits récupérée
const [produits, setProduits] = useState(initialProduits);

// Récupération de la liste de agriculteurs depuis le local storage
const savedAgriculteurs = JSON.parse(localStorage.getItem('agriculteurs'));
const initialAgriculteurs = savedAgriculteurs ? savedAgriculteurs : [];

// Définition de l'état initial en utilisant la liste de agriculteurs récupérée
const [agriculteurs, setAgriculteurs] = useState(initialAgriculteurs);

const handleInputChange = event => {
  const { name, value } = event.target;
  setApprovisionnement({ ...approvisionnement, [name]: value });
};
const handleSelectChange1 = event => {
  const { value } = event.target;
  setApprovisionnement({ ...approvisionnement, utilisateur: { id: value } });
  };

const handleSubmit = event => {
  event.preventDefault();
  axios.post('http://localhost:8085/approvisionnements/add', approvisionnement)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
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
              onChange={handleSelectChange}
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

          <Col xs={12} sm={6} md={6}>
            {/* <Form.Label>Nom de l'agriculteur</Form.Label>
            <Form.Control
              type="text"
              name="nomApprovisionnement"
              // readOnly
              value={
                approvisionnement.utilisateur.nomUtilisateur +
                " " +
                approvisionnement.utilisateur.prenomUtilisateur
              }
            /> */}
            <Form.Control
              as="select"
              value={agriculteur}
              onChange={handleSelectChange1}
            >
              <option value="">Sélectionnez un agriculteur</option>
              {agriculteurs.map((agriculteur) => (
                <option
                  key={approvisionnement.utilisateur.id}
                  value={agriculteur.id}
                >
                  {agriculteur.nomUtilisateur}
                </option>
              ))}
              </Form.Control> 
          </Col>

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
