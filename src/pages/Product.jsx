import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link, Route, Routes } from 'react-router-dom';

function Product() {
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

    return(
        <div>
            <title>Mihary'ket - Nos produits</title>
            <div className="intro-section site-blocks-cover innerpage" style={{"backgroundImage": "url('/src/images/hero_2.jpg')"}}>
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
            <div data-aos="fade-up" style={{backgroundColor : "#ebebeb"}}>
                <div className='text-center' style={{backgroundColor : "#dbdbdb", padding : "25px"}}>
                    <button className='btn-dark text-white p-1 px-2 mx-5 btn fw-bold' >Fruit</button>
                    <button className='btn-dark text-white p-1 px-2 mx-5 btn fw-bold' >Végétale</button>
                    <button className='btn-dark text-white p-1 px-2 mx-5 btn fw-bold' >Viande</button>
                    <button className='btn-dark text-white p-1 px-2 mx-5 btn fw-bold' >Céréale</button>
                    <button className='btn-dark text-white p-1 px-2 mx-5 btn fw-bold' >Produit laitier</button>
                    <button className='btn-dark text-white p-1 px-2 mx-5 btn fw-bold' >Produit arômatique</button>
                    <button className='btn-dark text-white p-1 px-2 mx-5 btn fw-bold' >Tous</button>
                </div>
                <Row lg={4}>
                    {produit &&
                        produit
                        .filter((product) => product.stockProduit !== 0)
                        .map((product) => {
                        return (
                            <div className='container-sm' key={product.idProduit}>
                            <Col className="d-flex">
                            {sessionStorage.getItem("typeUser") == "CLIENT" ? (
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
                                    <Button className="primary" onClick={() => handleShow(product)}>Ajouter au panier</Button><br/>
                                    </Card.Footer>
                                </Card>
                            ) : (
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
                            )}
                            </Col>
                            </div>
                        );
                    })}
                </Row><br/>
            </div>
            <Routes>
                <Route path='/produits' element={<Product/>}/>
            </Routes>
        </div>
    )
}

export default Product