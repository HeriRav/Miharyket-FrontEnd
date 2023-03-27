import videoBG from '../assets/video_1.mp4'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import { createContext, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link, useNavigate } from 'react-router-dom';
// import { Modal, Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Home() {
    //créaction d'une variable pour compter le nombre d'arcticle
    let [count, setCount] = useState(localStorage.getItem("nb_article") == null ? 1 : localStorage.getItem("nb_article"));
    
    const [produit, setProd] = useState([])
    const [panier, setPanier] = useState([]);

    let navigate = useNavigate()

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
        // handleHide();
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

    const [idProduit, setIdProduit] = useState("");
    const [nomProduit, setProduit] = useState("");
    const [unite, setUnite] = useState("");
    const [description, setDescription] = useState("");
    const [categorie, setCategorie] = useState("");
    const [resultats, setResultats] = useState([]);
    const [stockProduit, setStock] = useState('');
    const [idCommande, setIdCommande] = useState('');
    const [dateCommande, setDate] = useState('');
    const [refCommande, setRefCommande] = useState('');
    const [statutCommande, setStatut] = useState('en cours');
    const [prixProduit, setPrix] = useState('');
    const [quantite, setQuantite] = useState('');
    const  idClient = sessionStorage.getItem("id");

    // date
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date().toLocaleDateString('fr-FR', options).split('/').reverse().join('-');

    // Fonction pour générer une référence unique de commande
    function genererReferenceCommande(nombreDeCommandes) {
    // Convertir le nombre de commandes en chaîne de caractères et ajouter des zéros au début si nécessaire
    let numeroDeCommande = (nombreDeCommandes + 1).toString().padStart(3, '0');
    // Retourner la référence de commande formatée
    return 'C-' + numeroDeCommande;
    }

    const ajoutPanier = (event) => {
        event.preventDefault();
        const nouvelleCommande = {
        utilisateur : {id : idClient } ,
        dateCommande : date,
        refCommande: genererReferenceCommande(5),
        statutCommande: statutCommande,
        };  

        fetch("http://localhost:8085/commandes/ajout", {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(nouvelleCommande)
        }) .then(response => response.json())  
        .then(data => {
        // Récupération de l'ID de la commande générée
        const idCommande = data.id;
        // Création d'un objet ligne de commande
        const ligneCommande = {
            commande: idCommande,
            prixUnitaire: prixProduit,
            quantiteApprovisionnement: quantite,
            produit : {idProduit: idProduit},
        };
        console.log(ligneCommande);
        // fetch("http://localhost:8085/ligne-commande/ajout", {
        //     method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(ligneCommande)
        // }) .then(response => response.json())
        // .then(data => {
        //     toast.success('Ce produit a été ajouté au panier')
        // }).catch((error) => {
        //     toast.error('Création échouée : ' + err.message)
        // });
        })
        .catch((error) => {
            toast.error('Création échouée : ' + err.message)
        });
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

    const validate = () => {
        if (quantite > produit.stockProduit) {
            toast.warning("Le nombre est au-dessus du stock")
        }
    }

    const redirect = (id, nom, price) => {

        /*
            1. créer une variable dans le localstorage
            2. envoyer l'id du produit, le prix unitaire et la quantité par défaut (1) dans localstorage
            3. mettre à jour le nombre d'article sélectionné (badge de notification)
        */            
            if(localStorage.getItem(nom) == null) {                
                localStorage.setItem(nom,  JSON.stringify({nom: nom, id: id, price: price, quantity: 1}) );           
            }
            else {                
                let item = JSON.parse(localStorage.getItem(nom)); 
                item.quantity++;

                localStorage.setItem(nom,  JSON.stringify(item) );           
            }            
           
            setCount(count + 1)
            localStorage.setItem("nb_article", count);
    }

    const needLogin = () => {
        navigate('/authentification')
        toast.warning("Vous devez vous connecter")
    }

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
    };

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
                <Carousel 
                responsive={responsive}
                ssr={true}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}>
                {produit &&
                    produit
                    .filter((product) => product.stockProduit !== 0)
                    .slice(0, 12)
                    .map((product) => {
                        return (
                            <div className='container-sm' key={product.idProduit}>
                                <Col className="d-flex">
                                {sessionStorage.getItem("typeUser") === "CLIENT" ? (
                                    <Card className="flex-fill card-flyer unselectable" style={{marginTop : "20px", marginBottom : "20px"}}>
                                        <Card.Img className='image-box undragable' variant="top" 
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
                                        <Button className="primary w-100 d-flex align-items-center flex-column" onClick={() => redirect(product.idProduit, product.nomProduit, product.prixProduit)}>+ Ajouter au panier</Button>
                                        </Card.Footer>                                       
                                    </Card>
                                ) : sessionStorage.getItem("typeUser") === "COOPERATIVE" ? (
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
                                    </Card>
                                ) : sessionStorage.getItem("typeUser") === "AGRICULTEUR" ? (
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
                                    </Card>
                                ) : (
                                    <Card className="flex-fill card-flyer" style={{marginTop : "20px"}}>
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
                                        <Button className="primary w-100 d-flex align-items-center flex-column" onClick={needLogin}>+ Ajouter au panier</Button>
                                        </Card.Footer>                                       
                                    </Card>
                                )}
                                </Col>
                            </div>
                        );
                    })}
                </Carousel>
            </div>

            {/* <div
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
            </Card> */}
{/* 
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
                                onChange={(e) => setQuantite(e.target.value)}
                                style={{ marginTop: "10px" }}
                            />
                            Total prix par produit:{" "}
                            {product.quantite * product.prixProduit} Ar <br />
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className='text-center'>
                        <Button variant='danger' className='w-100 d-flex align-items-center flex-column' onClick={() => handleConfirm(produit)}>Retirer</Button>
                        </Card.Footer>
                        </Card>
                    );
                })}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" className='w-100 d-flex align-items-center flex-column' onClick={ajoutPanier}>
                    Ajouter au panier
                </Button>
                <ToastContainer />
                <br />
                </Modal.Footer>
                
                </Modal> */}
            {/* </div> */}
        </div>
    )
}
  
export default Home
