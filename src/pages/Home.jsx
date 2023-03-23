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

function Home({}) {
    const [produit, setProd] = useState([])

    const images = [
        { categorieProduit: "Viande", src: "/src/images/meat.jpg" },
        { categorieProduit: "Légume", src: "/src/images/organic-vegetable.jpg" },
        { categorieProduit: "Fruit", src: "/src/images/organic-fruit.jpg" },
        { categorieProduit: "Produit laitier", src: "/src/images/dairy-product.jpg" },
        { categorieProduit: "Céréale", src: "/src/images/cereal.jpg" },
        { categorieProduit: "Produit arômatique", src: "/src/images/aromatic-product.jpg" }
    ];

    useEffect(() => {
        fetch("http://localhost:8085/produits/list")
        .then(response => response.json())
        .then(data => setProd(data))
        .catch(err => console.log(err))
    }, [])

    produit.sort((a, b) => b.idProduit - a.idProduit);

    return (
        <div>           
            <title>Mihary'ket - Page d'accueil</title>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="overlay"></div>
                    <video className="img-fluid" autoPlay loop muted >
                        <source src={videoBG} type='video/mp4'/>
                    </video>
                </div>
                <div className="carousel-caption d-none d-md-block centered info" data-aos="fade-up">
                    <div className="col-lg-12 justify-content-center mx-auto text-center">
                        <h1 className='for-mobile'>Plateforme de coopératives agricoles pour un commerce équitable afin de soutenir nos agriculteurs.</h1><br/>
                        <h5 className='text-white'>Une plateforme coopérative agricole pour le commerce équitable peut aider à soutenir les agriculteurs en permettant la vente directe de leurs produits, 
                            en réduisant les intermédiaires et en offrant des prix équitables pour leur travail.</h5><br/>
                        <button className='btn btn-success'>Plus de détails</button>
                    </div>
                </div>
            </div>

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

            <div data-aos="fade-up" style={{backgroundColor : "#ebebeb"}}>
                <div className='text-center text-success' style={{marginTop : "20px", backgroundColor : "#dbdbdb", padding : "25px"}}>
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
                            <Button className="primary">Ajouter au panier</Button><br/>
                            </Card.Footer>
                        </Card>
                        </Col>
                        </div>
                    );
                    })}
                </Row><br/>
            </div>
        </div>
    )
}
  
export default Home
