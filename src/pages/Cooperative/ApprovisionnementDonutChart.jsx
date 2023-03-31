import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

const ApprovisionnementDonutChart = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [approvisionnements, setApprovisionnements] = useState([]);
  const idCoop = sessionStorage.getItem("idCoop");

  useEffect(() => {
    axios.get(`http://localhost:8085/api/utilisateurs/cooperatives/${idCoop}/agriculteurs`)
      .then(res => {
        setUsers(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      axios.get(`http://localhost:8085/approvisionnements/agriculteur/${selectedUser}`)
        .then(res => {
          setApprovisionnements(res.data);
        })
        .catch(error => console.log(error));
    }
  }, [selectedUser]);

  const data = [
    ['Produit', 'Quantité'],
    ...approvisionnements.map(approvisionnement => [
      approvisionnement[4],
      approvisionnement[0],
    ]),
  ];

  return (
    <div>
      <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
        <option value="">Sélectionner un utilisateur</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.nomUtilisateur}</option>
        ))}
      </select>
      {selectedUser && approvisionnements.length > 0 && (
        <Chart
          chartType="PieChart"
          data={data}
          options={{
            title: 'Répartition des approvisionnements par produit',
            pieHole: 0.4,
          }}
          width="100%"
          height="400px"
        />
      )}
    </div>
  );
}

export default ApprovisionnementDonutChart;
