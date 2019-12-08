import React, { useState, useEffect } from 'react';
import { parseISO, format, addMonths } from 'date-fns';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import Select from 'react-select';

import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import InputField from '~/components/Input';
import Button from '~/components/Button';

import { Container, Content, Header, Hr, Contain, Date } from './styles';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
export default function CreateStudent() {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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
      setStudents(
        responseStudent.data.map(item => ({
          value: item.id,
          label: item.name,
        }))
      );
    }

    async function handlePlans() {
      const responsePlan = await api.get('Plans');

      setPlans(
        responsePlan.data.map(item => ({
          ...item,
          value: item.id,
          label: item.title,
        }))
      );
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

  function handleDate(date) {
    console.log(addMonths(date, 3));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleRegister}>
        <Header>
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
        <Content>
          <Hr>
            <Contain large>
              <label htmlFor="name">ALUNO</label>
              <Select options={students} />
            </Contain>
          </Hr>
          <Hr>
            <Contain>
              <label htmlFor="plano">PLANO</label>
              <Select
                options={plans}
                getOptionValue={plan => plan.id}
                onChange={value => setPrice(value.price * value.duration)}
              />
            </Contain>
            <Contain>
              <label htmlFor="data_inicio">DATA DE INÍCIO</label>
              <Date
                selected={startDate}
                //onSelect={this.handleSelect}
                onChange={date => setStartDate(date)}
                onBlur={() => handleDate(startDate)}
              />
            </Contain>
            <Contain>
              <label htmlFor="data_termino">DATA DE TÉRMINO</label>
              <InputField
                readOnly
                size="short"
                name="end_date"
                value={endDate}
              />
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
