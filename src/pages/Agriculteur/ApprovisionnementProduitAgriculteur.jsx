import React, { useState, useEffect } from 'react';
import { Button, Modal, Form,Col } from 'react-bootstrap';
import ApprovisionnementHistorique from './ApprovisionnementHistorique';
import axios from 'axios';
import { User } from '@auth0/auth0-react';

function ApprovisionnementProduitAgriculteur() {
  const [appros, setAppros] = useState([]);
  const [produits, setProduits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idAgriculteur, setIdAgriculteur] = useState(sessionStorage.getItem("idAgriculteur"));
  const [idCoop, setIdCoop] = useState(sessionStorage.getItem("idCoop"));
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  const [filteredAppros, setFilteredAppros] = useState([]);
  const [produit, setProduit] = useState('');
  const [quantiteApprovisionnement, setQuantiteApprovisionnement] = useState(0);
  const [prixUnitaire, setPrixUnitaire] = useState(0);

  useEffect(() => {
    const fetchAppros = async () => {
      const res = await axios.get('http://localhost:8085/approvisionnements/agriculteur/' + idAgriculteur);
      setAppros(res.data);
      setFilteredAppros(res.data);
    };
    const fetchProduits = async () => {
      const res = await axios.get('http://localhost:8085/produits/reference/' + idCoop);
      setProduits(res.data);
    };
    fetchAppros();
    fetchProduits();
  }, []);

  const handleAddAppro = async appro => {
    try {
      const res = await axios.post('http://localhost:8085/approvisionnements/add', appro);
      setAppros([...appros, res.data]);
      setFilteredAppros([...filteredAppros, res.data]);
      console.log("Envoyer au back appros "+appros);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const approvisionnement = {
      produit: { idProduit: produit },
      quantiteApprovisionnement,
      utilisateur : JSON.parse(user),
      prixUnitaire,
      dateApprovisionnement: new Date().toISOString()
    };
    
    handleAddAppro(approvisionnement);
  };

  return (
    <div>
      <h2>Approvisionnement</h2>
      <Button onClick={() => setShowModal(true)}>Ajouter un approvisionnement</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un approvisionnement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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

            
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Col>
        <Button type="submit" onClick={handleSubmit} block >Enregistrer</Button>
      </Col>
        
        </Modal.Footer>
      </Modal>
      <ApprovisionnementHistorique approvisionnements={filteredAppros} />
    </div>
  );
}

export default ApprovisionnementProduitAgriculteur;