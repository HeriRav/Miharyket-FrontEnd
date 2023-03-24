import React, { useEffect, useState } from "react";
import axios from "axios";

const GetCooperativeId = () => {
  const [produitCooperative, setProduits] = useState([]);
  const [selectedProduit, setSelectedProduit] = useState("");
  //const user = sessionStorage.getItem("user");
  const reference = sessionStorage.getItem("idUser");

  useEffect(() => {
    axios.get('http://localhost:8085/api/utilisateurs/agriculteurs/${idAgriculteur}/cooperative')
      .then(response => {
        setIdCoop(response.data);
        sessionStorage.setItem("idcoop", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedProduit(event.target.value);
    sessionStorage.setItem("selectedProduit", event.target.value);
  };

  return (
    {produitCooperative}
  );
};

export default GetCooperativeId;
