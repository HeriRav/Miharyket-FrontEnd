import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

function Histogram(props) {
  const [data, setData] = useState([['Nom du produit', 'Quantité']]);

  useEffect(() => {
    fetch(props.endpoint)
      .then((response) => response.json())
      .then((fetchedData) => {
        const chartData = [['Nom du produit', 'Quantité']];
        fetchedData.forEach((item) => {
          chartData.push([item.nomProduit, item.stockProduit]);
        });
        setData(chartData);
      });
  }, [props.endpoint]);

  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType="ColumnChart"
      loader={<div>Chargement...</div>}
      data={data}
      options={{
        title: 'Quantités de produits',
        hAxis: {
          title: 'Produits',
        },
        vAxis: {
          title: 'Quantité',
          minValue: 0,
        },
      }}
      legendToggle
    />
  );
}

export default Histogram;