import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";
import visa from '../images/visa.png';
import { ToastContainer, toast } from "react-toastify";
import Facture from "./Facture";
import { Link } from "react-router-dom";


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [idCommande, setIdCommande]= useState(localStorage.getItem("idCommande"))
  const [panier, setPanier]= useState(localStorage.getItem("panier"));
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    // date
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date().toLocaleDateString('fr-FR', options).split('/').reverse().join('-');

    if (!error) {
      try {
        const { id } = paymentMethod;
        console.log("Réussi. Token généré : ", id);
        const price = localStorage.getItem('paie')
        const user = sessionStorage.getItem('idUser')

         fetch("http://localhost:8085/paiements/valider", {
          method:"POST", headers:{"Content-Type" : "application/json"}, body:JSON.stringify({
            datePaiement: date,
            modePaiement: "visa",
            montantPaiement: price,
            statutPaiement: "Payé",
            idCommande: localStorage.getItem("idCommande"),
            idStripe: id,
            panier: localStorage.getItem("panier")
          })
        }).then(() => {
          toast.success("Paiement effectué, merci!")
        });
        } catch (error) {
          console.log("Erreur : ", error.message);
        }
    } else {
      toast.warning("Le paiement n'a pas été effectué");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-right">
          <div className="col-md-12">
            <form onSubmit={handleSubmit} className="payment-form">
            <br/>
              <fieldset className="FormGroup">
                <div className="FormRow">
                <br/>      
                  <h5 className="" style={{fontWeight:"bold"}}>
                  Déscription de la carte : 
                  </h5>
                  <br/>
                  <CardElement
                    options={{ hidePostalCode: true }}
                    style={({ width: "100%" }, { marginTop: "70px" })}
                  />
                </div>
              </fieldset>
              <br/>
              <br/>              
              <button
                disabled={isLoading}
                id="submit"
                className="btn btn-primary"
                style={{ marginTop: "30px", width: "100%" }}
              >
                <span id="button-text">
                  {isLoading ? <div className="spinner" id="spinner"></div> : "Payer"}
                </span>
              </button>
              <ToastContainer position="bottom-center" autoClose={2000}/>
            </form>  
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;


