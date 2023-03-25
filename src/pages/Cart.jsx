import { Link } from "react-router-dom"
import { createContext, useContext } from "react"

function Cart({children}) {
    return(
        <>
            <title>Mihary'ket - Panier</title>
            <div className="intro-section site-blocks-cover innerpage" style={{"backgroundImage": "url('/src/images/hero_0.jpg')"}}>
                <div className="container">
                    <div className="row align-items-center text-center">
                        <div className="col-lg-12 mt-5" data-aos="fade-up">
                            <h1>Mon panier</h1>
                            <p className="text-white text-center">
                                <Link to="/">Accueil</Link>
                                <span className="mx-2">/</span>
                                <span>Mon panier</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart
