import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import iconProduct from "../../../farm-products.png";

function AjouterProduit() {
 
  const [nomProduit, setProduit] = useState("");
  const [descriptionCategorie, setDescription] = useState("");
  const [nomCategorie, setCategorie] = useState("");
  const [resultats, setResultats] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nouveauProduit = {
      nomProduit: nomProduit,
      nomCategorie: nomCategorie,
      descriptionCategorie: descriptionCategorie
    };
    setResultats([...resultats, nouveauProduit]);
    setProduit("");
    setCategorie("");
    setDescription("");
  };

  // Filtrer les résultats en fonction de la recherche
  const filteredResults = resultats.filter(
    (resultat) =>
      resultat.nomProduit.toLowerCase().includes(recherche.toLowerCase()) ||
      resultat.nomCategorie.toLowerCase().includes(recherche.toLowerCase()) ||
      resultat.descriptionCategorie.toLowerCase().includes(recherche.toLowerCase())
  );

  // Obtenir le nombre total de pages
  const totalPages = Math.ceil(filteredResults.length / productsPerPage);

  // Obtenir les résultats pour la page actuelle
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredResults.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Fonction pour changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

// const addProduct =(e) => {
//   e.preventDefault()
//   if (validate()){
//     const categorie = {nomCategorie, descriptionCatégorie}
//       fetch("http://localhost:8085/categories/ajout", {
//       method:"POST", headers:{"Content-Type" : "application/json"}, body:JSON.stringify(categorie)
//       }).then(() => {
//             toast.success('Le produit a été enregistré avec succès')
//       }).catch((err) => {
//           toast.error('L\'ajout du produit a échoué : ' +err.message)
//       })
//     const product = {nomProduit}
//     fetch("http://localhost:8085/produits/ajout", {
//       method:"POST", headers:{"Content-Type" : "application/json"}, body:JSON.stringify(produit)
//     })
//   }
// }

  return (
<Container className="mt-5 mb-5">
      <h1 className="text-center mt-5">Liste de vos produits</h1>
      <h2 className="text-center">
        <div className="sidebar-brand-icon">
          <img src={iconProduct} alt="Mihary" className="img-fluid" />
        </div>
      </h2>
      <Row className="mt-4 mb-4">
        <Col md={{ span: 4, offset: 8 }}>
          <Form.Control
            type="text"
            placeholder="Rechercher un produit"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom du produit</th>
            <th>Catégorie</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((resultat, index) => (
            <tr key={index}>
              <td>{resultat.produit}</td>
              <td>{resultat.categorie}</td>
              <td>{resultat.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3 className=" mt-5" >Ajout nouveau produit</h3>
      

      <Form onSubmit={handleSubmit}>
        <Row className="mt-5">
          <Form.Group as={Col} md={4} controlId="produit">
            <Form.Label>Nom du produit</Form.Label>
            <Form.Control
              type="text"
              value={nomProduit}
              onChange={(e) => setProduit(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md={4} controlId="categorie">
            <Form.Label>Catégorie</Form.Label>
            <Form.Control
              as="select"
              value={nomCategorie}
              onChange={(e) => setCategorie(e.target.value)}
            >
              <option value="">Sélectionnez une catégorie</option>
              <option value="legume">Légume</option>
              <option value="fruit">Fruit</option>
              <option value="fruit">Céréale</option>
              <option value="fruit">Produit laitier</option>
              <option value="fruit">Viande</option>
              <option value="fruit">Plante aromatique</option>
              
            </Form.Control>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={8} controlId="description" className="mt-4">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Entrer la description"
              value={descriptionCategorie}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row>
          <Col>
            <Button variant="primary" type="submit" className="mt-4">
              Ajouter
            </Button>
          </Col>
        </Row>
      </Form>

      
    </Container>
  );
}

export default AjouterProduit;
