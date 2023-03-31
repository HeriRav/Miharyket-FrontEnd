import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const ApprovisionnementHistogramme = () => {
  const [data, setData] = useState([]);
  const [idAgriculteur, setIdAgriculteur] = useState(sessionStorage.getItem("idAgriculteur"));

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8085/approvisionnements/agriculteur/"+idAgriculteur);
      const approvisionnements = result.data;

      // On filtre les approvisionnements pour ne garder que ceux de la date courante
      const approvisionnementsCourants = approvisionnements.filter(approvisionnement => {
        const dateCourante = new Date().toISOString().substring(0, 10);
        return approvisionnement[1] === dateCourante;
      });

      // On groupe les approvisionnements par produit en faisant la somme des quantités
      const approvisionnementsParProduit = {};
      approvisionnementsCourants.forEach(approvisionnement => {
        const produit = approvisionnement[4];
        const quantite = approvisionnement[2];
        if (!approvisionnementsParProduit[produit]) {
          approvisionnementsParProduit[produit] = 0;
        }
        approvisionnementsParProduit[produit] += quantite;
      });

      // On génère les labels et les valeurs pour le graphique
      const labels = Object.keys(approvisionnementsParProduit);
      const values = Object.values(approvisionnementsParProduit);

      // On met à jour le state avec les données des produits
      setData({
        labels,
        datasets: [
          {
            label: "Quantité",
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: values,
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Approvisionnement des produits</h2>
      <Bar
        data={data}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default ApprovisionnementHistogramme;
