import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { differenceInCalendarYears, parseISO } from 'date-fns';
import history from '~/services/history';

import api from '~/services/api';

import {
  Container,
  Content,
  TableHeader,
  ButtonEdit,
  ButtonDelete,
  Name,
  Email,
  Idade,
  TitleName,
  TitleEmail,
  TitleIdade,
  TitleAction,
  Action,
} from './styles';

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
          <button onClick={() => history.push('/createStudent')}>
            <MdAdd color="#fff" size={25} /> Cadastrar{' '}
          </button>
          <input type="text" placeholder="Buscar aluno" />
        </aside>
      </TableHeader>
      <Content>
        <table>
          <thead>
            <tr>
              <TitleName>NOME</TitleName>
              <TitleEmail>EMAIL</TitleEmail>
              <TitleIdade>IDADE</TitleIdade>
              <TitleAction>AÇÂO</TitleAction>
            </tr>
          </thead>
          <tbody>
            {students.map(item => (
              <tr key={item.id}>
                <Name>{item.name}</Name>
                <Email>{item.email}</Email>
                <Idade>{item.idade} anos</Idade>
                <Action>
                  <ButtonEdit
                    onClick={() =>
                      history.push('/updateStudent', { response: item })
                    }
                  >
                    editar
                  </ButtonEdit>
                  <ButtonDelete onClick={() => handleDelete(item.id)}>
                    apagar
                  </ButtonDelete>
                </Action>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
}
