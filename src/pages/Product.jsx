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
            <div data-aos="fade-up" style={{backgroundColor : "#ebebeb"}}>
                <div className='text-center text-success' style={{marginTop : "20px", backgroundColor : "#dbdbdb", padding : "25px"}}>
                    <h1>Nos produits récents</h1><br/>
                    <Link className="text-body" to="/inscription"><button className='btn btn-success btn-rounded btn-lg gradient-custom-4 px-5 text-white'>Voir la liste complète</button></Link>
                </div>
                <Row lg={4}>
                {produit &&
                    produit
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
                            <Button variant="primary">Ajouter au panier</Button><br/>
                            </Card.Footer>
                        </Card>
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