import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import iconProduct from '../../../farm-products.png';
import { Modal, Table } from 'react-bootstrap';
import ListAgriculteur from '../../components/ListAgriculteur';
import ProduitsList from '../../components/ProduitsList';
import axios from 'axios';
import ApprovisionnementHistorique from '../Agriculteur/ApprovisionnementHistorique';
import AgriculteurList from './AgriculteurList';
import ProduitList from './ProduitList';
function ApprovisionnementProduitCooperative() {
  const [appros, setAppros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const id = sessionStorage.getItem("idCoop");
  const [selectedAgriculteurId, setSelectedAgriculteurId] = useState(null);
  const [selectedProduitId, setSelectedProduitId] = useState(null);
  const [approvisionnement, setApprovisionnement] = useState({
    utilisateur: '',
    produit: '',
    quantiteApprovisionnement: 0,
    prixUnitaire: 0.00,
    dateApprovisionnement: new Date().toISOString()
  });
  
  

  const handleInputChange = event => {
    const { name, value } = event.target;
    setApprovisionnement({ ...approvisionnement, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const updatedApprovisionnement = {
      ...approvisionnement,
      utilisateur: {id : selectedAgriculteurId},
      produit: {idProduit : selectedProduitId}
    };
    
    axios.post('http://localhost:8085/approvisionnements/add', updatedApprovisionnement)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    setShowModal(false);
  };

  // Récupération de la liste des approvisionnements depuis l'API
  useEffect(() => {
    const link = `http://localhost:8085/approvisionnements/cooperative/${id}`;
    fetch(link)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAppros(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <Container className='mt-5 mb-5'>
      <h1 className='text-center'>Approvisionnement</h1>
      <h2 className='text-center'>
        <div className='sidebar-brand-icon'>
          <img src={iconProduct} alt='Mihary' className='img-fluid' />
        </div>
      </h2>


      <h3 className='mt-4'>Historique des approvisionnements</h3>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>

        <Button variant='primary' onClick={() => setShowModal(true)}>
          Approvisionner
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouvel agriculteur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1 className="text-center mb-5">Approvisionnement</h1>
          <h2 className="text-center mb-5">
            <div className="sidebar-brand-icon">
              <img src={iconProduct} alt="Mihary" className="img-fluid" />
            </div>
          </h2>
          <Form>
            <Row className="mb-3">
            <Col xs={12} sm={6} md={6}>
                <Form.Label className="mt-3">Nom de l'agriculteur</Form.Label>
                <AgriculteurList className="mt-3"
        cooperativeId={id} // Remplacez par l'ID de la coopérative souhaitée
        onSelect={setSelectedAgriculteurId}
      />
              </Col>

              <Col xs={12} sm={6} md={6}>
                <Form.Label className="mt-3">Nom du produit</Form.Label>
                
      
      
                {selectedAgriculteurId && 
      
      
      <ProduitList className="mt-3" agriculteurId={selectedAgriculteurId} onSelect={setSelectedProduitId}/>
    
     }
    
     
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

            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Col>
            <Button variant="primary" type="submit" block onClick={handleSubmit} >
              Ajouter
            </Button>
          </Col>

        </Modal.Footer>
      </Modal>

      <ApprovisionnementHistorique approvisionnements={appros} />


    </Container>
  );
}
export default ApprovisionnementProduitCooperative;