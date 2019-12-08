import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import InputField from '~/components/Input';
import Button from '~/components/Button';

import {
  Container,
  Content,
  Header,
  ButtonSafe,
  ButtonBack,
  Hr,
  Contain,
} from './styles';

export default function UpdateStudent({ location }) {
  const userId = useSelector(state => state.user.profile.id);
  const studentId = location.state.response.id;

  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório.'),
    email: Yup.string()
      .email('Insira um email válido.')
      .required('Email obrigatório.'),
    birth_date: Yup.string().required('Idade é obrigatória.'),
    weight: Yup.string().required('Peso é obrigatório.'),
    height: Yup.string().required('Altura é obrigatória.'),
  });
  async function handleUpdate({ name, email, birth_date, height, weight }) {
    try {
      setLoading(true);
      await api.put(`students/${studentId}`, {
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

  return (
    <Container>
      <Form
        initialData={location.state.response}
        schema={schema}
        onSubmit={handleUpdate}
      >
        <Contain>
          <Header>
            <strong>Editar aluno</strong>
            <aside>
              <Button
                backgrround="back"
                type="button"
                onClick={() => history.push('/student')}
              >
                <MdArrowBack color="#fff" size={20} /> Voltar
              </Button>
              <Button backgrround="add" type="submit">
                <MdCheck color="#fff" size={20} /> Salvar
              </Button>
            </aside>
          </Header>
        </Contain>
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
              <label htmlFor="birth_date">IDADE</label>
              <InputField size="small" name="birth_date" type="date" />
            </Contain>
            <Contain>
              <label htmlFor="weight">
                PESO (<small>em kg</small>)
              </label>
              <InputField size="small" name="weight" />
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
