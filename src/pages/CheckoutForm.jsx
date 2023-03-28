import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

    if (!error) {
      try {
        const { id } = paymentMethod;
        console.log("Réussi. Token généré : ", id);
        const response = await axios.post(
          "http://localhost:8085/paiements/valider",
          {
            montantPaye: 1000,
            motifPaiement: "Support de formation",
            statutPaiement: "Payé",
            typePaiement: "carte bancaire",
            utilisateur: {
              idUtilisateur: 2,
              nomUtilisateur: "Charlie",
              photoProfil: null,
              nif: 20,
              stat: 21,
              adresse: "Analakely",
              telephone: "034",
              email: "456@gmail.com",
              motdepasseUtilisateur: "456",
              typeUtilisateur: "Financeur",
              statutUtilisateur: "Enregistré",
              publications: [],
              messages: [],
              recommandations: [],
              paiements: [],
              secteurActivites: [],
            },
            idStripe: id,
          }
        );
        if (response.data.success) {
          setMessage("Paiement réussi");
          setSuccess(true);
          toast.success("Paiement réussi, Merci pour votre achat");
        }
      } catch (error) {
        setMessage("Erreur : ", error);
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
        
        {message && <div id="payment-message">{message}</div>}
      </form>  
    </div>
  </div>
</div>



      
    </>
  );
};

export default CheckoutForm;


