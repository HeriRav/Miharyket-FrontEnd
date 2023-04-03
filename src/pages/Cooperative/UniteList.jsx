import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

function UniteList({ idProduit }) {
  const [produit, setProduit] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8085/produits/${idProduit}`)
      .then(response => response.json())
      .then(data => setProduit(data));
  }, [idProduit]);

  return (
    <InputGroup>
      <FormControl as="select">
        {produit.map(produit => (
          <option key={produit.idProduit} value={produit.uniteProduit}>
            {produit.uniteProduit}
          </option>
        ))}
      </FormControl>
    </InputGroup>
  );
}

export default UniteList;
