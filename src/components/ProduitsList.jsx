import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProduitsList = () => {
  const [produits, setProduits] = useState([]);
  //let [idCoop, setIdCoop] = useState();
  const idCoop = sessionStorage.getItem("idCoop");
  useEffect(() => {
    axios.get('http://localhost:8085/produits/reference/${idCoop}')
      .then(response => {
        setProduits(response.data);
        sessionStorage.setItem('produits', JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {/* <h2>Liste des produits</h2>
      <ul>
        {produits.map(produit => (
          <li key={produit.idProduit}>
            {produit.nomProduit} - {produit.prixProduit} €
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default ProduitsList;
