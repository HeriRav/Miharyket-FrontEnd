import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import axios from 'axios';

function ApprovisionnementHistorique({ approvisionnements }) {
  const [filteredAppros, setFilteredAppros] = useState(approvisionnements);

  useEffect(() => {
    setFilteredAppros(approvisionnements);
  }, [approvisionnements]);

  const handleInputChange = event => {
    const keyword = event.target.value;
    const filtered = approvisionnements.filter(appro => {
      const nomProduit = appro.produit.nomProduit.toLowerCase();
      const nomAgriculteur = `${appro.utilisateur.nomUtilisateur} ${appro.utilisateur.prenomUtilisateur}`.toLowerCase();
      const dateAppro = new Date(appro.dateApprovisionnement).toLocaleDateString().toLowerCase();
      return nomProduit.includes(keyword.toLowerCase()) || nomAgriculteur.includes(keyword.toLowerCase()) || dateAppro.includes(keyword.toLowerCase());
    });
    setFilteredAppros(filtered);
  };
  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filtered = approvisionnements.filter((appro) => {
      const nomProduit = appro.produit.nomProduit.toLowerCase();
      const nomAgriculteur = appro.utilisateur.nomUtilisateur.toLowerCase();
      return nomProduit.includes(searchValue) || nomAgriculteur.includes(searchValue);
    });
    setFilteredAppros(filtered);
  };

  return (
    <div>
      <Form className="mb-3 mt-3">
        <Form.Control type="text" placeholder="Rechercher" onChange={handleInputChange} />
      </Form>
      <Table striped bordered hover className='text-black text-center'>
        <thead>
        <tr>
          <th>Produit</th>
          <th>Quantité</th>
          <th>Prix unitaire</th>
          <th>Agriculteur</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
          
            {filteredAppros.map((appro, index) => (
                <tr key={index}>
                  <td>{appro[4]}</td>
                  <td>{appro[0]}</td>
                  <td>{appro[2]}</td>
                  <td>{appro[3]}</td>
                  <td>{new Date(appro[1]).toLocaleDateString('fr-FR')}</td>

                  
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ApprovisionnementHistorique;
