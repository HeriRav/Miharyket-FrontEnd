import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

const ChartAgri = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [approvisionnements, setApprovisionnements] = useState([]);
  const id = sessionStorage.getItem("idCoop");
  useEffect(() => {
    axios.get(`http://localhost:8085/api/utilisateurs/cooperatives/${id}/agriculteurs`)
      .then(res => {
        setUsers(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleUserChange = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);
    axios.get(`http://localhost:8085/approvisionnements/agriculteur/${userId}`)
      .then(res => {
        setApprovisionnements(res.data);
      })
      .catch(error => console.log(error));
  }

  const chartData = [
    ['Date', 'Quantité', 'Prix unitaire'],
    ...approvisionnements.map(approvisionnement => [
      new Date(approvisionnement[1]), // Conversion de la chaîne de caractères en objet Date
      approvisionnement[0],
      approvisionnement[2],
    ]),
  ];

  return (
    <div>
      <select value={selectedUser} onChange={handleUserChange}>
        <option value="">Sélectionner un Agriculteur</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.nomUtilisateur}</option>
        ))}
      </select>
      {selectedUser && approvisionnements.length > 0 && (
        <Chart
          chartType="ComboChart"
          data={chartData}
          options={{
            title: `Approvisionnement de l'agriculteur`,
            hAxis: {
              title: 'Date',
              format: 'dd/MM/yyyy', // Format de date en français
            },
            vAxes: {
              0: {
                title: 'Quantité',
              },
              1: {
                title: 'Prix unitaire',
                format: 'MGA #,##0.00', // Format de devise
              },
            },
            seriesType: 'bars',
            series: {
              1: { type: 'line', targetAxisIndex: 1 },
            },
            legend: {
              position: 'none',
            },
          }}
          width="100%"
          height="400px"
        />
      )}
    </div>
  );
}

export default ChartAgri;
