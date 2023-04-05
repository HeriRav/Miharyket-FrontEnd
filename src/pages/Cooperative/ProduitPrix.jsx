import React, { useState, useEffect } from 'react';
function ProduitPrix({ produitId, setSelectedProduitPrix }) {
  const [produit, setProduit] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8085/produits/${produitId}`)
      .then(response => response.json())
      .then(data => setProduit(data));
  }, [produitId]);

  useEffect(() => {
    if (produit.prixProduit) {
      setSelectedProduitPrix(produit.prixProduit);
    }
  }, [produit, setSelectedProduitPrix]);
  return (
    <span>{produit.prixProduit}</span>
  );
}
export default ProduitPrix;