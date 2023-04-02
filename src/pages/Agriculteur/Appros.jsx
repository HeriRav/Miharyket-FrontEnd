import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

const Appros = ({ userId, startDate, endDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8085/approvisionnements/${userId}/${startDate}/${endDate}`);
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [userId, startDate, endDate]);

  const groupedData = data.reduce((acc, item) => {
    const productName = item[4];
    const quantity = item[0];
    if (acc[productName]) {
      acc[productName] += quantity;
    } else {
      acc[productName] = quantity;
    }
    return acc;
  }, {});

  const formattedData = Object.entries(groupedData).map(([name, quantity]) => [name, quantity]);

  return (
    <Chart
      chartType="PieChart"
      data={[['Produit', 'Quantité'], ...formattedData]}
      options={{
        title: 'Approvisionnement par produit',
        pieHole: 0.4,
        legend: 'bottom'
      }}
      graph_id="ApprovisionnementChart"
      width="100%"
      height="400px"
      loader={<div>Loading Chart</div>}
    />
  );
};

export default Appros;
