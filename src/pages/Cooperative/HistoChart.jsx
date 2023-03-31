import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

const HistoChart = ({ userId, startDate, endDate }) => {
    const [data, setData] = useState([]);
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8085/approvisionnements/${userId}/${startDate}/${endDate}`);
            const result = await response.json();
            setData(result);
        };


        fetchData();
    }, [userId, startDate, endDate]);

    useEffect(() => {
        const formattedData = data.reduce((acc, item) => {
            const existingItemIndex = acc.findIndex(el => el[0] === item[4]);

            if (existingItemIndex !== -1) {
                acc[existingItemIndex][1] += item[0] * item[2];
            } else {
                acc.push([item[4], item[0] * item[2]]);
            }

            return acc;
        }, []);
        setPieData(formattedData);
    }, [data]);

    const groupedData = data.reduce((acc, item) => {
        const productName = item[4];
        const quantity = item[0];
        const price = item[2];
        const totalPrice = quantity;
        if (acc[productName]) {
            acc[productName] += totalPrice;
        } else {
            acc[productName] = totalPrice;
        }
        return acc;
    }, {});

    const formattedData = Object.entries(groupedData).map(([name, totalPrice]) => [name, totalPrice]);

    return (
        <div>
            <Chart
                chartType="ColumnChart"
                data={[['Produit', 'Quantité'], ...formattedData]}
                options={{
                    title: 'Quantité par produit par agriculteur',
                    legend: 'none'
                }}
                graph_id="ApprovisionnementChart"
                width="100%"
                height="400px"
                loader={<div>Chargement...</div>}
            />
            <Chart
                chartType="PieChart"
                data={[['Produit', 'Prix total'], ...pieData]}
                options={{
                    title: 'Revenue estimatif par produit par agriculteur',
                    legend: 'none'
                }}
                graph_id="PrixTotalChart"
                width="100%"
                height="400px"
                loader={<div>Chargement...</div>}
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
        </div>
    );
};

export default HistoChart;