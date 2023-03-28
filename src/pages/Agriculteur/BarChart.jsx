import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ id }) => {
  const [approvisionnements, setApprovisionnements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8085/approvisionnements/agriculteur/${id}`);
      const data = await response.json();
      setApprovisionnements(data);
    };
    fetchData();
  }, [id]);

  const labels = [];
  const prixUnitaires = [];
  for (let i = 0; i < approvisionnements.length; i++) {
    const approvisionnement = approvisionnements[i];
    const label = approvisionnement[4];
    if (labels.indexOf(label) === -1) {
      labels.push(label);
      prixUnitaires.push(approvisionnement[2]);
    } else {
      const index = labels.indexOf(label);
      prixUnitaires[index] += approvisionnement[2];
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total prix unitaire par produit',
        data: prixUnitaires,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;
