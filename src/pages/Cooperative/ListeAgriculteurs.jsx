import React, { useEffect, useState } from 'react';

function ListeAgriculteurs({ id }) {
  const [agriculteurs, setAgriculteurs] = useState([]);
//   const [agriculteurs, setAgriculteur] = useState('');

  useEffect(() => {
    async function fetchAgriculteurs() {
      const response = await fetch(`http://localhost:8085/api/utilisateurs/cooperatives/${id}/agriculteurs`);
      const data = await response.json();
      setAgriculteurs(data);
    }
    fetchAgriculteurs();
  }, [id]);

  return (
    <div>
      
      <Form.Control
                  as="select"
                  value={agriculteur}
                  onChange={(e) => setAgriculteur(e.target.value)}
                >
                  <option value="">Sélectionnez un agriculteur</option>
                  {agriculteurs.map((agriculteur) => (
                    <option
                      key={agriculteur.id}
                      value={agriculteur.id}
                    >
                      {agriculteur.nomUtilisateur}
                    </option>
                  ))}
                </Form.Control>
    </div>
  );
}

export default ListeAgriculteurs;
