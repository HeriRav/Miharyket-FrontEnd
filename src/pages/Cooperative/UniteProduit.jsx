import React, { useState, useEffect } from 'react';
import { FormControl, Form ,InputGroup } from 'react-bootstrap';
function UniteProduit({ produitId }) {
    const [produits, setProduits] = useState([]);
    const [uniteProduit, setUniteProduit] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:8085/produits/${produitId}`)
      .then(response => response.json())
      .then(data => setProduits(data));
  }, [produitId]);
  return (
    <InputGroup>
      <FormControl as="select" value={setUniteProduit}>
        <option>{produits.uniteProduit}</option>
      </FormControl>
    </InputGroup>
  );
}
export default UniteProduit;