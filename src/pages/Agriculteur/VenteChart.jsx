import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

const VenteChart = ({ userId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCommandeDetails = async () => {
      const response = await fetch(`http://localhost:8085/commandes/details/${userId}`);
      const commandeDetails = await response.json();
      setData(commandeDetails);
    };
    fetchCommandeDetails();
  }, [userId]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const getChartData = () => {
    const chartData = [['Date']];
    const produits = new Set();
    data.forEach((details) => {
      const nomProduit = details[3];
      if (!produits.has(nomProduit)) {
        produits.add(nomProduit);
        chartData[0].push(nomProduit);
      }
    });

    const dateMap = new Map();
    data.forEach((details) => {
      const date = formatDate(details[1]);
      const nomProduit = details[3];
      const quantite = details[2];

      if (!dateMap.has(date)) {
        const dateRow = [date];
        produits.forEach((produit) => {
          if (produit === nomProduit) {
            dateRow.push(quantite);
          } else {
            dateRow.push(0);
          }
        });
        dateMap.set(date, dateRow);
      } else {
        const dateRow = dateMap.get(date);
        const produitIndex = chartData[0].indexOf(nomProduit);
        dateRow[produitIndex] += quantite;
      }
    });

    chartData.push(...dateMap.values());
    return chartData;
  };

  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      data={getChartData()}
      options={{
        chart: {
          title: 'Ventes par produit et par date',
        },
        legend: { position: 'top', maxLines: 3 },
        vAxis: {
          title: 'Quantité',
        },
        hAxis: {
          title: 'Date',
        },
        bars: 'horizontal',
        seriesType: 'bars',
        series: { 5: { type: 'line' } },
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default VenteChart;
