import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { differenceInCalendarYears, parseISO } from 'date-fns';

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

export default function Dashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      console.log('funcao');
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

  return (
    <Container>
      <TableHeader>
        <strong>Gerenciando alunos</strong>
        <aside>
          <button>
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
                  <ButtonEdit>editar</ButtonEdit>
                  <ButtonDelete>apagar</ButtonDelete>
                </Action>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
}
