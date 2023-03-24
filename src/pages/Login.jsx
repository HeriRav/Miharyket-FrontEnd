import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import iconProduct from '../../../farm-products.png';
import { Modal, Table } from 'react-bootstrap';
import axios from 'axios';

function ApprovisionnementProduitAgriculteur() {
  const [appros,setAppros]=useState([]);
  const [produit, setProduit] = useState("");
  const [showModal, setShowModal] = useState(false);
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
const savedProduits = JSON.parse(sessionStorage.getItem('produits'));
const initialProduits = savedProduits ? savedProduits : [];

// Définition de l'état initial en utilisant la liste de produits récupérée
const [produits, setProduits] = useState(initialProduits);


const handleInputChange = event => {
  const { name, value } = event.target;
  setApprovisionnement({ ...approvisionnement, [name]: value });
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
const date = Date.now();
useEffect(() => {
fetch('http://localhost:8085/approvisionnements/agriculteurs/${id}/${date}')
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
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col xs={12} sm={6} md={6}>
                <Form.Label className="mt-3">Nom du produit</Form.Label>
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
          <Button variant="primary" type="submit" block  onClick={() => setShowModal(false)} >
            Ajouter
          </Button>
        </Col>
          
          </Modal.Footer>
        </Modal>
  
    <div className='table-responsive'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Agriculteur</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Date</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
            
           
    {   
    appros.map((appro, index) => (
      <tr key={index}>
        <td>{appro[3]}</td>
        <td>{appro[4]}</td>
        <td>{appro[0]}</td>
        <td>{appro[1]}</td>
        <td>{appro[2]}</td>
      </tr>
    ))
    }
  </tbody>
  
       
      </Table>
    </div>
  
  
            </Container>
            );
            }

export default ApprovisionnementProduitAgriculteur;
