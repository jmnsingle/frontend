import React, { useEffect, useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdCheckCircle } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';
import api from '~/services/api';
import Button from '~/components/Button';
import { LabelText, Action } from '~/components/LabelText';

import { Container, Content, TableHeader } from '~/pages/Connected/stylesList';

export default function Enrollment() {
  const [enrollments, setEnrollments] = useState([]);
  const [newEnrollments, setNewEnrollments] = useState([]);

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api.get('/enrollments');
      setEnrollments(
        response.data.map(item => ({
          ...item,
          start: format(
            parseISO(item.start_date),
            " dd 'de' MMMM ' de ' yyy",

            {
              locale: pt,
            }
          ),
          end: format(
            parseISO(item.end_date),
            " dd 'de' MMMM ' de ' yyy",

            {
              locale: pt,
            }
          ),
        }))
      );
      setNewEnrollments(
        response.data.map(item => ({
          ...item,
          start: format(
            parseISO(item.start_date),
            " dd 'de' MMMM ' de ' yyy",

            {
              locale: pt,
            }
          ),
          end: format(
            parseISO(item.end_date),
            " dd 'de' MMMM ' de ' yyy",

            {
              locale: pt,
            }
          ),
        }))
      );
    }
    loadEnrollments();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`enrollments/${id}`);
      window.location.reload();
    } catch (err) {
      console.tron.log(err);
    }
  }

  function search(text) {
    const newData = enrollments.filter(item => {
      const itemData = `${item.student.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setNewEnrollments(newData);
  }

  return (
    <Container>
      <TableHeader>
        <strong>Gerenciando matrículas</strong>
        <aside>
          <Button
            background="add"
            onClick={() => history.push('/enrollment/create')}
          >
            <MdAdd color="#fff" size={25} /> Cadastrar
          </Button>
          <input
            onChange={e => search(e.target.value)}
            type="text"
            placeholder="Buscar aluno"
          />
        </aside>
      </TableHeader>
      <Content>
        <table>
          <thead>
            <tr>
              <LabelText title="true" alignText="left">
                ALUNO
              </LabelText>
              <LabelText title="true">PLANO</LabelText>
              <LabelText title="true">INÍCIO</LabelText>
              <LabelText title="true">TÉRMINO</LabelText>
              <LabelText title="true">ATIVA</LabelText>
              <LabelText title="true" alignText="right">
                AÇÂO
              </LabelText>
            </tr>
          </thead>
          <tbody>
            {newEnrollments.map(item => (
              <tr key={item.id}>
                <LabelText alignText="left">{item.student.name}</LabelText>
                <LabelText>{item.plan.title}</LabelText>
                <LabelText>{item.start}</LabelText>
                <LabelText>{item.end}</LabelText>
                <LabelText>
                  <MdCheckCircle
                    color={item.active ? '#2cb502' : '#ddd'}
                    size={25}
                  />
                </LabelText>
                <Action>
                  <Button
                    background="edit"
                    onClick={() => history.push(`/enrollment/edit/${item.id}`)}
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
