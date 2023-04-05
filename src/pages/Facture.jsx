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
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";
// const [produit, setProd] = useState([]);


const Facture = () => {
  const [idCommande, setIdCommande]= useState(localStorage.getItem("idCommande"))
  const [panier, setPanier]= useState(localStorage.getItem("panier"));
  const price = localStorage.getItem('paie')
  const user = sessionStorage.getItem('idUser')
  // console.log(JSON.parse(panier));

  const [liste, setListe] =  useState(JSON.parse(panier));
  const personne = JSON.parse(sessionStorage.getItem("user"));

  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const date = new Date()
    .toLocaleDateString("fr-FR", options)
    .split("/")
    // .reverse()
    .join("-");
  
  const exportPDF = () => {

    // const doc = new jsPDF("portrait", "px", [841.89, 595.28]);
  
    const doc = new jsPDF("landscape", "px", [window.screen.width, window.screen.height]);
  
    doc.setPage(0,0);
  
    const page = document.getElementById('facture');
  
    if (!page) {
      console.error("L'élément HTML avec l'ID 'facture' n'a pas été trouvé dans le DOM.");
      return;
    }
  
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = -5;
      
    doc.html(page, {
       callback: function () {
          if (doc.lastAutoTable) {
            y = doc.lastAutoTable.finalY;
          }
          if (y > pageHeight - 5) { // Si le contenu dépasse la limite de taille
            doc.addPage([800, 500]); // Ajouter une nouvelle page avec la taille spécifiée
            y = 5; // Réinitialiser la position Y
          }
          doc.setFontSize(5); // taille de la police en points (par défaut = 16)
          doc.html(page, { // Ajouter le contenu HTML à la page actuelle
            y: y,
            callback: function () {
              doc.save('facture.pdf');
            }
          });
       }
    });
  }

  return (
    <>
    <title>Mihary'ket - Facture</title>
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
              <MDBCol xl="2" className="float-end text-center">
                <button
                  color="light"
                  ripple="dark"
                  className="text-capitalize border-0 ms-2 btn btn-dark"
                  onClick={exportPDF}
                >
                  <MDBIcon
                    far
                    icon="file-pdf"
                    color="danger"
                    className="me-1"
                  />
                  &nbsp;Exporter
                </button>
                <hr />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <div id="facture">
          <MDBContainer>
            <MDBCol md="12" className="text-center">
              {/* <MDBIcon
                fab
                icon="fa fa-tractor"
                size="4x"
                className="ms-0 "
                style={{ color: "#5d9fc5" }}
              /> */}
              <p className="pt-0 h1 text-primary">Facture</p>
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
              <p className="text-muted">Facture</p>
              <MDBTypography listUnStyled>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                  <span className="fw-bold ms-1">Référence de la commande:</span> C-0{idCommande}
                </li>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                  <span className="fw-bold ms-1">Date: </span> {date}
                </li>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                  <span className="fw-bold ms-1">Statut:</span>&nbsp;
                  <span className="badge bg-success text-light fw-bold ms-1">
                    Payé
                  </span>
                </li>
              </MDBTypography>
            </MDBCol>
          </MDBRow>
          <MDBRow className="my-2 mx-1 justify-content-center">
            <MDBTable striped borderless>
              <MDBTableHead
                className="text-white"
                style={{ backgroundColor: "#116530" }}
              >
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Description</th>
                  <th scope="col">Qté</th>
                  <th scope="col">Prix unitaire</th>
                  <th scope="col">Montant (MGA)</th>
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
                <p style={{ fontSize: "18px" }} className="text-black me-3">Montant total : MGA {localStorage.getItem("paie")}</p>
              </p>
            </MDBCol>
          </MDBRow>
          </div>
          <hr />
          <MDBRow>
            <MDBCol xl="10">
              <p>Merci pour votre confiance! Nous vous contatcerons de suite pour la livraison</p>
            </MDBCol>
            <MDBCol xl="2">
            <Link to='/panier'> 
                <Button
                    className="text-capitalize btn-primary w-100 d-flex align-items-center flex-column"
                >                
                Revenir
              </Button>
            </Link>             
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </>
  );
}

export default Facture;