import { useState,useEffect } from "react";


function StatAgriculteur() {
  const [count, setCount] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8085/produits/count')
    .then(response => response.json())
    .then(data => setCount(data))
    .catch(err => console.log(err))
  }, [])

  return (
      <div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="card-counter primary">
              <i className="fa fa-shopping-cart"></i>
              <span className="count-numbers">{count}</span>
              <span className="count-name">Produits</span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card-counter danger">
              <i className="fa fa-users"></i>
              <span className="count-numbers">3</span>
              <span className="count-name">Agriculteurs</span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card-counter warning">
              <i className="fa fa-wallet"></i>
              <span className="count-numbers">0</span>
              <span className="count-name">Solde(Ar)</span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card-counter info">
              <i className="fa fa-receipt"></i>
              <span className="count-numbers">0</span>
              <span className="count-name">Recette</span>
            </div>
          </div>
        </div>
      </div><br/>
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          {/* Area Chart */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Area Chart</h6>
            </div>
            <div className="card-body">
              <div className="chart-area">
                <canvas id="myAreaChart" />
              </div>
              <hr />
              Styling for the area chart can be found in the
              <code>/js/demo/chart-area-demo.js</code> file.
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
              <h6 className="m-0 font-weight-bold text-primary">Donut Chart</h6>
            </div>
            {/* Card Body */}
            <div className="card-body">
              <div className="chart-pie pt-4">
                <canvas id="myPieChart" />
              </div>
              <hr />
              Styling for the donut chart can be found in the
              <code>/js/demo/chart-pie-demo.js</code> file.
            </div>
          </div>
        </div>
      </div>
    </div>
      
    );
  }
  export default StatAgriculteur;

