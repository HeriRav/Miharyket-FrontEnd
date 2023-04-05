import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal, Alert } from "react-bootstrap";
import SoldeUtilisateur from "../SoldeUtilisateur";
import Swal from 'sweetalert2';

function ApprovisionnementHistorique({ approvisionnements }) {
  const [filteredAppros, setFilteredAppros] = useState(approvisionnements);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppro, setSelectedAppro] = useState(null);
  const [soldeCooperative, setSoldeCooperative] = useState("");
  const [paiementReussi, setPaiementReussi] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  
  useEffect(() => {
    const storedAppros = localStorage.getItem("approvisionnements");
    if (storedAppros) {
      setFilteredAppros(JSON.parse(storedAppros));
    } else {
      setFilteredAppros(approvisionnements);
    }
    const cooperative = JSON.parse(sessionStorage.getItem("user"));
    setSoldeCooperative(cooperative.soldeUtilisateur);
  }, [approvisionnements]);

  const handlePayer = (appro) => {
    setSelectedAppro(appro);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppro(null);
    setToastMessage(""); // Réinitialiser le message du toast
  };
  
 const handlePaiement = (event) => {
  event.preventDefault();
  const cooperative = JSON.parse(sessionStorage.getItem("user"));
  const prixTotal = selectedAppro[0] * selectedAppro[2];
  //const idApprovisionnement = selectedAppro[0];
  const idAgriculteur = selectedAppro[5];

  if (soldeCooperative >= prixTotal) {
    const newSolde = soldeCooperative - prixTotal;
    const newSoldebase = newSolde - soldeCooperative;

    const deal = {
      utilisateur: cooperative,
      dateDeal: new Date().toISOString().slice(0, 10), // Date du jour au format ISO
      montantDeal: prixTotal,
      typeDeal: "débit",
      libelleDeal: idAgriculteur,
    };

    // Envoyer la requête POST pour insérer le nouvel enregistrement dans la table deal
    fetch("http://localhost:8085/deals/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deal),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const updatedAppro = { ...selectedAppro, 6: "payé" }; // Mettre à jour l'objet de l'approvisionnement sélectionné avec le statut de paiement
        const updatedAppros = filteredAppros.map((appro, index) =>
          index === filteredAppros.indexOf(selectedAppro) ? updatedAppro : appro
        );

        // Mettre à jour l'état de filteredAppros avec le nouveau tableau d'approvisionnements
        setFilteredAppros(updatedAppros);
        // Enregistrer la liste des approvisionnements dans le localStorage
        localStorage.setItem("approvisionnements", JSON.stringify(updatedAppros));

        // Mettre à jour le solde de la coopérative dans le sessionStorage
        cooperative.soldeUtilisateur = newSolde;
        sessionStorage.setItem("user", JSON.stringify(cooperative));

        setSoldeCooperative(newSolde); // Mettre à jour l'état du solde de la coopérative avec le nouveau solde
        setPaiementReussi(true); // Mettre à jour la variable d'état paiementReussi
        setToastMessage("Paiement réussi");
        localStorage.setItem("approvisionnements", JSON.stringify(updatedAppros));
      })
      .catch((err) => console.log(err));
  } else {
    setToastMessage("Paiement impossible, solde insuffisant"); // Afficher le message d'erreur
  }
};

  return (
    <div>
      <div>
      <h4 className="text-black">Solde de la coopérative: <b> <SoldeUtilisateur id={sessionStorage.getItem("idCoop")} /> MGA </b> </h4>
      </div>
      <br />
      <br />
      <Table striped bordered hover className="text-center text-black">
        <thead>
          <tr>
            <th>Agriculteur</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix unitaire (MGA)</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {filteredAppros.filter((appro) => appro[6].toLowerCase().trim() === "non payé")
    .map((appro, index) => (
            <tr key={index}>
              <td>{appro[3]}</td>
              <td>{appro[4]}</td>
              <td>{appro[0]}</td>
              <td>{appro[2]}</td>
              <td>{new Date(appro[1]).toLocaleDateString("fr-FR")}</td>
              <td>
                {appro.paye ? (
                  <p>Payé</p>
                ) : (
                  <Button className="btn-dark" onClick={() => handlePayer(appro)}>Payer</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Paiement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group>
              
              <h4 className="text-black">Solde de la coopérative<b> <SoldeUtilisateur id={sessionStorage.getItem("idCoop")} /> MGA </b> </h4>
            </Form.Group>
            <Form.Group>
              <Form.Label>Nom de l'agriculteur :</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppro ? selectedAppro[3] : ""}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Produit :</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppro ? selectedAppro[4] : ""}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantité en kg/litre/pièce:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppro ? selectedAppro[0] : ""}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Prix d'unité en Ar:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppro ? selectedAppro[2] : ""}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Prix total à payer en Ar:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppro ? selectedAppro[0] * selectedAppro[2] - 0.05 * (selectedAppro[0] * selectedAppro[2]) : ""}
                disabled
              />
              <Alert variant="danger" className="mt-2">
                5% du montant total vous a été déversé
              </Alert>
            </Form.Group>
            <br />
            {toastMessage && <p>{toastMessage}</p>}{" "}
            {/* Affichage du message au-dessus des boutons */}

            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
          {" "}Annuler{" "}
          </Button>
          <Button variant="primary" onClick={handlePaiement} > 
          {" "}Payer{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ApprovisionnementHistorique;