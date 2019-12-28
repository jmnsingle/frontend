import React from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { Container } from './styles';

export default function Empty() {
  return (
    <Container>
      <MdErrorOutline size={100} color="#b6bab7" /> <p>Sem mais registros.</p>
    </Container>
  );
}
