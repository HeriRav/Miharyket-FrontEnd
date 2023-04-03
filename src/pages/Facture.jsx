import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Link } from "react-router-dom";
// const [produit, setProd] = useState([]);


const Facture = () => {
    const [idCommande, setIdCommande]= useState(localStorage.getItem("idCommande"))
    const [panier, setPanier]= useState(localStorage.getItem("panier"));
    const price = localStorage.getItem('paie')
    const user = sessionStorage.getItem('idUser')
    // console.log(JSON.parse(panier));

    const [liste, setListe] =  useState(JSON.parse(panier));
    const personne = JSON.parse(sessionStorage.getItem("user"));
   
// export default function App() {
  return (
    <MDBContainer className="py-5">
      <MDBCard className="p-4">
        <MDBCardBody>
          <MDBContainer className="mb-2 mt-3">
            <MDBRow className="d-flex align-items-baseline">
              <MDBCol xl="9">
                <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                  Facture &gt; &gt; <strong>{idCommande}</strong>
                </p>
              </MDBCol>
              <MDBCol xl="3" className="float-end">
                <MDBBtn
                  color="light"
                  ripple="dark"
                  className="text-capitalize border-0"
                >
                  <MDBIcon fas icon="print" color="primary" className="me-1" />
                  Print
                </MDBBtn>
                <MDBBtn
                  color="light"
                  ripple="dark"
                  className="text-capitalize border-0 ms-2"
                >
                  <MDBIcon
                    far
                    icon="file-pdf"
                    color="danger"
                    className="me-1"
                  />
                  Export
                </MDBBtn>
                <hr />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <MDBContainer>
            <MDBCol md="12" className="text-center">
              {/* <MDBIcon
                fab
                icon="fa fa-tractor"
                size="4x"
                className="ms-0 "
                style={{ color: "#5d9fc5" }}
              /> */}
              <p className="pt-0 h1">Facture</p>
            </MDBCol>
          </MDBContainer>
          <MDBRow>
            <MDBCol xl="8">
              <MDBTypography listUnStyled>
                <li className="text-muted">
                  To: <span style={{ color: "#5d9fc5" }}>{personne.nomUtilisateur} {personne.prenomUtilisateur}</span>
                </li>
                <li className="text-muted">{personne.adresseUtilisateur}</li>             
                <li className="text-muted">
                  <MDBIcon fas icon="phone-alt" /> {personne.telephoneUtilisateur}
                </li>
              </MDBTypography>
            </MDBCol>
            <MDBCol xl="4">
              <p className="text-muted">Facturation</p>
              <MDBTypography listUnStyled>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                  <span className="fw-bold ms-1">ID:</span>#123-456
                </li>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                  <span className="fw-bold ms-1">Creation Date: </span>Jun
                  23,2021
                </li>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                  <span className="fw-bold ms-1">Status:</span>
                  <span className="badge bg-warning text-black fw-bold ms-1">
                    Unpaid
                  </span>
                </li>
              </MDBTypography>
            </MDBCol>
          </MDBRow>
          <MDBRow className="my-2 mx-1 justify-content-center">
            <MDBTable striped borderless>
              <MDBTableHead
                className="text-white"
                style={{ backgroundColor: "#84B0CA" }}
              >
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Description</th>
                  <th scope="col">Qté</th>
                  <th scope="col">Prix unitaire</th>
                  <th scope="col">Montant (Ar)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>                                
                {                    
                    liste.map((panier, index) => {                        
                        return(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{panier.nom}</td>
                                <td>{panier.quantity}</td>
                                <td>{panier.price}</td>
                                <td>{panier.total}</td>
                            </tr> 
                        )
                    })
                    
                }
              </MDBTableBody>
            </MDBTable>
          </MDBRow>
          <MDBRow>
            <MDBCol xl="8">
              <p className="ms-3">
                
              </p>
            </MDBCol>
            <MDBCol xl="3">             
              <p className="text-black float-start">
                <span className="text-black me-3"> Total: </span>
                <span style={{ fontSize: "25px" }}>{localStorage.getItem("paie")} Ariary</span>
              </p>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol xl="10">
              <p>Merci pour votre confiance!</p>
            </MDBCol>
            <MDBCol xl="2">
            <Link to='/panier'> 
                <MDBBtn
                    className="text-capitalize"
                    style={{ backgroundColor: "#60bdf3" }}
                >                
                Revenir
              </MDBBtn>
            </Link>             
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Facture;