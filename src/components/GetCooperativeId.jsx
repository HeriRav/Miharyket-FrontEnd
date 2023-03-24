import React, { useEffect, useState } from "react";
import axios from "axios";

const GetCooperativeId = () => {
  const [produitCooperative, setProduits] = useState([]);
  const [selectedProduit, setSelectedProduit] = useState("");
  const user = sessionStorage.getItem("user");
  const reference = user.id;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:8085/produits/reference/${reference}`);
      setProduits(result.data);
    };
//test
    fetchData();
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
