import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Content } from './styles';
import logo from '../../assets/logoH.png';

import { signOUt } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOUt());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <Link to="/student">Alunos</Link>
          <Link to="/plan">Planos</Link>
          <Link to="/enrollment">Matrículas</Link>
          <Link to="/help">Pedidos de auxílio</Link>
        </nav>
        <aside>
          <strong>{profile.name}</strong>
          <button onClick={handleSignOut}>Sair do sistema</button>
        </aside>
      </Content>
    </Container>
  );
}
