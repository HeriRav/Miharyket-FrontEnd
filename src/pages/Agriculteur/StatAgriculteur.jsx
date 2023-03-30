import { useState, useEffect } from "react";
import axios from "axios";
import ApprovisionnementHistogramme from "./ApprovisionnementHistogramme";
import Histogramme from "./Histogram";
import DonutChart from "./DonutChart";

function StatAgriculteur() {

  const [userId, setUserId] = useState(null);
  const [produitId, setProduitId] = useState(null);

  const handleUserChange = (event) => {
    setUserId(event.target.value);
  };

  const handleProduitChange = (event) => {
    setProduitId(event.target.value);
  };
  const [produits, setProduits] = useState([]);
  const [appros, setAppros] = useState([]);
  const [idAgriculteur, setIdAgriculteur] = useState(
    sessionStorage.getItem("idAgriculteur")
  );
  const [idCoop, setIdCoop] = useState(sessionStorage.getItem("idCoop"));

  useEffect(() => {
    const fetchAppros = async () => {
      const res = await axios.get(
        `http://localhost:8085/approvisionnements/agriculteur/${idAgriculteur}`
      );
      setAppros(res.data);
    };
    const fetchProduits = async () => {
      const res = await axios.get(
        `http://localhost:8085/produits/reference/${idCoop}`
      );
      setProduits(res.data);
    };
    fetchAppros();
    fetchProduits();
  }, [idAgriculteur, idCoop]);
  const user = sessionStorage.getItem("user");

  const countProduit = appros.length;
  const count = produits.length;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="card-counter primary">
              <i className="fa fa-shopping-cart"></i>
              <span className="count-numbers">{countProduit}</span>
              <span className="count-name">Produits</span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card-counter danger">
              <i className="fa fa-users"></i>
              <span className="count-numbers">{count}</span>
              <span className="count-name">Vente de la cooperative</span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card-counter warning">
              <i className="fa fa-wallet"></i>
              <span className="count-numbers">{user.soldeUtilisateur}</span>
              <span className="count-name">Solde(Ar)</span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card-counter info">
              <i className="fa fa-receipt"></i>
              <span className="count-numbers">{countProduit}</span>
              <span className="count-name">Approvisionnement</span>
            </div>
          </div>
        </div>
      </div><br />
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          {/* Area Chart */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Stock de la coopérative</h6>
            </div>
            <div className="card-body">
              <div className="chart-area">
                <Histogramme endpoint={"http://localhost:8085/produits/reference/" + idCoop} />
              </div>
              <hr />

              <code></code>
            </div>
          </div>
          {/* Bar Chart */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Bar Chart</h6>
            </div>
            <div className="card-body">
              <div className="chart-bar">
                <canvas id="myBarChart" />
              </div>
              <hr />
              Styling for the bar chart can be found in the
              <code>/js/demo/chart-bar-demo.js</code> file.
            </div>
          </div>
        </div>
        {/* Donut Chart */}
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            {/* Card Header - Dropdown */}
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Résumé des ventes</h6>
            </div>
            {/* Card Body */}
            <div className="card-body">
              <div className="chart-pie pt-4">
                <div>
                  <label className="form-label">
                    Sélectionnez un produit :
                    <select className="form-select" value={produitId} onChange={handleProduitChange}>
                      {produits.map(produit => (
                        <option key={produit.idProduit} value={produit.idProduit}>
                          {produit.nomProduit}
                        </option>
                      ))}
                      {/* Ajoutez autant d'options que nécessaire */}
                    </select>
                  </label>
                  <br />
                  {idCoop && produitId && <DonutChart userId={idCoop} produitId={produitId} />}
                </div>
              </div>
              <hr />
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}
export default StatAgriculteur;

