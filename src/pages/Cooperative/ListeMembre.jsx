import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberTable from './MemberTable';

function ListeMembre() {
  const [resultats, setResultats] = useState([]);
  const [nomUtilisateur, setLName] = useState('');
  const [cinAgriculteur, setCin] = useState('');
  const [adresseUtilisateur, setAdress] = useState('');
  const [email, setEmail] = useState('');
  const [telephoneUtilisateur, setPhone] = useState('');
  const [mdpUtilisateur, setPass] = useState('');
  const [confirmMdp, setConfirm] = useState('');
  const [typeUtilisateur] = useState('AGRICULTEUR');
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const user = sessionStorage.getItem('user');
  const reference = JSON.parse(user);
  const id = sessionStorage.getItem('idCoop');

  useEffect(() => {
    fetch(`http://localhost:8085/api/utilisateurs/cooperatives/${id}/agriculteurs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMembers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    setMembers(event.target.value);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const user = sessionStorage.getItem('user');
    if (validate()) {
      const agriculteur = {
        nomUtilisateur,
        login: email,
        adresseUtilisateur,
        cinAgriculteur,
        email,
        telephoneUtilisateur,
        mdpUtilisateur,
        typeUtilisateur,
        cooperative: { id: id },
      };
      fetch('http://localhost:8085/api/utilisateurs/ajout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agriculteur),
      })
        .then(() => {
          toast.success('Le compte a été enregistré avec succès');
          setTimeout(() => {
            setShowModal(false);
          }, 3000);
        })
        .then(() => {
          setMembers([...members, agriculteur]); // Add the new member to the state
          setCin('');
          setAdress('');
          setEmail('');
          setLName('');
          setPhone('');
          setPass('');
          setConfirm('');
        })
        .catch((err) => {
          toast.error('Inscription échouée : ' + err.message);
        });
    }
  };

  function handleInput(event) {
    const input = event.target.value.replace(/\D/g, '').substring(0, 12);
    const formattedInput = input.replace(/(\d{3})(?=\d)/g, '$1 ');

    setInputValue(formattedInput);
}
  
  const validate = () => {
    let result = true
    var validRegex = /^(?=.{1,64}@.{1,255}$)(?=.{1,64}@.{1,255}\..{2,63}$)(?=.{1,254}$)(?=.{1,320}$)[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+(?:\.[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/;
    if (nomUtilisateur === '' || nomUtilisateur === null) {
      result = false
      toast.warning('Veuillez entrer le nom')
    }
    if (cinAgriculteur.length < 12) {
      result = false
      toast.warning('Veuillez entrer un numéro CIN valide')
    }
    if (adresseUtilisateur === '' || adresseUtilisateur === null) {
      result = false
      toast.warning('Veuillez entrer l\'adresse')
    }
    if (email === '' || email === null) {
      result = false
      toast.warning('Veuillez entrer l\' adresse mail')
    }
    if (!email.match(validRegex)) {
      result = false
      toast.warning('Veuillez entrer un email valide')
    }
    if (telephoneUtilisateur === '' || telephoneUtilisateur === null) {
      result = false
      toast.warning('Veuillez entrer le numéro de téléphone')
    }
    if (telephoneUtilisateur.length < 10) {
      result = false
      toast.warning('Veuillez entrer un numéro de téléphone valide')
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

  return (
    <div>
      <h1 className="text-black">
        Liste des agriculteurs membres
        <Button variant="success" onClick={() => setShowModal(true)} className="float-right">
          <i className="fas fa-plus-circle fa-lg fa-fw mr-2"></i>
          Ajouter
        </Button>
      </h1>
      <MemberTable members={members} />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouvel agriculteur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form style={{paddingLeft:"3em", paddingRight:"3em"}}>
            <div className="form-group">
              <label htmlFor="nom" style={{fontSize:"16px", color:"black"}}>Nom :</label>
              <input required="required" type="text" className="form-control form-control-sm" id="nom" name="nom" value={nomUtilisateur} onChange={(e) => setLName(e.target.value)}  />
            </div>
            <div className="form-group">
              <label htmlFor="nom"  style={{fontSize:"16px", color:"black"}}>CIN :</label>
              <input required="required" maxLength={15} type="text" className="form-control form-control-sm" id="cin" name="cin" value={cinAgriculteur} onChange={(e) => setCin(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="adresse" style={{fontSize:"16px", color:"black"}}>Adresse :</label>
              <input required="required" type="text" className="form-control form-control-sm" id="adresse" name="adresse" value={adresseUtilisateur} onChange={(e) => setAdress(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="adresse" style={{fontSize:"16px", color:"black"}}>Contact :</label>
              <input required="required" type="text" className="form-control form-control-sm" id="contact" name="contact" value={telephoneUtilisateur} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="email" style={{fontSize:"16px", color:"black"}}>Email :</label>
              <input required="required" type="email" className="form-control form-control-sm" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{fontSize:"16px", color:"black"}}>Mot de passe :</label>
              <input required="required" type="password" className="form-control form-control-sm" id="password" name="password" value={mdpUtilisateur} onChange={(e) => setPass(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="confirmpassword" style={{fontSize:"16px", color:"black"}}>Confirmer mot de passe :</label>
              <input required="required" type="password" className="form-control form-control-sm" id="confirmPassword" name="confirmPassword" value={confirmMdp} onChange={(e) => setConfirm(e.target.value)}   />
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
