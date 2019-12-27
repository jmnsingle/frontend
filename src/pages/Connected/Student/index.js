import React, { useEffect, useState } from 'react';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { differenceInCalendarYears, parseISO } from 'date-fns';

import history from '~/services/history';
import api from '~/services/api';

import Button from '~/components/Button';
import { LabelText, Action } from '~/components/LabelText';

import { Container, Content, TableHeader } from '~/pages/Connected/stylesList';

export default function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students');

      setStudents(
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
    loadStudents();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`students/${id}`);
      window.location.reload();
    } catch (err) {
      console.tron.log(err);
    }
  }
  return (
    <Container>
      <TableHeader>
        <strong>Gerenciando alunos</strong>
        <aside>
          <Button
            background="add"
            onClick={() => history.push('/student/create')}
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
              <LabelText title="true" alignText="left">
                NOME
              </LabelText>
              <LabelText title="true">EMAIL</LabelText>
              <LabelText title="true">IDADE</LabelText>
              <LabelText title="true" alignText="right">
                AÇÂO
              </LabelText>
            </tr>
          </thead>
          <tbody>
            {students.map(item => (
              <tr key={item.id}>
                <LabelText alignText="left">{item.name}</LabelText>
                <LabelText>{item.email}</LabelText>
                <LabelText>{item.idade} anos</LabelText>
                <Action>
                  <Button
                    background="edit"
                    onClick={() => history.push(`/student/edit/${item.id}`)}
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
