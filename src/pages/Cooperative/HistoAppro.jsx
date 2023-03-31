import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

const HistoAppro = ({ userId, startDate, endDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8085/approvisionnements/${userId}/${startDate}/${endDate}`);
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [userId, startDate, endDate]);

  const formattedData = data.reduce((acc, item) => {
    const existingItemIndex = acc.findIndex(el => el[0] === item[4]);

    if (existingItemIndex !== -1) {
      acc[existingItemIndex][1] += item[0] * item[2];
    } else {
      acc.push([item[4], item[0] * item[2]]);
    }

    return acc;
  }, []);

  return (
    <Chart
      chartType="PieChart"
      data={[['Produit', 'Dépenses'], ...formattedData]}
      options={{
        title: 'Revenue estimatif par produit par agriculteur',
        pieHole: 0.4,
        legend: 'bottom'
      }}
      graph_id="ApprovisionnementChart"
      width="100%"
      height="400px"
      loader={<div>Loading Chart</div>}
      formatters={[
        {
          type: 'NumberFormat',
          column: 1,
          options: {
            suffix: ' MGA',
            pattern: '#,##0.00'
          }
        }
      ]}
    />
  );
};

export default HistoAppro;
