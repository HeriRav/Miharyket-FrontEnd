import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
function ListeProduits({ idAgriculteur }) {
  const [produits, setProduits] = useState([]);
  const [produit, setProduit] = useState("");
  useEffect(() => {
    async function fetchProduits() {
      const response = await fetch(`http://localhost:8085/produits/reference/${idAgriculteur}`);
      const data = await response.json();
      setProduits(data);
    }
    fetchProduits();
  }, [idAgriculteur]);

  return (
    <div>
      <Form.Control
                  as="select"
                  value={produit}
                  onChange={(e) => setProduit(e.target.value)}
                >
                  <option value="">Sélectionnez un produit</option>
                  {produits.map((produit) => (
                    <option
                      key={produit.idProduit}
                      value={produit.idProduit}
                    >
                      {produit.nomProduit}
                    </option>
                  ))}
                </Form.Control>
    </div>
  );
}

export default ListeProduits;
