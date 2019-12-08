import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import Select from 'react-select';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import InputField from '~/components/Input';
import Button from '~/components/Button';

import { Container, Content, Header, Hr, Contain, SelectField } from './styles';

const options = [
  { id: '1', title: 'joana' },
  { id: '2', title: 'joana' },
  { id: '3', title: 'joana' },
];
export default function CreateStudent() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório.'),
    title: Yup.string()
      .required('Escolha um plano')
      .required('Email obrigatório.'),
    start_date: Yup.string('Início obrigatório'),
  });

  useEffect(() => {
    async function handleStudents() {
      const responseStudent = await api.get('students');
      setStudents(responseStudent.data);
    }

    async function handlePlans() {
      const responsePlan = await api.get('Plans');

      setPlans(responsePlan.data);
    }
    handleStudents();
    handlePlans();
  }, []);

  async function handleRegister() {
    console.log(plans);
    console.log(students);
    /* try {
      setLoading(true);
      await api.post(`enrollments`, {
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
    } */
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleRegister}>
        <Contain>
          <Header active="student">
            <strong>Gerenciando matrículas</strong>
            <aside>
              <Button
                background="back"
                type="button"
                onClick={() => history.push('/enrollment')}
              >
                <MdArrowBack color="#fff" size={20} /> Voltar
              </Button>
              <Button background="add" type="submit">
                <MdCheck color="#fff" size={20} /> Cadastrar
              </Button>
            </aside>
          </Header>
        </Contain>
        <Content>
          <Hr>
            <Contain large>
              <label htmlFor="name">ALUNO</label>
              <Select
                options={plans}
                getOptionLabel={plan => plan.name}
                getOptionValue={plan => plan.id}
              />
            </Contain>
          </Hr>
          <Hr>
            <Contain>
              <label htmlFor="plano">PLANO</label>
              <Select
                options={students}
                getOptionLabel={students.title}
                getOptionValue={students.id}
              />
            </Contain>
            <Contain>
              <label htmlFor="data_inicio">DATA DE INÍCIO</label>
              <InputField type="date" size="short" name="start_date" />
            </Contain>
            <Contain>
              <label htmlFor="data_termino">DATA DE TÉRMINO</label>
              <InputField readOnly size="short" name="end_date" />
            </Contain>
            <Contain>
              <label htmlFor="valor_final">VALOR FINAL</label>
              <InputField readOnly size="short" name="price" />
            </Contain>
          </Hr>
        </Content>
      </Form>
    </Container>
  );
}
