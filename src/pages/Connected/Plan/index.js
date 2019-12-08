import React, { useEffect, useState } from 'react';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { differenceInCalendarYears, parseISO } from 'date-fns';

import history from '~/services/history';
import api from '~/services/api';

import Button from '~/components/Button';
import { LabelText, Action } from '~/components/LabelText';

import { Container, Content, TableHeader } from '~/pages/Connected/styles';

export default function Student() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');

      setPlans(
        response.data.map(item => ({
          ...item,
          idade: differenceInCalendarYears(
            new Date(),
            parseISO(
              item.birth_date
                .split('/')
                .reverse()
                .join('-')
            )
          ),
        }))
      );
    }
    loadPlans();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`Plans/${id}`);
      window.location.reload();
    } catch (err) {
      console.tron.log(err);
    }
  }
  return (
    <Container>
      <TableHeader>
        <strong>Gerenciando planos</strong>
        <aside>
          <Button
            background="add"
            onClick={() => history.push('/createStudent')}
          >
            <MdAdd color="#fff" size={25} /> Cadastrar
          </Button>
          <input type="text" placeholder="Buscar aluno" />
        </aside>
      </TableHeader>
      <Content>
        <table>
          <thead>
            <tr>
              <LabelText title alignText="left">
                TÍTULO
              </LabelText>
              <LabelText title>DURAÇÃO</LabelText>
              <LabelText title>VALOR P/ MÊS</LabelText>
              <LabelText title alignText="right">
                AÇÂO
              </LabelText>
            </tr>
          </thead>
          <tbody>
            {plans.map(item => (
              <tr key={item.id}>
                <LabelText alignText="left">{item.title}</LabelText>
                <LabelText>{item.duration}</LabelText>
                <LabelText>{item.price}</LabelText>
                <Action>
                  <Button
                    background="edit"
                    onClick={() =>
                      history.push('/updateStudent', { response: item })
                    }
                  >
                    <MdEdit color="#fff" size={25} />
                  </Button>
                  <Button
                    background="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    <MdDelete color="#fff" size={25} />
                  </Button>
                </Action>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
}
