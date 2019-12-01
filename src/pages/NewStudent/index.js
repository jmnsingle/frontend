import React from 'react';
import { useDispatch } from 'react-redux';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import history from '~/services/history';

import InputField from '~/components/Input';

import {
  Container,
  Content,
  Header,
  ButtonSafe,
  ButtonBack,
  Hr,
  Contain,
} from './styles';

import { studentRegisterRequest } from '~/store/modules/student/actions';

export default function NewStudent() {
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório.'),
    email: Yup.string()
      .email('Insira um email válido.')
      .required('Email obrigatório.'),
    birth_date: Yup.string().required('Idade é obrigatória.'),
    weight: Yup.string().required('Peso é obrigatório.'),
    height: Yup.string().required('Altura é obrigatória.'),
  });

  async function handleRegister({ name, email, birth_date, height, weight }) {
    dispatch(studentRegisterRequest(name, email, birth_date, height, weight));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleRegister}>
        <Contain>
          <Header>
            <strong>Gerenciando alunos</strong>
            <aside>
              <ButtonBack
                type="button"
                onClick={() => history.push('/student')}
              >
                <MdArrowBack color="#fff" size={20} /> Voltar
              </ButtonBack>
              <ButtonSafe type="submit">
                <MdCheck color="#fff" size={20} /> Cadastrar
              </ButtonSafe>
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
              <InputField size="small" name="birth_date" type="number" />
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
