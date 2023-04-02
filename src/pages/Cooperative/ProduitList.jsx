import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

function ProduitList({ agriculteurId, onSelect }) {
  const [produits, setProduits] = useState([]);
  const [selectedProduitId, setSelectedProduitId] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8085/produits/reference/${agriculteurId}`)
      .then(response => response.json())
      .then(data => setProduits(data));
  }, [agriculteurId]);

  const handleSelect = event => {
    setSelectedProduitId(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <InputGroup>
      <FormControl as="select" onChange={handleSelect} value={selectedProduitId}>
        <option>Sélectionnez un produit</option>
        {produits.map(produit => (
          <option key={produit.idProduit} value={produit.idProduit} name={produit.nomProduit}>
            {produit.nomProduit}
          </option>
        ))}
      </FormControl>
    </InputGroup>
  );
}

export default ProduitList;