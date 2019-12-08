import React, { useState, useEffect, useMemo } from 'react';
import { format, addMonths } from 'date-fns';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import Select from 'react-select';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/format';

import InputField from '~/components/Input';
import Button from '~/components/Button';

import { Container, Content, Header, Hr, Contain, Date } from './styles';

export default function CreateStudent() {
  const [loading, setLoading] = useState(false);

  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);
  const [infoPrice, setInfoPrice] = useState([]);
  const [infoStudent, setInfoStudent] = useState([]);

  const [price, setPrice] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    async function handleData() {
      const responseStudent = await api.get('students');
      setStudents(
        responseStudent.data.map(item => ({
          ...item,
          value: item.id,
          label: item.name,
        }))
      );

      const responsePlan = await api.get('Plans');

      setPlans(
        responsePlan.data.map(item => ({
          ...item,
          value: item.id,
          label: item.title,
        }))
      );
    }

    handleData();
  }, []);

  async function handleRegister() {
    // eslint-disable-next-line eqeqeq
    if (infoPrice.id == '' || infoStudent.id == '' || startDate == '') {
      toast.error('Complete todos os campos para cadastrar!');
    } else {
      try {
        setLoading(true);
        await api.post(`enrollments/${infoPrice.id}/${infoStudent.id}`, {
          start_date: startDate,
        });

        history.push('/enrollment');
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err.response.status === 401) {
          toast.error('Usuário já possui matrícula');
        } else {
          toast.error(
            'Falha no cadastro. Verifique se os dados estão corretos.'
          );
        }
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  const formatDate = useMemo(() => {
    // eslint-disable-next-line eqeqeq
    if (startDate != '' && infoPrice != '') {
      setEndDate(
        format(addMonths(startDate, infoPrice.duration), 'dd/MM/yyyy')
      );
      setPrice(infoPrice.price * infoPrice.duration);
    }
  }, [startDate, infoPrice]);

  return (
    <Container>
      <Form onSubmit={handleRegister}>
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
              <label htmlFor="aluno">ALUNO</label>
              <Select
                options={students}
                onChange={value => setInfoStudent(value)}
              />
            </Contain>
          </Hr>
          <Hr>
            <Contain>
              <label htmlFor="plano">PLANO</label>
              <Select
                options={plans}
                onChange={value => setInfoPrice(value)}
                // onBlur={formatDate(startDate)}
              />
            </Contain>
            <Contain>
              <label htmlFor="data_inicio">DATA DE INÍCIO</label>
              <Date
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </Contain>
            <Contain>
              <label htmlFor="data_termino">DATA DE TÉRMINO</label>
              <InputField
                name="date_end"
                readOnly
                size="short"
                value={endDate}
              />
            </Contain>
            <Contain>
              <label htmlFor="valor_final">VALOR FINAL</label>
              <InputField
                name="final_price"
                value={formatPrice(price)}
                readOnly
                size="short"
              />
            </Contain>
          </Hr>
        </Content>
      </Form>
    </Container>
  );
}
