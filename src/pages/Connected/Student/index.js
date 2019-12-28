import React, { useEffect, useState } from 'react';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { differenceInCalendarYears, parseISO } from 'date-fns';

import history from '~/services/history';
import api from '~/services/api';

import Button from '~/components/Button';
import Loading from '~/components/Loading';
import { LabelText, Action } from '~/components/LabelText';

import { Container, Content, TableHeader } from '~/pages/Connected/stylesList';

export default function Student() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [newStudents, setNewStudents] = useState([]);

  async function loadStudents() {
    setLoading(true);
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
    setNewStudents(
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
    setLoading(false);
  }
  useEffect(() => {
    loadStudents();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`students/${id}`);
      loadStudents();
    } catch (err) {
      console.tron.log(err);
    }
  }

  function search(text) {
    const newData = students.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setNewStudents(newData);
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
          <input
            onChange={e => search(e.target.value)}
            type="text"
            placeholder="Buscar aluno"
          />
        </aside>
      </TableHeader>
      <Content>
        {loading && <Loading />}

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
            {newStudents.map(item => (
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
