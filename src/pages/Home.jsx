import videoBG from '../assets/video_1.mp4'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { Modal, Form } from "react-bootstrap";

function Home({}) {
    const [produit, setProd] = useState([])

    const [panier, setPanier] = useState([]);

    const [categorieProduit, setCategory] = useState(false);

    function handle1Click(product) {
        setPanier(panier.filter((p) => p !== product));
    }

    const images = [
        { categorieProduit: "Viande", src: "/src/images/meat.jpg" },
        { categorieProduit: "Légume", src: "/src/images/organic-vegetable.jpg" },
        { categorieProduit: "Fruit", src: "/src/images/organic-fruit.jpg" },
        { categorieProduit: "Produit laitier", src: "/src/images/dairy-product.jpg" },
        { categorieProduit: "Céréale", src: "/src/images/cereal.jpg" },
        { categorieProduit: "Produit arômatique", src: "/src/images/aromatic-product.jpg" }
    ];

    const [show, setShow] = useState(false);

    const [productToRemove, setProductToRemove] = useState(null);

    const handleShow = (product) => {
        setProductToRemove(product);
        setShow(true);
        if (!panier.some((item) => item.nomProduit === product.nomProduit)) {
          setPanier([...panier, product]);
        }
    }

    const handleHide = () => {
        setProductToRemove(null);
        setShow(false);
    }

    const handleConfirm = () => {
        handle1Click(productToRemove);
        handleHide();
    }

    useEffect(() => {
        fetch("http://localhost:8085/produits/list")
        .then(response => response.json())
        .then(data => setProd(data))
        .catch(err => console.log(err))
    }, [])

    produit.sort((a, b) => b.idProduit - a.idProduit)

    function handleClick(product) {
        if (!panier.some((item) => item.nomProduit === product.nomProduit)) {
          setPanier([...panier, product]);
        }
    }
    
    function handleChange(e, index) {
    const newPanier = [...panier];
    newPanier[index].quantite = parseInt(e.target.value);
    setPanier(newPanier);
    }
    
    let prixTotal = 0;
    for (let i = 0; i < panier.length; i++) {
    const product = panier[i];
    const prixProduit = product.prixProduit;
    const quantite = product.quantite;
    let prixTotalProduit = prixProduit * quantite;

    prixTotal += prixTotalProduit;
    }

    return (
        <div>           
            <title>Mihary'ket - Page d'accueil</title>

            {/* <div class="hero-slide owl-carousel site-blocks-cover"> */}
                <div className="intro-section" style={{backgroundImage : "url('/src/images/hero_1.jpg')"}}>
                    <div className="container">
                    <div className="row align-items-center">
                        <div className="justify-content-center mx-auto text-center" data-aos="fade-up">
                        <h1>Plateforme de coopératives agricoles pour un commerce équitable afin de soutenir nos agriculteurs.</h1><br />
                        <button className='btn btn-success btn-rounded btn-lg gradient-custom-4 px-5 text-white' onClick={() => {
                            const element = document.querySelector('#products');
                            const offset = -100; // ajustez cette valeur en fonction de la hauteur de votre en-tête
                            const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset + offset;
                            window.scrollTo({ top: yCoordinate, behavior: 'smooth' });
                            }}>En savoir plus</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id='products' data-aos="fade-up" style={{backgroundColor : "#ebebeb"}}>
                <div className='text-center text-success' style={{backgroundColor : "#dbdbdb", padding : "25px"}}>
                    <h1>Nos produits récents</h1><br/>
                    <Link className="text-body" to="/produits"><button className='btn btn-success btn-rounded btn-lg gradient-custom-4 px-5 text-white'>Voir la liste complète</button></Link>
                </div>
                <Row lg={4}>
                {produit &&
                    produit
                    .slice(0, 8)
                    .filter((product) => product.stockProduit !== 0)
                    .map((product) => {
                    return (
                        <div className='container-sm'>
                        <Col className="d-flex">
                        <Card className="flex-fill card-flyer" style={{marginTop : "20px"}}  key={product.idProduit}>
                            <Card.Img className='image-box' variant="top" 
                            src={images.find(image => image.categorieProduit === product.categorieProduit)?.src} />
                            <Card.Body>
                            <Card.Title className='text-black initialism mb-4'>{product.nomProduit}</Card.Title>
                            <Card.Text>
                                {product.descriptionProduit}
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <Card.Text className='text-success mb-0'><span className='text-primary'>Catégorie :</span> {product.categorieProduit}</Card.Text>
                            <Card.Text className='text-primary'>Quantité disponible : <span className='text-success'>{product.stockProduit}{product.uniteProduit}</span></Card.Text>
                            </Card.Footer>
                            <Card.Footer className='text-center'>
                            <small className="text-lg">{product.prixProduit} Ar/{product.uniteProduit}</small>
                            </Card.Footer>
                            <Card.Footer className='text-center'>
                            <Button className="primary" onClick={() => handleShow(product)}>Ajouter au panier</Button><br/>
                            </Card.Footer>
                        </Card>
                        </Col>
                        </div>
                    );
                    })}
                </Row><br/>
            </div>

            <div
                style={{
                backgroundColor: "#ebebeb",
                display: "flex",
                flexWrap: "wrap",
                }}
            >
            <Card style={{ width: "18rem", margin: "10px" }}>
            <Card.Body>
                <Card.Title>Total</Card.Title>
                <Card.Text>
                Le total des prix est de {prixTotal} Ar.
                <Button variant="primary" style={{ marginTop: "10px" }}>
                    Procéder au paiement
                </Button>
                </Card.Text>
            </Card.Body>
            </Card>

            {/* <Modal show={show} onHide={handleHide}>
                <Modal.Header closeButton>
                <Modal.Title>Retirer un produit du panier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Êtes-vous sûr de vouloir retirer {productToRemove && productToRemove.nomProduit} du panier ?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleHide}>Annuler</Button>
                <Button variant="danger" onClick={handleConfirm}>Retirer</Button>
                </Modal.Footer>
            </Modal> */}

            <Modal show={show} onHide={handleHide}>
            <Modal.Header closeButton>
                <Modal.Title>Choisir quantité</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {panier.map((product, index) => {
                    return (
                        <Card key={index}>
                        <Card.Img
                            variant="top"
                            src={images.find(image => image.categorieProduit === product.categorieProduit)?.src}
                        />
                        <Card.Body>
                            <Card.Title>{product.nomProduit}</Card.Title>
                            <Card.Text>
                            Catégorie : {product.categorieProduit}
                            <br />
                            Quantité disponible : {product.stockProduit}{" "}
                            {product.uniteProduit}
                            <br />
                            Prix : {product.prixProduit} Ar/{product.uniteProduit}{" "}
                            <br />
                            Quantité acheté en {product.uniteProduit}
                            <Form.Control
                                type="number"
                                min="1"
                                max={product.stockProduit}
                                value={product.quantite}
                                onChange={(e) => handleChange(e, index)}
                                style={{ marginTop: "10px" }}
                            />
                            Total prix par produit:{" "}
                            {product.quantite * product.prixProduit} Ar <br />
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    );
                })}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={() => handleClick(produit)}>
                    Ajouter au panier
                </Button>
                <br />
                </Modal.Footer>
                
                </Modal>
            </div>
        </div>
    )
}
  
export default Home
