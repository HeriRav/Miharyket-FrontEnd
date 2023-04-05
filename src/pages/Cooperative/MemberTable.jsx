import React from 'react';
import { Table } from 'react-bootstrap';

function MemberTable(props) {
  const { members } = props;

  return (
    <Table striped bordered hover className='text-center text-black'>
      <thead>
        <tr>
          <th>Nom</th>
          <th>CIN</th>
          <th>Adresse</th>
          <th>Téléphone</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr key={member.id}>
            <td>{member.nomUtilisateur}</td>
            <td>{member.cinAgriculteur}</td>
            <td>{member.adresseUtilisateur}</td>
            <td>{member.telephoneUtilisateur}</td>
            <td>{member.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default MemberTable;
