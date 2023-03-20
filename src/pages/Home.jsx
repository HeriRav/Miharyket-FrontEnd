import videoBG from '../assets/video_1.mp4'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function Home() {

    return (
        <div>           
            <title>Mihary'ket - Page d'accueil</title>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="overlay"></div>
                    <video className="img-fluid" autoPlay loop muted >
                        <source src={videoBG} type='video/mp4'/>
                    </video>
                    <div className="carousel-caption d-none d-md-block centered" data-aos="fade-up">
                        <div className="col-lg-12 justify-content-center mx-auto text-center">
                            <h1 className='for-mobile'>Plateforme de coopératives agricoles pour un commerce équitable afin de soutenir nos agriculteurs.</h1><br/>
                            <h5 className='text-success'>Une plateforme coopérative agricole pour le commerce équitable peut aider à soutenir les agriculteurs en permettant la vente directe de leurs produits, 
                                en réduisant les intermédiaires et en offrant des prix équitables pour leur travail.</h5><br/>
                            <button className='btn btn-success'>Plus de détails</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container-fluid' data-aos="fade-up">
                <h1 className='text-center text-success' style={{marginTop : "20px", marginBottom : "20px"}}>Nos Produits actuels</h1>
                <CardGroup>
                <Card>
                    <Card.Img variant="top" src="/src/images/hero_1.jpg" />
                    <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.
                    </Card.Text>
                    </Card.Body>
                    <Button variant="primary" style={{width : "50%", marginLeft : "auto", marginRight : "auto"}}>Voir plus de détails</Button><br/>
                    <Card.Footer>
                    <small className="text-danger text-lg">3000 Ar/kg</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="/src/images/hero_1.jpg" />
                    <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This card has supporting text below as a natural lead-in to
                        additional content.{' '}
                    </Card.Text>                
                    </Card.Body>
                    <Button variant="primary" style={{width : "50%", marginLeft : "auto", marginRight : "auto"}}>Voir plus de détails</Button><br/>
                    <Card.Footer>
                    <small className="text-danger text-lg">5000 Ar/kg</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="/src/images/hero_1.jpg" />
                    <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in
                        to additional content. This card has even longer content than the
                        first to show that equal height action.
                    </Card.Text>
                    </Card.Body>
                    <Button variant="primary" style={{width : "50%", marginLeft : "auto", marginRight : "auto"}}>Voir plus de détails</Button><br/>
                    <Card.Footer>
                    <small className="text-danger text-lg">2000 Ar/kg</small>
                    </Card.Footer>
                </Card>
                </CardGroup>
            </div>
        </div>
    )
  }
  
  export default Home
