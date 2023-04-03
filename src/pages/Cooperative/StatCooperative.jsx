import { useState, useEffect } from "react";
import ChartAgri from "./ChartAgri";
import Histogram from "../Agriculteur/Histogram";
import HistoAppro from "./HistoAppro";
import HistoChart from "./HistoChart";
import SoldeUtilisateur from "../SoldeUtilisateur";

function StatCooperative() {
  const [count, setCount] = useState([]);
  const [produits, setProduits] = useState([]);
  const [ventes, setVentes] = useState([]);
  let [counter, setCounter] = useState(0);
  const today = new Date();
  const formattedDate = today.toISOString().substring(0, 10);
  const idCoop = sessionStorage.getItem("idCoop");

  const idUser = sessionStorage.getItem("idUser");

  useEffect(() => {
    fetch(`http://localhost:8085/produits/cooperative/${idCoop}`)
      .then(response => response.json())
      .then(data => setProduits(data))
      .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    fetch(`http://localhost:8085/commandes/`)
      .then(response => response.json())
      .then(data => setVentes(data))
      .catch(err => console.log(err))
  }, [])
  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  

  useEffect(() => {
    fetch(`http://localhost:8085/api/utilisateurs/cooperatives/${idCoop}/agriculteurs`)
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);
  const nombreAgriculteur = users.length;
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
              <span className="count-numbers">{produits.length}</span>
              <span className="count-name">Produits</span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card-counter danger">
              <i className="fa fa-users"></i>
              <span className="count-numbers">{nombreAgriculteur}</span>
              <span className="count-name">Agriculteurs</span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card-counter warning">
              <i className="fa fa-wallet"></i>
              <span className="count-numbers"><SoldeUtilisateur id={sessionStorage.getItem("idCoop")} /></span>
              <span className="count-name">Solde(Ar)</span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card-counter info">
              <i className="fa fa-receipt"></i>
              <span className="count-numbers">{ventes.length}</span>
              <span className="count-name">Ventes</span>
            </div>
          </div>
        </div>
      </div><br />
      <div className="row">
        <div className="col-xl col-lg-7">
          {/* Area Chart */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Stock de la cooperative</h6>
            </div>
            <div className="card-body">
              <div className="chart-area">
                <Histogram endpoint={"http://localhost:8085/produits/cooperative/" + idCoop} />
              </div>
              <hr />

              <code></code>
            </div>
          </div>
          {/* Bar Chart */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Liste approvisionnement par agriculteur</h6>
            </div>
            <div className="card-body">
            <form onSubmit={handleFormSubmit}>
        <label htmlFor="startDate">Date de début :</label>
        <input type="date" id="startDate" name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />

        <label htmlFor="endDate">Date de fin :</label>
        <input type="date" id="endDate" name="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />

        <label htmlFor="user">Utilisateur :</label>
        <select id="user" name="user" value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
          <option value="">Sélectionnez un utilisateur</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.nomUtilisateur}</option>
          ))}
        </select>

        {/* <button type="submit">Afficher le graphique</button> */}
      </form>

      {startDate && endDate && selectedUser &&
        <>
          <HistoChart userId={selectedUser} startDate={startDate} endDate={endDate} />
          {/* <HistoAppro userId={selectedUser} startDate={startDate} endDate={endDate} /> */}
        </>
      }
    
            </div>
          </div>
        </div>
        {/* Donut Chart */}
        
      </div>
    </div>

  );
}
export default StatCooperative;

