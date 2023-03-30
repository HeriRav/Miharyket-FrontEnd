import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardGroup from "react-bootstrap/CardGroup";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Component } from "react";

function Product() {
  const [produit, setProd] = useState([]);
  let [count, setCount] = useState(
    localStorage.getItem("nb_article") == null
      ? 1
      : localStorage.getItem("nb_article")
  );
  let navigate = useNavigate();

  const images = [
    { categorieProduit: "Viande", src: "/src/images/meat.jpg" },
    { categorieProduit: "Légume", src: "/src/images/organic-vegetable.jpg" },
    { categorieProduit: "Fruit", src: "/src/images/organic-fruit.jpg" },
    {
      categorieProduit: "Produit laitier",
      src: "/src/images/dairy-product.jpg",
    },
    { categorieProduit: "Céréale", src: "/src/images/cereal.jpg" },
    {
      categorieProduit: "Produit arômatique",
      src: "/src/images/aromatic-product.jpg",
    },
  ];

  const redirect = (id, nom, stock, price, unit, category) => {
    
    /*
            1. créer une variable dans le localstorage
            2. envoyer l'id du produit, le prix unitaire et la quantité par défaut (1) dans localstorage
            3. mettre à jour le nombre d'article sélectionné (badge de notification)
        */
    if (localStorage.getItem(nom) == null) {
      toast.success("Ajout réussi");
      localStorage.setItem(
        nom,
        JSON.stringify({
          nom: nom,
          id: id,
          stock: stock,
          price: price,
          quantity: 1,
          unit: unit,
          category: category,
        })
        
      );
      
    } else {
      let item = JSON.parse(localStorage.getItem(nom));
      item.quantity++;

      localStorage.setItem(nom, JSON.stringify(item));
    }

    setCount(count + 1);
    localStorage.setItem("nb_article", count);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const needLogin = () => {
    navigate("/authentification");
    toast.warning("Vous devez vous connecter");
  };

  useEffect(() => {
    fetch("http://localhost:8085/produits/list")
      .then((response) => response.json())
      .then((data) => setProd(data))
      .catch((err) => console.log(err));
  }, []);

  produit.sort((a, b) => b.idProduit - a.idProduit);

  const filterProduct = (cat) => {
    console.log(cat)
    const updateProduct = produit.filter((categorieProd) => {
      return categorieProd.categorieProduit === cat
    })

    setProd(updateProduct)
  }

  return (
    <div>
      <title>Mihary'ket - Nos produits</title>
      <ToastContainer />
      <div
        className="intro-section site-blocks-cover innerpage"
        style={{ backgroundImage: "url('/src/images/hero_2.jpg')" }}
      >
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-lg-12 mt-5" data-aos="fade-up">
              <h1>Nos produits</h1>
              <p className="text-white text-center">
                <Link to="/">Accueil</Link>
                <span className="mx-2">/</span>
                <span>Produits</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div data-aos="fade-up" style={{ backgroundColor: "#ebebeb" }}>
        <div
          className="text-center"
          style={{ backgroundColor: "#dbdbdb", padding: "25px" }}
        >
          <button className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold" onClick={() => filterProduct('Fruit')}>
            Fruits
          </button>
          <button className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold" onClick={() => filterProduct('Légume')}>
            Légumes
          </button>
          <button className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold" onClick={() => filterProduct('Viande')}>
            Viandes
          </button>
          <button className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold" onClick={() => filterProduct('Céréale')}>
            Céréales
          </button>
          <button className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold" onClick={() => filterProduct('Produit laitier')}>
            Produits laitiers
          </button>
          <button className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold" onClick={() => filterProduct('Produit arômatique')}>
            Produits arômatiques
          </button>
          <button className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold" onClick={() => setProd(produit)}>
            Tous
          </button>
        </div>
        <h1>Fruits</h1>
        <Carousel
          responsive={responsive}
          ssr={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {produit &&
            produit
              .filter(
                (product) =>
                  product.stockProduit !== 0 &&
                  product.categorieProduit === "Fruit"
              )
              .map((product) => {
                return (
                  <div className="container-sm" key={product.idProduit}>
                  
                    <Col className="d-flex">
                      {sessionStorage.getItem("typeUser") === "CLIENT" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <Button
                              className="primary w-100 d-flex align-items-center flex-column"
                              onClick={() =>
                                redirect(
                                  product.idProduit,
                                  product.nomProduit,
                                  product.prixProduit,
                                  product.stockProduit,
                                  product.uniteProduit,
                                  product.categorieProduit
                                
                                )

                              }
                            >
                              + Ajouter au panier
                            </Button>
                          </Card.Footer>
                        </Card>
                      ) : sessionStorage.getItem("typeUser") ===
                        "COOPERATIVE" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                        </Card>
                      ) : sessionStorage.getItem("typeUser") ===
                        "AGRICULTEUR" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                        </Card>
                      ) : (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <Button
                              className="primary w-100 d-flex align-items-center flex-column"
                              onClick={needLogin}
                            >
                              + Ajouter au panier
                            </Button>
                          </Card.Footer>
                        </Card>
                      )}
                    </Col>
                  </div>
                );
              })}
        </Carousel>
        <br />
        <h1>Légumes</h1>
        <Carousel
          responsive={responsive}
          ssr={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {produit &&
            produit
              .filter(
                (product) =>
                  product.stockProduit !== 0 &&
                  product.categorieProduit === "Légume"
              )
              .map((product) => {
                return (
                  <div className="container-sm" key={product.idProduit}>
                    <Col className="d-flex">
                      {sessionStorage.getItem("typeUser") === "CLIENT" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <Button
                              className="primary w-100 d-flex align-items-center flex-column"
                              onClick={() =>
                                redirect(
                                  product.idProduit,
                                  product.nomProduit,
                                  product.stockProduit,
                                  product.prixProduit,
                                  product.uniteProduit,
                                  product.categorieProduit
                                )
                              }
                            >
                              + Ajouter au panier
                            </Button>
                          </Card.Footer>
                        </Card>
                      ) : sessionStorage.getItem("typeUser") ===
                        "COOPERATIVE" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                        </Card>
                      ) : sessionStorage.getItem("typeUser") ===
                        "AGRICULTEUR" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                        </Card>
                      ) : (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <Button
                              className="primary w-100 d-flex align-items-center flex-column"
                              onClick={needLogin}
                            >
                              + Ajouter au panier
                            </Button>
                          </Card.Footer>
                        </Card>
                      )}
                    </Col>
                  </div>
                );
              })}
        </Carousel>
        <br />
        <h1>Viandes</h1>
        <Carousel
          responsive={responsive}
          ssr={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {produit &&
            produit
              .filter(
                (product) =>
                  product.stockProduit !== 0 &&
                  product.categorieProduit === "Viande"
              )
              .map((product) => {
                return (
                  <div className="container-sm" key={product.idProduit}>
                    <Col className="d-flex">
                      {sessionStorage.getItem("typeUser") === "CLIENT" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <Button
                              className="primary w-100 d-flex align-items-center flex-column"
                              onClick={() =>
                                redirect(
                                  product.idProduit,
                                  product.nomProduit,
                                  product.prixProduit
                                )
                              }
                            >
                              + Ajouter au panier
                            </Button>
                          </Card.Footer>
                        </Card>
                      ) : sessionStorage.getItem("typeUser") ===
                        "COOPERATIVE" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                        </Card>
                      ) : sessionStorage.getItem("typeUser") ===
                        "AGRICULTEUR" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                        </Card>
                      ) : (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <Button
                              className="primary w-100 d-flex align-items-center flex-column"
                              onClick={needLogin}
                            >
                              + Ajouter au panier
                            </Button>
                          </Card.Footer>
                        </Card>
                      )}
                    </Col>
                  </div>
                );
              })}
        </Carousel>
        <br />
        <h1>Céréales</h1>
        <Carousel
          responsive={responsive}
          ssr={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {produit &&
            produit
              .filter(
                (product) =>
                  product.stockProduit !== 0 &&
                  product.categorieProduit === "Céréale"
              )
              .map((product) => {
                return (
                  <div className="container-sm" key={product.idProduit}>
                    <Col className="d-flex">
                      {sessionStorage.getItem("typeUser") === "CLIENT" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <Button
                              className="primary w-100 d-flex align-items-center flex-column"
                              onClick={() =>
                                redirect(
                                  product.idProduit,
                                  product.nomProduit,
                                  product.prixProduit
                                )
                              }
                            >
                              + Ajouter au panier
                            </Button>
                          </Card.Footer>
                        </Card>
                      ) : sessionStorage.getItem("typeUser") ===
                        "COOPERATIVE" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                        </Card>
                      ) : sessionStorage.getItem("typeUser") ===
                        "AGRICULTEUR" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                        </Card>
                      ) : (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <Button
                              className="primary w-100 d-flex align-items-center flex-column"
                              onClick={needLogin}
                            >
                              + Ajouter au panier
                            </Button>
                          </Card.Footer>
                        </Card>
                      )}
                    </Col>
                  </div>
                );
              })}
        </Carousel>
        <br />
        <h1>Produits laitiers</h1>
        <Carousel
          responsive={responsive}
          ssr={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {produit &&
            produit
              .filter(
                (product) =>
                  product.stockProduit !== 0 &&
                  product.categorieProduit === "Produit laitier"
              )
              .map((product) => {
                return (
                  <div className="container-sm" key={product.idProduit}>
                    <Col className="d-flex">
                      {sessionStorage.getItem("typeUser") === "CLIENT" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <Button
                              className="primary w-100 d-flex align-items-center flex-column"
                              onClick={() =>
                                redirect(
                                  product.idProduit,
                                  product.nomProduit,
                                  product.prixProduit
                                )
                              }
                            >
                              + Ajouter au panier
                            </Button>
                          </Card.Footer>
                        </Card>
                      ) : sessionStorage.getItem("typeUser") ===
                        "COOPERATIVE" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                        </Card>
                      ) : sessionStorage.getItem("typeUser") ===
                        "AGRICULTEUR" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                        </Card>
                      ) : (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <Button
                              className="primary w-100 d-flex align-items-center flex-column"
                              onClick={needLogin}
                            >
                              + Ajouter au panier
                            </Button>
                          </Card.Footer>
                        </Card>
                      )}
                    </Col>
                  </div>
                );
              })}
        </Carousel>
        <br />
        <h1>Produits arômatiques</h1>
        <Carousel
          responsive={responsive}
          ssr={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {produit &&
            produit
              .filter(
                (product) =>
                  product.stockProduit !== 0 &&
                  product.categorieProduit === "Produit arômatique"
              )
              .map((product) => {
                return (
                  <div className="container-sm" key={product.idProduit}>
                    <Col className="d-flex">
                      {sessionStorage.getItem("typeUser") === "CLIENT" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <Button
                              className="primary w-100 d-flex align-items-center flex-column"
                              onClick={() =>
                                redirect(
                                  product.idProduit,
                                  product.nomProduit,
                                  product.prixProduit
                                )
                              }
                            >
                              + Ajouter au panier
                            </Button>
                          </Card.Footer>
                        </Card>
                      ) : sessionStorage.getItem("typeUser") ===
                        "COOPERATIVE" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                        </Card>
                      ) : sessionStorage.getItem("typeUser") ===
                        "AGRICULTEUR" ? (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                        </Card>
                      ) : (
                        <Card
                          className="flex-fill card-flyer unselectable"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Card.Img
                            className="image-box undragable"
                            variant="top"
                            src={
                              images.find(
                                (image) =>
                                  image.categorieProduit ===
                                  product.categorieProduit
                              )?.src
                            }
                          />
                          <Card.Body>
                            <Card.Title className="text-black initialism mb-4">
                              {product.nomProduit}
                            </Card.Title>
                            <Card.Text>{product.descriptionProduit}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text className="text-info mb-0">
                              <span className="text-primary">Catégorie :</span>{" "}
                              {product.categorieProduit}
                            </Card.Text>
                            <Card.Text className="text-primary">
                              Quantité disponible :{" "}
                              <span className="text-info">
                                {product.stockProduit}
                                {product.uniteProduit}
                              </span>
                            </Card.Text>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <small className="text-lg">
                              {product.prixProduit} Ar/{product.uniteProduit}
                            </small>
                          </Card.Footer>
                          <Card.Footer className="text-center">
                            <Button
                              className="primary w-100 d-flex align-items-center flex-column"
                              onClick={needLogin}
                            >
                              + Ajouter au panier
                            </Button>
                          </Card.Footer>
                        </Card>
                      )}
                    </Col>
                  </div>
                );
              })}
        </Carousel>
        <br />
      </div>
      <Routes>
        <Route path="/produits" element={<Product />} />
      </Routes>
    </div>
  );
}

export default Product;
