import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

function ListeMembre() {
  const [members, setMembers] = useState([
    {
      nom: 'John Doe',
      adresse: '123 Rue des Fleurs',
      email: 'john.doe@example.com'
    },
    {
      nom: 'Jane Doe',
      adresse: '456 Rue des Champs',
      email: 'jane.doe@example.com'
    },
    {
      nom: 'Bob Smith',
      adresse: '789 Rue des Arbres',
      email: 'bob.smith@example.com'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMember, setNewMember] = useState({
    nom: '',
    adresse: '',
    email: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleAddMember = () => {
    setMembers([...members, newMember]);
    setNewMember({ nom: '', adresse: '', email: '' });
    setShowModal(false);
  };

  return (
    <div>
      <h1>Liste des membres</h1>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.nom}</td>
                <td>{member.adresse}</td>
                <td>{member.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" onClick={() => setShowModal(true)} className="float-right">
          Ajouter agriculteur
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouvel agriculteur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="nom">Nom :</label>
              <input type="text" className="form-control" id="nom" name="nom" value={newMember.nom} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="adresse">Adresse :</label>
              <input type="text" className="form-control" id="adresse" name="adresse" value={newMember.adresse} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input type="email" className="form-control" id="email" name="email" value={newMember.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe :</label>
              <input type="password" className="form-control" id="email" name="password"  />
            </div>
            <div className="form-group">
              <label htmlFor="confirmpassword">Confirmer mot de passe :</label>
              <input type="password" className="form-control" id="email" name="confirmPassword"   />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
          <Button variant="primary" onClick={handleAddMember}>Ajouter</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListeMembre;
