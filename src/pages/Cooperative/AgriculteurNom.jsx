import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgriculteurNom = (props) => {
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const id = props.id;
    useEffect(() => {
        const fetchNomUtilisateur = async () => {
            const response = await axios.get(`http://localhost:8085/api/utilisateurs/${id}`);
            setNomUtilisateur(response.data.nomUtilisateur);
        };
        fetchNomUtilisateur();
    }, []);
    const formattedNomUtilisateur = nomUtilisateur;
    return (
        <span>{formattedNomUtilisateur}</span>
    );
};
export default AgriculteurNom;




