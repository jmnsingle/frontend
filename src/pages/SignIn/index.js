import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido!')
    .required('Email obrigatório!'),
  password: Yup.string().required('Senha obrigatória!'),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="Gympoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <p>SEU E-MAIL</p>
        <Input name="email" placeholder="Digite seu e-mail" />
        <p>SUA SENHA</p>
        <Input name="password" type="password" placeholder="Digite sua senha" />

        <button type="submit">Acessar sistema</button>
      </Form>
    </>
  );
}
