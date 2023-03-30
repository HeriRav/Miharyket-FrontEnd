import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

const ApprovisionnementComboChart = ({ userId }) => {
  const [approvisionnements, setApprovisionnements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8085/approvisionnements/agriculteur/${userId}`);
      setApprovisionnements(response.data);
    };
    fetchData();
  }, [userId]);

  const data = [
    ['Date', 'Quantité', 'Prix'],
    ...approvisionnements.map(approvisionnement => [
      new Date(approvisionnement[1]),
      approvisionnement[0],
      approvisionnement[2],
    ]),
  ];

  return (
    <Chart
      chartType="ComboChart"
      data={data}
      options={{
        title: 'Approvisionnement des agriculteurs',
        hAxis: {
          title: 'Date',
        },
        vAxis: {
          title: 'Quantité',
        },
        seriesType: 'bars',
        series: { 1: { type: 'line' } },
      }}
      width="100%"
      height="400px"
    />
  );
};

export default ApprovisionnementComboChart;