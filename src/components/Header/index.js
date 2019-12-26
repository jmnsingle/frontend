import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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
          <Link to="/student">
            <img src={logo} alt="Gympoint" />
          </Link>
          <NavLink activeClassName="selected" to="/student">
            Alunos
          </NavLink>
          <NavLink activeClassName="selected" to="/plan">
            Planos
          </NavLink>
          <NavLink activeClassName="selected" to="/enrollment">
            Matrículas
          </NavLink>
          <NavLink activeClassName="selected" to="/help">
            Pedidos de auxílio
          </NavLink>
        </nav>
        <aside>
          <strong>{profile.name}</strong>
          <button onClick={handleSignOut}>Sair do sistema</button>
        </aside>
      </Content>
    </Container>
  );
}
