import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function ApprovisionnementModal({ produits, onSubmit }) {
  const [produit, setProduit] = useState('');
  const [quantiteApprovisionnement, setQuantiteApprovisionnement] = useState(0);
  const [prixUnitaire, setPrixUnitaire] = useState(0);
  
  const handleSubmit = event => {
    event.preventDefault();
    
    const approvisionnement = {
      produit: { idProduit: produit },
      quantiteApprovisionnement,
      prixUnitaire,
    };
    
    onSubmit(approvisionnement);
  };
  
  return (
    <Modal>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un approvisionnement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formProduit">
            <Form.Label>Nom du produit</Form.Label>
            <Form.Control as="select" value={produit} onChange={e => setProduit(e.target.value)}>
              <option value="">Sélectionnez un produit</option>
              {produits.map(produit => (
                <option key={produit.idProduit} value={produit.idProduit}>
                  {produit.nomProduit}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formQuantite">
            <Form.Label>Quantité</Form.Label>
            <Form.Control type="number" value={quantiteApprovisionnement} onChange={e => setQuantiteApprovisionnement(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPrixUnitaire">
            <Form.Label>Prix unitaire</Form.Label>
            <Form.Control type="number" step="0.01" value={prixUnitaire} onChange={e => setPrixUnitaire(e.target.value)} />
          </Form.Group>
          <Button type="submit">Enregistrer</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ApprovisionnementModal;
