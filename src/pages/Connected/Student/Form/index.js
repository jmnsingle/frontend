import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import Loading from '~/components/Loading';
import InputField from '~/components/Input';
import Button from '~/components/Button';

import { Container, Content, Header, Hr, Contain } from '../../stylesForm';

export default function FormStudent({ match }) {
  const { id } = match.params;
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({
    name: '',
    email: '',
    birth_date: null,
    height: null,
    weight: null,
  });

  useEffect(() => {
    try {
      setLoading(true);
      // eslint-disable-next-line no-inner-declarations
      async function loadStudent() {
        const { data } = await api.get(`students/${id}`);

        setStudent(data);
        setLoading(false);
      }

      setLoading(false);
      if (id) {
        loadStudent();
      }
    } catch (err) {
      toast.error('Falha ao buscar dados do estudante.');
      setLoading(false);
      history.push('/student');
    }
  }, [id]);

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
      // eslint-disable-next-line no-unused-vars
      const response = id
        ? await api.put(`students/${id}`, {
            name,
            email,
            birth_date,
            height,
            weight,
          })
        : await api.post(`students`, {
            name,
            email,
            birth_date,
            height,
            weight,
          });

      history.push('/student');
      setLoading(false);
      toast.success(`Estudante ${id ? 'editado' : 'cadastrado'} com sucesso !`);
    } catch (err) {
      setLoading(false);
      toast.error(`Falha ao ${id ? 'editar' : 'cadastrar'} estudante.`);
    }
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleRegister} initialData={student}>
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
              <MdCheck color="#fff" size={20} /> {id ? 'Editar' : 'Cadastrar'}
            </Button>
          </aside>
        </Header>
        {loading && <Loading height={270} left={140} />}

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
              <InputField
                min="0"
                step="0.01"
                type="number"
                size="small"
                name="weight"
              />
            </Contain>
            <Contain>
              <label htmlFor="height">ALTURA</label>
              <InputField
                min="0"
                step="0.01"
                type="number"
                size="small"
                name="height"
              />
            </Contain>
          </Hr>
        </Content>
      </Form>
    </Container>
  );
}

FormStudent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

FormStudent.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
