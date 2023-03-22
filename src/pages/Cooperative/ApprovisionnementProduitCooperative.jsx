import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import iconProduct from '../../../farm-products.png';
import { Modal, Table } from 'react-bootstrap';

function ApprovisionnementProduitCooperative() {
  const [appros,setAppros]=useState([]);
const [nomUtilisateur, setAgriculteur] = useState('');
const [nomProduit, setProduit] = useState('');
const [quantiteApprovisionnement, setQuantite] = useState(0);
const [prixUnitaire, setPrix] = useState('');
const [showModal, setShowModal] = useState(false);
const [searchValue, setSearchValue] = useState('');


useEffect(() => {
fetch('http://localhost:8085/approvisionnements/liste')
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



const [filteredAppros, setFilteredAppros] = useState(appros);

const handleSearchInputChange = event => {
  const inputValue = event.target.value.toLowerCase();

  const filteredAppros = appros.filter(appro =>
    appro.nomUtilisateur.toLowerCase().includes(inputValue) ||
    appro.nomProduit.toLowerCase().includes(inputValue)
  );

  setFilteredAppros(filteredAppros);
  setSearchValue(inputValue);
};

const agriculteurs = ['Agriculteur 1', 'Agriculteur 2', 'Agriculteur 3'];
const produits = ['Produit 1', 'Produit 2', 'Produit 3'];

// const handleSubmit = event => {
// event.preventDefault();
// // Ajoutez ici votre logique pour envoyer les données saisies à votre backend
// };

const handleSubmit = () => {
  // Récupérer les valeurs des différents champs
  const date = new Date().toLocaleDateString();
  const newAppro = {
    nomUtilisateur: agriculteur,
    nomProduit: produit,
    quantite: quantite,
    dateApprovisionnement: date,
    prixUnitaire: prix
  };

  // Ajouter les nouvelles données dans le tableau
  setAppros(appros.concat(newAppro));

  // Fermer le modal
  setShowModal(false);
};

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
  <div style={{ display: 'flex', alignItems: 'center' }}>

    <input
      type='text'
      placeholder="Recherche"
      value={searchValue}
      onChange={handleSearchInputChange}
    />
  </div>
  <Button variant='primary' onClick={() => setShowModal(true)}>
    Approvisionner
  </Button>
</div>

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
          export default ApprovisionnementProduitCooperative;