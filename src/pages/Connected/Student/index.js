import React, { useEffect, useState } from 'react';
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdArrowBack,
  MdArrowForward,
} from 'react-icons/md';
import { differenceInCalendarYears, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import history from '~/services/history';
import api from '~/services/api';

import Button from '~/components/Button';
import Loading from '~/components/Loading';
import Empty from '~/components/Empty';
import { LabelText, Action } from '~/components/LabelText';

import {
  Container,
  Content,
  TableHeader,
  Pagination,
} from '~/pages/Connected/stylesList';

export default function Student() {
  const [loading, setLoading] = useState(false);
  const [before, setBefore] = useState(false);
  const [next, setNext] = useState(false);
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [newStudents, setNewStudents] = useState([]);

  async function loadStudents() {
    setLoading(true);
    const response = await api.get('/students', {
      params: {
        page,
      },
    });

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
    if (page === 1 && students.length < 10) {
      setNext(false);
      setBefore(false);
    } else if (page === 1 && students.length >= 10) {
      setNext(true);
      setBefore(false);
    } else if (page > 1 && students.length < 10) {
      setNext(false);
      setBefore(true);
    } else {
      setNext(true);
      setBefore(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, students.length]);

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

  function handleDelete(item) {
    Swal.fire({
      title: 'Quer mesmo deletar ?',
      text: 'Você não poderá desfazer essa ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Não, manter.',
      confirmButtonColor: '#0071c7',
      cancelButtonColor: '#eb4034',
    }).then(async result => {
      if (result.value) {
        try {
          await api.delete(`students/${item.id}`);
          Swal.fire({
            title: 'Deletado!',
            html: `${item.name} saiu lista de cadastros.`,
            type: 'success',
            timer: 3000,
          });
          loadStudents();
        } catch (err) {
          setLoading(false);
          toast.error('Falha ao deletar matrícula.');
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          html: `${item.name} permanece na lista de cadastros.`,
          type: 'error',
          timer: 3000,
        });
      }
    });
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
        {students.length === 0 && !loading && <Empty />}

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
                    onClick={() => handleDelete(item)}
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
          background={before ? 'pagination' : 'back'}
          type="button"
        >
          <MdArrowBack color="#fff" size={20} />
          Anterior
        </Button>
        <strong>Quantidade de registros {students.length}</strong>
        <Button
          disabled={!next}
          onClick={() => handlePagination(1)}
          background={next ? 'pagination' : 'back'}
          type="button"
        >
          Próximo
          <MdArrowForward color="#fff" size={20} />
        </Button>
      </Pagination>
    </Container>
  );
}
