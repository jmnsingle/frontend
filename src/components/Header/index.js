import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Content } from './styles';
import logo from '../../assets/logoH.png';

import { signOUt } from '~/store/modules/auth/actions';

export default function Header(item) {
  console.log(item);
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
          <Link item={item} to="/student">
            Alunos
          </Link>
          <Link item={item} to="/plan">
            Planos
          </Link>
          <Link item={item} to="/enrollment">
            Matrículas
          </Link>
          <Link item={item} to="/help">
            Pedidos de auxílio
          </Link>
        </nav>
        <aside>
          <strong>{profile.name}</strong>
          <button onClick={handleSignOut}>Sair do sistema</button>
        </aside>
      </Content>
    </Container>
  );
}
