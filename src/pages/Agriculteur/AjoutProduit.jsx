import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../css/dashboardCooperative.css'


function AjouterProduit() {
  const [nom, setNom] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [unite, setUnite] = useState('');
  const [categorie, setCategorie] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ajoutez ici votre logique pour envoyer les données saisies à votre backend
  };

  return (
    <Container>
        
      <h1 className='text-center'>Ajouter un produit</h1>
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="nom">
              <Form.Label>Nom produit</Form.Label>
              <Form.Control type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="quantite">
              <Form.Label>Quantité</Form.Label>
              <Form.Control type="number" value={quantite} onChange={(e) => setQuantite(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="photo">
              <Form.Label>Photo</Form.Label>
              <Form.Control type="file" onChange={(e) => setPhoto(e.target.files[0])} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="unite">
              <Form.Label>Unité</Form.Label>
              <Form.Control as="select" value={unite} onChange={(e) => setUnite(e.target.value)}>
                <option value="">Sélectionnez une unité</option>
                <option value="litre">Litre</option>
                <option value="kg">Kilogramme</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group controlId="categorie">
          <Form.Label>Catégorie</Form.Label>
          <Form.Control as="select" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
            <option value="">Sélectionnez une catégorie</option>
            <option value="legume">Légume</option>
            <option value="fruit">Fruit</option>
            <option value="fruit">Autres</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Ajouter
        </Button>
      </Form>
    </Container>
  );
}

export default AjouterProduit;
