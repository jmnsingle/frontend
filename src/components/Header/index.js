import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';
import logo from '../../assets/logoH.png';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <Link to="/student" active>
            Alunos
          </Link>
          <Link to="/plan" active={false}>
            Planos
          </Link>
          <Link to="/enrollment" active={false}>
            Matrículas
          </Link>
          <Link to="/help" active={false}>
            Pedidos de auxílio
          </Link>
        </nav>
        <aside>
          <strong>Juliano Nogueira</strong>
          <button>Sair do sistema</button>
        </aside>
      </Content>
    </Container>
  );
}
