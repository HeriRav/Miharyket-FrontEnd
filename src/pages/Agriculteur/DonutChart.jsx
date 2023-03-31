import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

const DonutChart = ({ userId, produitId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCommandeDetails = async () => {
      const response = await fetch(`http://localhost:8085/commandes/${userId}/${produitId}`);
      const commandeDetails = await response.json();
      setData(commandeDetails);
    };
    fetchCommandeDetails();
  }, [userId, produitId]);

  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={[
        ['Date', 'Quantité'],
        ...data.map(([nomUtilisateur, dateCommande, quantiteLigneCommande, prixTotal]) => [
          dateCommande,
          quantiteLigneCommande,
        ]),
      ]}
      options={{
        title: `Ventes de chaque produit par utilisateur`,
        pieHole: 0.4,
      }}
    />
  );
};

export default DonutChart;
