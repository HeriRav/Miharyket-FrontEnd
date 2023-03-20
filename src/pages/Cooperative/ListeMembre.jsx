import React, { useState,useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';import 'react-toastify/dist/ReactToastify.css'

function ListeMembre() {
  const [members, setMembers] = useState([
    {
      // nom: nomUtilisateur,
      // cin: cinAgriculteur,
      // adresse: adresseUtilisateur,
      // telephone: telephoneUtilisateur,
      // email: email
    }
  
  ]);
  useEffect(() => {
    fetch("http://localhost:8085/api/utilisateurs/agriculteurs")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMembers(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const [showModal, setShowModal] = useState(false);
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleAddMember = (e) => {
    e.preventDefault()
    if (validate()) {
      const user = {nomUtilisateur, login : email, adresseUtilisateur, email, telephoneUtilisateur, mdpUtilisateur, typeUtilisateur}
      fetch("http://localhost:8085/api/utilisateurs/ajout", {
          method:"POST", headers:{"Content-Type" : "application/json"}, body:JSON.stringify(user)
      }).then(() => {
            toast.success('Le compte a été enregistré avec succès')
            setShowModal(false)
            //react pour rediriger 
            window.location.reload(true);           
      }).catch((err) => {
          toast.error('Inscription échouée : ' +err.message)
      })
      console.log(user)

      // window.location.replace('http://localhost:5174/dashboard-coop#');
  }
  };

  const validate = () => {
    let result = true
    if (nomUtilisateur === '' || nomUtilisateur === null) {
        result = false
        toast.warning('Veuillez entrer le nom')
    }
    if (cinAgriculteur === '' || cinAgriculteur === null) {
        result = false
        toast.warning('Veuillez entrer le numéro')
    }
    if (adresseUtilisateur === '' || adresseUtilisateur === null) {
        result = false
        toast.warning('Veuillez entrer l\'adresse')
    }
    if (email === '' || email === null) {
        result = false
        toast.warning('Veuillez entrer l\' adresse mail')
    }
    if (telephoneUtilisateur === '' || telephoneUtilisateur === null) {
        result = false
        toast.warning('Veuillez entrer le numéro de téléphone')
    }
    if (mdpUtilisateur === '' || mdpUtilisateur === null) {
        result = false
        toast.warning('Veuillez entrer le mot de passe')
    }
    if (confirmMdp === '' || confirmMdp === null) {
        result = false
        toast.warning('Veuillez confirmer le mot de passe')
    }
    if (mdpUtilisateur !== confirmMdp){
        result = false
        toast.warning('Les mots de passe ne correspondent pas')
    }
    return result
}

  const [nomUtilisateur, setLName] = useState('')
  const [cinAgriculteur, setCin] = useState('')
  const [adresseUtilisateur, setAdress] = useState('')
  const [email, setEmail] = useState('')
  const [telephoneUtilisateur, setPhone] = useState('')
  const [mdpUtilisateur, setPass] = useState('')
  const [confirmMdp, setConfirm] =useState('')
  const [typeUtilisateur] = useState('AGRICULTEUR')
  

  return (
    <div>
      <h1>Liste des agriculteurs membres</h1>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom</th>
              <th>CIN</th>
              <th>Adresse</th>
              <th>Contact</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.nomUtilisateur}</td>
                <td>{member.cinAgriculteur}</td>
                <td>{member.adresseUtilisateur}</td>
                <td>{member.telephoneUtilisateur}</td>
                <td>{member.login}</td>
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
          <form style={{paddingLeft:"3em", paddingRight:"3em"}}>
            <div className="form-group">
              <label htmlFor="nom" style={{fontSize:"16px", color:"black"}}>Nom :</label>
              <input type="text" className="form-control" id="nom" name="nom" value={nomUtilisateur} onChange={(e) => setLName(e.target.value)}  />
            </div>
            <div className="form-group">
              <label htmlFor="nom" style={{fontSize:"16px", color:"black"}}>CIN :</label>
              <input type="number" maxLength={12} className="form-control form-control-sm" id="cin" name="cin" value={cinAgriculteur} onChange={(e) => setCin(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="adresse" style={{fontSize:"16px", color:"black"}}>Adresse :</label>
              <input type="text" className="form-control form-control-sm" id="adresse" name="adresse" value={adresseUtilisateur} onChange={(e) => setAdress(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="adresse" style={{fontSize:"16px", color:"black"}}>Contact :</label>
              <input type="text" className="form-control form-control-sm" id="contact" name="contact" value={telephoneUtilisateur} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="email" style={{fontSize:"16px", color:"black"}}>Email :</label>
              <input type="email" className="form-control form-control-sm" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{fontSize:"16px", color:"black"}}>Mot de passe :</label>
              <input type="password" className="form-control form-control-sm" id="password" name="password" value={mdpUtilisateur} onChange={(e) => setPass(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="confirmpassword" style={{fontSize:"16px", color:"black"}}>Confirmer mot de passe :</label>
              <input type="password" className="form-control form-control-sm" id="confirmPassword" name="confirmPassword" value={confirmMdp} onChange={(e) => setConfirm(e.target.value)}   />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
          <Button variant="primary" onClick={handleAddMember}>Ajouter</Button>
          <ToastContainer/>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListeMembre;
