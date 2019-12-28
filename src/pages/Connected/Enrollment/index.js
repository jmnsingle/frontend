import React, { useEffect, useState } from 'react';
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdCheckCircle,
  MdArrowBack,
  MdArrowForward,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';
import api from '~/services/api';
import Loading from '~/components/Loading';
import Button from '~/components/Button';
import { LabelText, Action } from '~/components/LabelText';

import {
  Container,
  Content,
  TableHeader,
  Pagination,
} from '~/pages/Connected/stylesList';

export default function Enrollment() {
  const [loading, setLoading] = useState(false);
  const [before, setBefore] = useState(false);
  const [next, setNext] = useState(false);
  const [page, setPage] = useState(1);
  const [enrollments, setEnrollments] = useState([]);
  const [newEnrollments, setNewEnrollments] = useState([]);

  async function loadEnrollments() {
    setLoading(true);
    const response = await api.get('/enrollments', {
      params: {
        page,
      },
    });
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
    setLoading(false);
  }
  useEffect(() => {
    loadEnrollments();
    if (page === 1 && enrollments.length < 10) {
      setNext(false);
      setBefore(false);
    } else if (page === 1 && enrollments.length >= 10) {
      setNext(true);
      setBefore(false);
    } else if (page > 1 && enrollments.length < 10) {
      setNext(false);
      setBefore(true);
    } else {
      setNext(true);
      setBefore(true);
    }
  }, [page, enrollments.length]);

  function handlePagination(op) {
    if (page >= 1) {
      if (op === 1) {
        setPage(page + 1);
      } else {
        setPage(page - 1);
      }
    } else {
      setPage(1);
    }
  }

  async function handleDelete(id) {
    try {
      setLoading(true);
      await api.delete(`enrollments/${id}`);
      loadEnrollments();
      setLoading(false);
      toast.success('Matrícula deletada com sucesso !');
    } catch (err) {
      setLoading(false);
      toast.error('Falha ao deletar matrícula.');
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
      {loading && <Loading />}
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
      <Pagination>
        <Button
          disabled={!before}
          onClick={() => handlePagination(0)}
          background={before ? 'add' : 'back'}
          type="button"
        >
          <MdArrowBack color="#fff" size={20} />
          Anterior
        </Button>
        <strong>Quantidade de registros {enrollments.length}</strong>
        <Button
          disabled={!next}
          onClick={() => handlePagination(1)}
          background={next ? 'add' : 'back'}
          type="button"
        >
          Próximo
          <MdArrowForward color="#fff" size={20} />
        </Button>
      </Pagination>
    </Container>
  );
}
