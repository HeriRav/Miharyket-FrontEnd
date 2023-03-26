import { Link } from "react-router-dom"
import { createContext, useContext, useEffect, useState } from "react"
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
  } from "mdb-react-ui-kit";
  import { loadStripe } from '@stripe/stripe-js';

function Cart() {
    //variable pour récupérer le stockPrduit d'un article
    const [max, setMax] = useState([]);
    const [produit, setProd] = useState([]);
        const images = [
        { categorieProduit: "Viande", src: "/src/images/meat.jpg" },
        { categorieProduit: "Légume", src: "/src/images/organic-vegetable.jpg" },
        { categorieProduit: "Fruit", src: "/src/images/organic-fruit.jpg" },
        { categorieProduit: "Produit laitier", src: "/src/images/dairy-product.jpg" },
        { categorieProduit: "Céréale", src: "/src/images/cereal.jpg" },
        { categorieProduit: "Produit arômatique", src: "/src/images/aromatic-product.jpg" }
        ];
    useEffect(() => {
        setMax([]);
        fetch("http://localhost:8085/produits/list")
        .then(response => response.json())
        .then(data => {
            //filtrage
            let a = [];
            for(let i = 0; i < data.length; i++) {    
                if (localStorage.getItem(data[i].nomProduit) == null)      
                    continue;

                a.push(JSON.parse(localStorage.getItem(data[i].nomProduit)));    
                
                //ajustement du quantité maximale d'un produit sélectionné
                //setMax(produitTaloha => [...produitTaloha, data[i].stockProduit]);      
                        
            }          
            setProd(a)
            
        })
        .catch(err => console.log(err))
       
    }, [])

    /*------------------- stripe action ---------------------------*/

    let stripePromise;
    const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe('pk_test_oKhSR5nslBRnBZpjO6KuzZeX');
    }
    return stripePromise;
    };

    async function testPaiement() {
        const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
        console.log(stripe);
        // const session = await stripe.checkout.sessions.create({
        //     line_items: [
        //         {
        //           price_data: {
        //             currency: 'mga',
        //             product_data: {name: 'T-shirt', description: 'Inclusiv'},
        //             unit_amount: 25000,
        //           },
        //           adjustable_quantity: {enabled: true, minimum: 1, maximum: 10},
        //           quantity: 1,
        //         },
        //       ],
        //     mode: 'payment',
        //     success_url: `${YOUR_DOMAIN}/success.html`,
        //     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        //   });
        // console.warn(error.message);
      }

    /*--------------------------tapitra eto -------------------------*/


    produit.sort((a, b) => b.idProduit - a.idProduit);
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

<section className="h-100" style={{ backgroundColor: "#eee" }}>
    {produit && 
    produit
    .map((panier) => {
        return (
            <MDBContainer className="py-5 h-100">
    <MDBRow className="justify-content-center align-items-center h-100">
      <MDBCol md="10">
        <MDBCard className="rounded-3 mb-4">
          <MDBCardBody className="p-4">
            <MDBRow className="justify-content-between align-items-center">
              <MDBCol md="2" lg="2" xl="2">
                <MDBCardImage className="rounded-3" fluid
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                  alt="Cotton T-shirt" />
              </MDBCol>
              <MDBCol md="3" lg="3" xl="3">
                <p className="lead fw-normal mb-2">{panier.nom}</p>
                <p>
                  <span className="text-muted">Quantité: </span>
                  <span className="text-muted">Catégorie: </span>{panier.categorieProduit}
                </p>
              </MDBCol>
              <MDBCol md="3" lg="3" xl="2"
                className="d-flex align-items-center justify-content-around">
                <MDBBtn color="link" className="px-2">
                  <MDBIcon fas icon="minus" />
                </MDBBtn>

                <MDBInput min={1} max={max} defaultValue={panier.quantity} type="number" size="sm" />

                <MDBBtn color="link" className="px-2">
                  <MDBIcon fas icon="plus" />
                </MDBBtn>
              </MDBCol>
              <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                <MDBTypography tag="h5" className="mb-0">
                  {panier.price} Ar
                </MDBTypography>
              </MDBCol>
              <MDBCol md="1" lg="1" xl="1" className="text-end">
                <a href="#!" className="text-danger">
                  <MDBIcon fas icon="trash text-danger" size="lg" />
                </a>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>       
      </MDBCol>
    </MDBRow>
  </MDBContainer>
        )
    })}
   <MDBCard>
          <MDBCardBody>
            <MDBBtn className="ms-3" color="warning" block size="lg" onClick={testPaiement}>
              Apply
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
</section>
        </>
    )
}

export default Cart
