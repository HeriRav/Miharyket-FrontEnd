import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";


function ApprovisionnementHistorique({ approvisionnements }) {
  const [filteredAppros, setFilteredAppros] = useState(approvisionnements);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppro, setSelectedAppro] = useState(null);
  const [soldeCooperative, setSoldeCooperative] = useState("");
  const [paiementReussi, setPaiementReussi] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  
  

  // Récupération du solde Utilisateur depuis le sessionStorage
  
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
  

  const handlePayer = (index) => {
    // Récupération de l'approvisionnement sélectionné
    const appro = filteredAppros[index];
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
  

  if (soldeCooperative >= prixTotal) {
    const newSolde = soldeCooperative - prixTotal;
    const newSoldebase = newSolde - soldeCooperative;
    
    const updatedAppro = { ...selectedAppro, paye: true }; // Mettre à jour l'objet de l'approvisionnement sélectionné avec la propriété 'paye'
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

   
    // Mettre à jour le solde de la coopérative dans la base de données
    fetch(`http://localhost:8085/api/utilisateurs/${cooperative.id}/${newSoldebase}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSoldeCooperative(newSolde); // Mettre à jour l'état du solde de la coopérative avec le nouveau solde
        setPaiementReussi(true); // Mettre à jour la variable d'état paiementReussi
        setToastMessage("Paiement réussi");
        localStorage.setItem("approvisionnements", JSON.stringify(updatedAppros));


      })
      .catch((err) => console.log(err));
  } else {
    setToastMessage("Paiement impossible, solde insuffisant"); // Afficher le message d'erreur
  }
  console.log(prixTotal)
};

  return (
    <div>
      <div>
      <h4>Solde de la coopérative: {soldeCooperative} Ar </h4>
        <br />     
        {/* Autres éléments JSX pour le paiement */}
      </div>
      <br />
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Agriculteur</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Date</th>
            <th>Payer</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppros.map((appro, index) => (
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
                  <Button onClick={() => handlePayer(index)}>Paiement</Button>
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
              
              <h4>Solde de la coopérative: {soldeCooperative} Ar </h4>
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
                value={selectedAppro ? selectedAppro[0] * selectedAppro[2] : ""}
                disabled
              />
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