import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";
import visa from '../images/visa.png';


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        fetch("http://localhost:8085/paiements/valider", {
          method:"POST", headers:{"Content-Type" : "application/json"}, body:JSON.stringify({
            datePaiement: date,
            modePaiement: "visa",
            montantPaiement: localStorage.getItem(totalPrix),
            statutPaiement: "Payé",
            idCommande: 1,
            idStripe: id
          })
        }).then(() => console.log("ok"));
      
      // if (response.data.success) {
      //     setMessage("Paiement réussi");
      //     setSuccess(true);
      //   }

        } catch (error) {
          console.log("Erreur : ", error.message);
        }
    } else {
      setMessage("tsy mety");
    }
    setIsLoading(false);
  };

  return (
    <>

<div class="container">
  <div class="row justify-content-right">
    <div class="col-md-12">
      <form onSubmit={handleSubmit} className="payment-form">
      <br/>
        <fieldset className="FormGroup">
          <div className="FormRow">
           <br/>      
            <h5 >
            Déscription de la carte : 
            </h5>
            <br/>
            <CardElement
              options={{ hidePostalCode: true }}
              style={({ width: "100%" }, { marginTop: "50px" })}
            />
          </div>
        </fieldset>
        <br/>
        <br/>
        <button
          disabled={isLoading}
          id="submit"
          className="btn btn-primary"
          style={{ marginTop: "-30px", width: "100%" }}
        >
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Payer"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>  
    </div>
  </div>
</div>



      
    </>
  );
};

export default CheckoutForm;


