import React, { useState } from 'react';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import InputField from '~/components/Input';
import Button from '~/components/Button';

import { Container, Content, Header, Hr, Contain } from './styles';

export default function CreateStudent() {
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório.'),
    email: Yup.string()
      .email('Insira um email válido.')
      .required('Email obrigatório.'),
    birth_date: Yup.string().required('Data de nascimento é obrigatória.'),
    weight: Yup.string().required('Peso é obrigatório.'),
    height: Yup.string().required('Altura é obrigatória.'),
  });
  async function handleRegister({ name, email, birth_date, height, weight }) {
    try {
      setLoading(true);
      await api.post(`students`, {
        name,
        email,
        birth_date,
        height,
        weight,
      });

      history.push('/student');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.tron.log(err);
    }
  }

  function mask(e) {
    console.log(e.target.value.length);
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleRegister}>
        <Header active="student">
          <strong>Gerenciando alunos</strong>
          <aside>
            <Button
              background="back"
              type="button"
              onClick={() => history.push('/student')}
            >
              <MdArrowBack color="#fff" size={20} /> Voltar
            </Button>
            <Button background="add" type="submit">
              <MdCheck color="#fff" size={20} /> Cadastrar
            </Button>
          </aside>
        </Header>
        <Content>
          <Hr>
            <Contain>
              <label htmlFor="name">NOME COMPLETO</label>
              <InputField
                size="large"
                name="name"
                placeholder="Chester Bennington"
              />
            </Contain>
          </Hr>
          <Hr>
            <Contain>
              <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
              <InputField
                size="large"
                name="email"
                placeholder="example@email.com"
              />
            </Contain>
          </Hr>
          <Hr>
            <Contain>
              <label htmlFor="birth_date">DATA DE NASCIMENTO</label>
              <InputField size="small" name="birth_date" type="date" />
            </Contain>
            <Contain>
              <label htmlFor="weight">
                PESO (<small>em kg</small>)
              </label>
              <InputField onChange={e => mask(e)} size="small" name="weight" />
            </Contain>
            <Contain>
              <label htmlFor="height">ALTURA</label>
              <InputField size="small" name="height" />
            </Contain>
          </Hr>
        </Content>
      </Form>
    </Container>
  );
}
