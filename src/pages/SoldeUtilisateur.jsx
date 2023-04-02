import React, { useState, useEffect } from 'react';
import axios from 'axios';
import numeral from 'numeral';

const SoldeUtilisateur = () => {
  const [solde, setSolde] = useState(0.0);
    const id = sessionStorage.getItem("idCoop")
  useEffect(() => {
    const fetchSolde = async () => {
      const response = await axios.get(`http://localhost:8085/api/utilisateurs/${id}`);
      setSolde(response.data.soldeUtilisateur);
    };

    fetchSolde();
  }, []);
  const formattedSolde = numeral(solde).format('MGA0,0.00');

  return (
    
      
    <span>{formattedSolde}</span>
    
  );
};

export default SoldeUtilisateur;
