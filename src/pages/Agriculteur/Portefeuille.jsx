import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Portefeuille = () => {
  const [balance, setBalance] = useState(0);
  const [id, setId] = useState(sessionStorage.getItem("idUser"));
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch the user's balance and transaction history from the server
    axios.get('http://localhost:8085/api/utilisateurs/'+id).then(response => {
      setBalance(response.data.soldeUtilisateur);
      setTransactions(response.data.transactions);
    });
  }, []);

  const handleAddFunds = event => {
    event.preventDefault();
    const amount = event.target.elements.amount.value;
    axios.post('http://localhost:8085/api/utilisateurs/'+id+'/solde', { amount }).then(response => {
      setBalance(response.data.soldeUtilisateur);
      setTransactions(response.data.transactions);
      event.target.reset();
    });
  };

  return (
    <div>
      <h2>Votre portefeuille</h2>
      <p>Solde actuel (en Ariary): Ar{balance?balance.toFixed(2):0}</p>
      <form onSubmit={handleAddFunds}>
        <label htmlFor="amount">Ajouter des fonds:</label>
        <input type="number" name="amount" step="0.01" />
        <button type="submit">Payer</button>
      </form>
      <h3>Historique de transaction:</h3>
      <ul>
      {transactions && transactions.length > 0 ?
  transactions.map(transaction => (
    <li key={transaction.id}>
      {transaction.date}: {transaction.amount.toFixed(2)} ({transaction.description})
    </li>
  )) :
  <p>Pas de transactions récentes.</p>
}

      </ul>
    </div>
  );
};

export default Portefeuille;
