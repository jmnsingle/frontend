import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { sigInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido!')
    .required('Email obrigatório!'),
  password: Yup.string().required('Senha obrigatória!'),
});

export default function SignIn() {
  const dispath = useDispatch();

  function handleSubmit({ email, password }) {
    dispath(sigInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Gympoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <p>SEU E-MAIL</p>
        <Input name="email" placeholder="Digite seu e-mail" />
        <p>SUA SENHA</p>
        <Input name="password" type="password" placeholder="Digite sua senha" />

        <button type="submit">Acessar o sistema</button>
      </Form>
    </>
  );
}
