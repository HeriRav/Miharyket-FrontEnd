import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";


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

      <form onSubmit={handleSubmit} className="payment-form">
        <fieldset className="FormGroup">
          <div className="FormRow">
            {/* <div style={{ height: 50 }}>
              <img
                src={{ carteBancaire1 }}
                className="img-fluid"
                alt="carte1"
              />
              <img src={{ carteBancaire2 }} />
              <img src={{ carteBancaire3 }} />
            </div> */}
            <h6>
              Entrez les coordonnées de la carte : <output></output>
            </h6>
            <CardElement
              options={{ hidePostalCode: true }}
              style={({ width: "100%" }, { marginTop: "20px" })}
            />
          </div>
        </fieldset>
        <button
          disabled={isLoading}
          id="submit"
          className="btn btn-primary"
          style={{ marginTop: "20px", width: "100%" }}
        >
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Payer"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
};

export default CheckoutForm;