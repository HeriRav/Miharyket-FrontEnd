import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListAgriculteur = () => {
  const [agriculteurs, setAgriculteurs] = useState([]);
  const id = sessionStorage.getItem("idCoop");

  useEffect(() => {
    const fetchAgriculteurs = async () => {
      const response = await fetch(`http://localhost:8085/api/utilisateurs/cooperatives/${id}/agriculteurs`);
      const data = await response.json();
      sessionStorage.setItem('agriculteurs', JSON.stringify(data)); // stockage des données dans sessionStorage
      setAgriculteurs(data);
    };
    fetchAgriculteurs();
  }, [id]);
  return (
    <div>
      {/* <h1>Liste des agriculteurs</h1>
      <ul>
        {agriculteurs.map((agriculteur) => (
          <li key={agriculteur.id}>{agriculteur.nomUtilisateur} - {agriculteur.email}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default ListAgriculteur;
