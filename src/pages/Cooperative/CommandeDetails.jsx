import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

const CommandeDetails = ({ userId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8085/details/${userId}`);
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [userId]);

  const formattedData = data.map(item => {
    return [item[3], item[2]];
  });

  return (
    <Chart
      chartType="PieChart"
      data={[['Produit', 'Quantité'], ...formattedData]}
      options={{
        title: 'Détails de commande par produit',
        pieHole: 0.4,
        legend: 'bottom'
      }}
      graph_id="CommandeDetailsChart"
      width="100%"
      height="400px"
      loader={<div>Loading Chart</div>}
    />
  );
};

export default CommandeDetails;
