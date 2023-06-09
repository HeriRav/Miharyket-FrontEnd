import React, { useState, useEffect } from "react";
import { Container,Alert, Row, Col, Form, Button, Table } from "react-bootstrap";
import iconProduct from "../../../farm-products.png";
import { Modal } from "react-bootstrap";
import { Result } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

function AjoutProduit() {
  const [photoUrl, setPhotoUrl] = useState("");

  let navigate = useNavigate();

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    setPhotoUrl(URL.createObjectURL(e.target.files[0]));
  };
  const [showModal, setShowModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [showApproDetails, setShowApproDetails] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);
  const [prix, setPrix] = useState(0);
  const [nouveauPrix, setNouveauPrix] = useState("");
  const idAgriculteur = sessionStorage.getItem("idAgriculteur");
  const [idProduit, setIdProduit] = useState("");
  const [produit, setProduit] = useState("");
  const [unite, setUnite] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [resultats, setResultats] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [detailAppro, setDetailAppro] = useState([]);
  const [detailTransaction, setDetailTransaction] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [stockProduit, setStock] = useState("");
  const [showCooperativeMessage, setShowCooperativeMessage] = useState(false);
  const user = sessionStorage.getItem("user");
  const reference = JSON.parse(user);
  const idCoop = sessionStorage.getItem("idCoop");
  const handleSave = () => {
    const currentproduct = new FormData();

    currentproduct.append("file", photo);
    currentproduct.append("nomProduit", produit);
    currentproduct.append("prixProduit", prix);
    currentproduct.append("categorieProduit", categorie);
    currentproduct.append("uniteProduit", unite);
    currentproduct.append("stockProduit", 0);
    currentproduct.append("descriptionProduit", description);
    currentproduct.append("referenceProduit", sessionStorage.getItem("idAgriculteur"));

    axios
      .put(`http://localhost:8085/produits/${idProduit}`, currentproduct, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(() => {
        toast.success("Le produit a été enregistré avec succès");
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      })
      .catch((err) => {
        toast.error("Création échouée : " + err.message);
      });
    setResultats([...resultats, currentproduct]);
    setNouveauPrix("");
  };

  const handleChangePrix = (event) => {
    setNouveauPrix(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrix(event.target.value);
    setShowCooperativeMessage(true);
  }
  const id = parseInt(sessionStorage.getItem("idUser"));
  useEffect(() => {
    
    const lien = "http://localhost:8085/produits/reference/" + idAgriculteur;
    fetch(lien)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setResultats(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function handleClick(userId, idProduit) {
    axios
      .get(
        `http://localhost:8085/approvisionnements/liste/${userId}/${idProduit}`
      )
      .then((response) => {
        setDetailAppro(response.data);
        console.log(detailAppro);
        console.log(userId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

function handleClickTransaction(userId, idProduit) {
  fetch(`http://localhost:8085/commandes/${userId}/${idProduit}`)
    .then(response => response.json())
    .then(data => {
      setDetailTransaction(data);
      console.log(detailTransaction);
      console.log(userId);
    })
    .catch(error => {
      console.log(error);
    });
}


  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const nouveauProduit = new FormData();
      nouveauProduit.append("file", photo);
      nouveauProduit.append("nomProduit", produit);
      nouveauProduit.append("prixProduit", prix);
      nouveauProduit.append("categorieProduit", categorie);
      nouveauProduit.append("uniteProduit", unite);
      nouveauProduit.append("stockProduit", 0);
      nouveauProduit.append("descriptionProduit", description);
      nouveauProduit.append(
        "referenceProduit",
        sessionStorage.getItem("idAgriculteur")
      );

      axios
        .post("http://localhost:8085/produits/ajout", nouveauProduit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("Le produit a été enregistré avec succès");
          setTimeout(() => {
            setCreateModal(false);
          }, 3000);
          // window.location.reload(true);
        })
        .catch((err) => {
          toast.error("Création échouée : " + err.message);
        });
      setResultats([...resultats, nouveauProduit]);
      setProduit("");
      setCategorie("");
      setDescription("");
      setUnite("");
      setPrix("");
      setPhotoUrl("");
      setStock("");
    }
  };

  const getIdProduit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8085/produits/" + idProduit)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setResultats(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  resultats.sort((a, b) => b.idProduit - a.idProduit);

  const validate = () => {
    let result = true;
    if (produit === "" || produit === null) {
      result = false;
      toast.warning("Veuillez mettre un nom pour le produit");
    }
    if (categorie === "" || categorie === null) {
      result = false;
      toast.warning("Veuillez ajouter une catégorie");
    }
    if (prix === "" || prix === null) {
      result = false;
      toast.warning("Veuillez mettre un tarif");
    }
    if (unite === "" || unite === null) {
      result = false;
      toast.warning("Veuillez ajouter une unité");
    }
    if (description === "" || description === null) {
      result = false;
      toast.warning("Veuillez mettre une brève description");
    }
    return result;
  };

  
  const handleModifierPrix = (index) => {
    setIndexSelectionne(index);
    setShowModal(true);
  };

  const keys = ["nomProduit", "categorieProduit", "uniteProduit"]

  return (
    <div className="mt-5 mb-5 text-black">
      <h1 className="text-center mt-5">Detail produits</h1>
      <h2 className="text-center">
        <div className="sidebar-brand-icon">
          <img src={iconProduct} alt="Mihary" className="img-fluid" />
        </div>
      </h2>
      <Row className="mb-1">
        <Col md={{ span: 3, offset: 0 }}>
          <Form.Control
            type="text"
            placeholder="Recherche"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </Col>
      </Row>

      <Row>
        <Col md={12} className="mb-4">
          <h1 className="mt-4">
            Liste des produits
            <button
              className="btn btn-success float-right"
              onClick={() => setCreateModal(true)}
            >
              <i className="fas fa-plus-circle fa-lg fa-fw mr-2"></i>
              Ajouter
            </button>
          </h1>
          <MDBTable
            striped
            bordered
            hover
            responsive
            style={{ fontSize: "0.9rem" }}
            className="text-black text-center"
          >
            <MDBTableHead>
              <tr>
                <th>Nom du produit</th>
                <th>Catégorie</th>
                <th>Prix actuel</th>
                <th>Stock</th>
                <th className="w-25">Photo</th>
                <th>Unité</th>
                <th className="w-5">Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {resultats
              
              .filter(produit => keys.some(key => produit[key]?.toLowerCase().includes(recherche)))
              .map((resultat, index) => (
                <tr key={index}>
                  <td className="align-middle">{resultat.nomProduit}</td>
                  <td className="align-middle">{resultat.categorieProduit}</td>
                  <td className="align-middle">{resultat.prixProduit}</td>
                  <td className="align-middle">{resultat.stockProduit}</td>
                  <td className="align-middle">
                    {resultat.photoProduit && (
                      <img
                        width={"100px"}
                        src={`data:image/jpeg;base64,${resultat.photoProduit}`}
                        alt={resultat.nomProduit}
                      />
                    )}
                  </td>
                  <td className="align-middle">{resultat.uniteProduit}</td>
                  <td>
                    <button
                      className="btn btn-link"
                      onClick={() => {
                        setShowModal(true);
                        setPrix(resultat.prixProduit);
                        setIdProduit(resultat.idProduit);
                        setCategorie(resultat.categorieProduit);
                        setProduit(resultat.nomProduit);
                        setStock(resultat.stockProduit);
                        setUnite(resultat.uniteProduit);
                        // getIdProduit();
                      }}
                    >
                      <i className="fa fa-edit "></i>
                    </button>
                    <button
                      className="btn btn-link"
                      onClick={() => {
                        setShowApproDetails(true);
                        console.log(idAgriculteur);
                        handleClick(idCoop, resultat.idProduit);
                      
                        setProduit(resultat.nomProduit);
                      
                        setUnite(resultat.uniteProduit);
                      
                      }}
                    >
                      <i className="fa fa-eye"></i>
                    </button>
                    <button
                      className="btn btn-link"
                      onClick={() => {
                        setShowTransaction(true);
                        console.log(idAgriculteur);
                        handleClickTransaction(idAgriculteur, resultat.idProduit);
                        console.log("idProdGip"+resultat.idProduit);
                        
                        setProduit(resultat.nomProduit);
                        
                        setUnite(resultat.uniteProduit);
                        
                      }}
                    >
                      <i className="fa fa-shopping-basket"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </Col>
      </Row>

      <Modal show={createModal} onHide={() => setCreateModal(false)}>
        <Modal.Header>
          <Modal.Title>Ajout produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Col className="mb-4">
          <Form onSubmit={handleSubmit}>
            <Row className="mt-5">
              <Form.Group as={Col} sm={12} controlId="produit">
                <Form.Label>Nom du produit</Form.Label>
                <Form.Control
                  type="text"
                  value={produit}
                  onChange={(e) => setProduit(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} sm={12} controlId="categorie">
                <Form.Label className="mt-4">Catégorie</Form.Label>
                <Form.Control
                  as="select"
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="Légume">Légume</option>
                  <option value="Fruit">Fruit</option>
                  <option value="Viande">Viande</option>
                  <option value="Produit laitier">Produit laitier</option>
                  <option value="Céréale">Céréale</option>
                  <option value="Produit arômatique">
                    Produit arômatique
                  </option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} sm={12} controlId="prix">
                <Form.Label className="mt-4">Prix de vente (MGA)</Form.Label>
                <Form.Control
                  type="text"
                  value={prix}
                  onChange={handlePriceChange}
                  style={{ borderColor: showCooperativeMessage ? "red" : "" }}
                />
                {showCooperativeMessage ? (
                  <Alert variant="danger" className="mt-2">
                    5% de ce prix sera reversé à la coopérative
                  </Alert>
                ) : null}
              </Form.Group>


                <Form.Group as={Col} sm={12} controlId="unite">
                  <Form.Label className="mt-4">Unité</Form.Label>
                  <Form.Control
                    as="select"
                    value={unite}
                    onChange={(e) => setUnite(e.target.value)}
                  >
                    <option value="">Sélectionnez l'unité</option>
                    <option value="l">Litre</option>
                    <option value="kg">Kilo</option>
                    <option value="pc">Pièce</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} sm={12} controlId="stockProduit">
                  <Form.Label className="mt-4">Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} sm={12} controlId="photo">
                  <Form.Label className="mt-4">Photo</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="file"
                      id="photoProduit"
                      name="photoProduit"
                      onChange={handlePhotoChange}
                    />
                    {photoUrl && (
                      <img
                        src={photoUrl}
                        alt="selected"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          marginLeft: "10px",
                        }}
                      />
                    )}
                  </div>
                </Form.Group>

                <Col sm={12}>
                  <Button variant="primary" type="submit" className="mt-5">
                    Ajouter
                  </Button>
                  <ToastContainer />
                </Col>
              </Row>
            </Form>
          </Col>
        </Modal.Body>
      </Modal>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier prix</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-row align-items-center">
              <input type="hidden" value={idProduit} />
              <div className="col-auto">
                <p>
                  <label className="mr-2" htmlFor="prixActuel">
                    Prix Actuel (MGA):
                  </label>
                  <span id="prixActuel">{prix}</span>
                </p>
                <p>
                  <label className="mr-2" htmlFor="nouveauPrix">
                    Nouveau prix (MGA):
                  </label>
                </p>
              </div>
              <div className="col-auto mt-4">
                <input
                  type="text"
                  className="form-control"
                  id="nouveauPrix"
                  placeholder="Nouveau prix"
                  value={nouveauPrix}
                  onChange={handleChangePrix}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              setPrix("");
              setNouveauPrix("");
            }}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSave();
              setPrix("");
              setNouveauPrix("");
            }}
          >
            Enregistrer
          </Button>
          <ToastContainer />
        </Modal.Footer>
      </Modal>

      <Modal
        className="modal-dialog modal-lg"
        show={showApproDetails}
        onHide={() => setShowApproDetails(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Détail Approvisionnement {produit}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table
            className="table table-striped table-bordered"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Agriculteur</th>
                <th>Quantité</th>
                <th>Prix unitaire(MGA)</th>
              </tr>
            </thead>
            <tbody>
            
              {detailAppro.map((detailAppro) => (
                <tr key={detailAppro.idApprovisionnement}>
                  <td>{detailAppro.dateApprovisionnement}</td>
                  <td>{detailAppro.utilisateur.nomUtilisateur}</td>
                  <td>
                    {detailAppro.quantiteApprovisionnement} {unite}
                  </td>
                  <td>{detailAppro.prixUnitaire} Ar</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowApproDetails(false);
              setPrix("");
              setNouveauPrix("");
            }}
          >
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal
        className="modal-dialog modal-lg"
        show={showTransaction}
        onHide={() => setShowTransaction(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Détail Transaction {produit}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table
            className="table table-striped table-bordered"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Client</th>
                <th>Date</th>
                <th>Quantité</th>
                <th>Prix total (MGA)</th>
              </tr>
            </thead>
            <tbody>
        {detailTransaction.map((row, index) => (
          <tr key={index}>
        
          <td>{row[0]}</td>
          <td>{row[1]}</td>
          <td>{row[2]} {unite}</td>
          <td>{row[3]} Ar</td>
          </tr>
        ))}
      </tbody>

          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowTransaction(false);
              setPrix("");
              setNouveauPrix("");
            }}
          >
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AjoutProduit;
