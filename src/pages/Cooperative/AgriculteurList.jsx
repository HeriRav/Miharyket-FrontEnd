import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

function AgriculteurList({ cooperativeId, onSelect }) {
  const [agriculteurs, setAgriculteurs] = useState([]);
  const [selectedAgriculteurId, setSelectedAgriculteurId] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8085/api/utilisateurs/cooperatives/${cooperativeId}/agriculteurs`)
      .then(response => response.json())
      .then(data => setAgriculteurs(data));
  }, [cooperativeId]);

  const handleSelect = event => {
    setSelectedAgriculteurId(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <InputGroup>
      <FormControl as="select" onChange={handleSelect} value={selectedAgriculteurId}>
        <option>Sélectionnez un agriculteur</option>
        {agriculteurs.map(agriculteur => (
          <option key={agriculteur.id} value={agriculteur.id}>
            {agriculteur.nomUtilisateur}
          </option>
        ))}
      </FormControl>
    </InputGroup>
  );
}

export default AgriculteurList;