import { Link } from "react-router-dom"

function About () {
    return(
        <>
        <title>Mihary'ket - À propos</title>
          <div className="intro-section site-blocks-cover innerpage" style={{"backgroundImage": "url('/src/images/hero_9.jpg')"}}>
              <div className="container">
                  <div className="row align-items-center text-center">
                      <div className="col-lg-12 mt-5" data-aos="fade-up">
                          <h1>À propos de Nous</h1>
                          <p className="text-white text-center">
                              <Link to="/">Accueil</Link>
                              <span className="mx-2">/</span>
                              <span>À propos</span>
                          </p>
                      </div>
                  </div>
              </div>
          </div>

          <div className="site-section services-1-wrap" data-aos="fade-up">
            <div className="container">
              <div className="row mb-5 justify-content-center text-center">
                <div className="col-lg-7">
                  <h3 className="section-subtitle">Services</h3>
                  <h2 className="section-title mb-4 text-black">Les avantages de la plateforme Mihary'Ket</h2>
                </div>
              </div>
              <div className="row no-gutters">
                <div className="col-lg-4 col-md-6">
                  <div className="service-1">
                    <span className="number">01</span>
                    <div className="service-1-icon">
                      <img src="/src/images/icon-8.png" alt="Image" className="img-fluid"/>
                    </div>
                    <div className="service-1-content">
                      <h3 className="service-heading bottom">Digitalisation des coopératives</h3>
                      <p>La digitalisation peut apporter de nombreux avantages aux coopératives, notamment en leur permettant d’améliorer leur efficacité opérationnelle et leur productivité en automatisant des tâches répétitives et en réduisant les erreurs humaines. Cela permet également d’accroître leur transparence et leur traçabilité en utilisant des technologies pour enregistrer et suivre les transactions.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="service-1">
                    <span className="number">02</span>
                    <div className="service-1-icon">
                      <img src="/src/images/icon-3.png" alt="Image" className="img-fluid"/>
                    </div>
                    <div className="service-1-content">
                      <h3 className="service-heading">Mutualisation des matériels agricoles</h3>
                      <p>Cela permet aux agriculteurs de réduire les coûts d'investissement et de maintenance des matériels agricoles. Les coûts liés à l'acquisition de nouveaux équipements agricoles sont souvent très élevés et peuvent représenter un obstacle pour les agriculteurs. La mutualisation permet de répartir les coûts entre plusieurs utilisateurs et de maximiser l'utilisation des équipements pour en réduire les coûts.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="service-1">
                    <span className="number">03</span>
                    <div className="service-1-icon">
                      <img src="/src/images/icon-6.png" alt="Image" className="img-fluid"/>
                    </div>
                    <div className="service-1-content">
                      <h3 className="service-heading">Raccourcissement du trajet de distribution</h3>
                      <p>Le raccourcissement du trajet de distribution peut aider à soutenir l'économie locale en favorisant les agriculteurs locaux. Cela aide également à promouvoir la diversité des produits locaux et à encourager les consommateurs à acheter des produits de saison. Cela reste une stratégie intéressante pour promouvoir une agriculture durable et soutenir les producteurs locaux.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="site-section" data-aos="fade-up">
              <div className="container">
              <div className="row justify-content-center">
                  <div className="col-12 mb-5 text-center">
                  <h3 className="section-subtitle">LES CONCEPTEURS ET DEVELOPPEURS</h3>
                  <h2 className="section-title text-black mb-4">Rencontrez l'équipe</h2>
                  </div>
              </div>

              <div className="row justify-content-center">
                  <div className="col-lg-2 col-md-6 mb-lg-0">
                  <div className="person">
                      <figure>
                      <img src="/src/images/herizo.jpg" width="800" heigth="800" alt="Image" className="img-fluid"/>
                      <div className="social">
                          <a href="https://www.linkedin.com/in/herizo-randrianiaina/" target="_blank"><span className="icon-linkedin"></span></a>
                      </div>
                      </figure>
                      <div className="person-contents">
                      <h4>Nomenjanahary Herizo</h4>
                      <span className="position">Développeur</span>
                      </div>
                  </div>
                  </div>

                  <div className="col-lg-2 col-md-6 mb-lg-0">
                  <div className="person">
                      <figure>
                      <img src="/src/images/mahefa.jpg" width="800" heigth="800" alt="Image" className="img-fluid"/>
                      <div className="social">
                          <a href="https://www.linkedin.com/in/mahefa-iarantsoa-47749725a/" target="_blank"><span className="icon-linkedin"></span></a>
                      </div>
                      </figure>
                      <div className="person-contents">
                      <h4>Iarantsoa Mahefa</h4>
                      <span className="position">Développeur</span>
                      </div>
                  </div>
                  </div>

                  <div className="col-lg-2 col-md-6 mb-lg-0">
                  <div className="person">
                      <figure>
                      <img src="/src/images/ninie.jpg" width="800" heigth="800" alt="Image" className="img-fluid"/>
                      <div className="social">
                          <a href="https://www.linkedin.com/in/vonintsoa-ramamonjison-baba82147/" target="_blank"><span className="icon-linkedin"></span></a>
                      </div>
                      </figure>
                      <div className="person-contents">
                      <h4>Ramamonjison Vonintsoa</h4>
                      <span className="position">Développeuse</span>
                      </div>
                  </div>
                  </div>

                  <div className="col-lg-2 col-md-6 mb-lg-0">
                  <div className="person">
                      <figure>
                      <img src="/src/images/heritiana.png" width="800" heigth="800" alt="Image" className="img-fluid"/>
                      <div className="social">
                          <a href="https://www.linkedin.com/in/heritiana-raveloson-564347236/" target="_blank"><span className="icon-linkedin"></span></a>
                      </div>
                      </figure>
                      <div className="person-contents">
                      <h4>Raveloson Heritiana</h4>
                      <span className="position">Développeur</span>
                      </div>
                  </div>
                  </div>

                  <div className="col-lg-2 col-md-6 mb-lg-0">
                  <div className="person">
                      <figure>
                      <img src="/src/images/percky.jpg" width="800" heigth="800" alt="Image" className="img-fluid"/>
                      <div className="social">
                          <a href="https://www.linkedin.com/in/percky-ramanoara-138909234/" target="_blank"><span className="icon-linkedin"></span></a>
                      </div>
                      </figure>
                      <div className="person-contents">
                      <h4>Ramanoara Percky</h4>
                      <span className="position">Développeur</span>
                      </div>
                  </div>
                  </div>

              </div>
              </div>
          </div>
        </>
    )
}

export default About
