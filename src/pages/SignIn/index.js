import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.png';

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="Gympoint" />

      <Form onSubmit={handleSubmit}>
        <p>SEU E-MAIL</p>
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <p>SUA SENHA</p>
        <Input name="password" type="password" placeholder="Digite sua senha" />

        <button type="submit">Acessar sistema</button>
      </Form>
    </>
  );
}
