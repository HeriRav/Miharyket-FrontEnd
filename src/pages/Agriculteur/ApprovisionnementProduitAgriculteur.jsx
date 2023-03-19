import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import iconProduct from "../../../farm-products.png";

function ApprovisionnementProduitAgriculteur() {
  const [prix, setPrix] = useState('');
  const [produit, setProduit] = useState("");
  const [quantite, setQuantite] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [unite, setUnite] = useState("");
  const [categorie, setCategorie] = useState("");
  const produits = ["Produit 1", "Produit 2", "Produit 3"];
  const handleSubmit = (event) => {
    event.preventDefault();
    // Ajoutez ici votre logique pour envoyer les données saisies à votre backend
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
            <Form.Label>Nom du produit</Form.Label>
            <Form.Control
              as="select"
              value={produit}
              onChange={(e) => setProduit(e.target.value)}
            >
              <option value="">Sélectionnez un produit</option>
              {produits.map((produit) => (
                <option key={produit} value={produit}>
                  {produit}
                </option>
              ))}
            </Form.Control>
          </Col>

          <Col xs={12} sm={6} md={6}>
            <Form.Group controlId="categorie">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                as="select"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="legume">Légume</option>
                <option value="fruit">Fruit</option>
                <option value="autre">Autre</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={6}>
            <Form.Group controlId="quantite">
              <Form.Label className="mt-4">Quantité</Form.Label>
              <Form.Control
                type="number"
                value={quantite}
                onChange={(e) => setQuantite(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={6}>
            <Form.Group controlId="unite">
              <Form.Label className="mt-4">Unité</Form.Label>
              <Form.Control
                as="select"
                value={unite}
                onChange={(e) => setUnite(e.target.value)}
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
              type="text"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
            />
          </Form.Group>

          <Col xs={12} sm={15} md={6}>
            <Form.Group controlId="photo">
              <Form.Label className="mt-4">Photo</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </Form.Group>
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
