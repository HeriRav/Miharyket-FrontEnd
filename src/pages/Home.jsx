import videoBG from '../assets/video_1.mp4'

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
                            <h1 className='for-mobile'>Plateforme de coopératives agricoles pour un commerce équitable afin de soutenir nos agriculteurs.</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* <h3>Une plateforme coopérative agricole pour le commerce équitable peut aider à soutenir les agriculteurs en permettant la vente directe de leurs produits, 
                        en réduisant les intermédiaires et en offrant des prix équitables pour leur travail.</h3> */}
        </div>
    )
  }
  
  export default Home
