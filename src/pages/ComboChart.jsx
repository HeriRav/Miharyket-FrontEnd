import React from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

class ComboChart extends React.Component {
  state = {
    approvisionnements: [],
  };

  componentDidMount() {
    const { userId } = this.props;
    axios.get(`http://localhost:8085/approvisionnements/agriculteur/${userId}`)
      .then(res => {
        this.setState({ approvisionnements: res.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { approvisionnements } = this.state;

    const data = [
      ['Date', 'Quantité', 'Prix unitaire'],
      ...approvisionnements.map(approvisionnement => [
        new Date(approvisionnement[1]), // Conversion de la chaîne de caractères en objet Date
        approvisionnement[0],
        approvisionnement[2],
      ]),
    ];

    return (
      <Chart
        chartType="ComboChart"
        data={data}
        options={{
        //   title: `Approvisionnement de l'agriculteur`,
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
              format: 'Ar ', // Format de devise
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
    );
  }
}

export default ComboChart;
