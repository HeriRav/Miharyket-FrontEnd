import { useState, useEffect } from "react";
import axios from "axios";
import ApprovisionnementHistogramme from "./ApprovisionnementHistogramme";
import Histogramme from "./Histogram";
import DonutChart from "./DonutChart";
import ApprovisionnementComboChart from "../ApprovisionnementComboChart";
import ComboChart from "../ComboChart";
import Appros from "./Appros";

function StatAgriculteur() {

  const [userId, setUserId] = useState(null);
  const [produitId, setProduitId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

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
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Faire quelque chose avec les dates et l'utilisateur sélectionnés (par exemple, appeler une fonction pour effectuer une requête API)
  }

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
        <div className="col-xl col-lg-9">
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
              <h6 className="m-0 font-weight-bold text-primary">Mes approvisionnements</h6>
            </div>
            <div className="card-body">
              <div className="chart-bar">
                <ComboChart userId={idAgriculteur} />
              </div>
              <hr />

              <code></code>
            </div>
          </div>
        </div>
        {/* Donut Chart */}
        <div className="col-xl- col-lg">
          <div className="card shadow mb-4">
            {/* Card Header - Dropdown */}
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Résumé de mes approvisionnements</h6>
            </div>
            {/* Card Body */}
            <div className="card-body">
              <div className="chart-pie pt-4">
                <div>
                  <form onSubmit={handleFormSubmit}>
                    <label htmlFor="startDate">Date de début :</label>
                    <input type="date" id="startDate" name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    
                    <label htmlFor="endDate">Date de fin :</label> <span/>
                    <input type="date" id="endDate" name="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />

                   

                    {/* <button type="submit">Afficher le graphique</button> */}
                  </form>

                  {startDate && endDate &&                     <Appros userId={idAgriculteur} startDate={startDate} endDate={endDate} />
                  }
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

