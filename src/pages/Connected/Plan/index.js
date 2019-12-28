import React, { useEffect, useState } from 'react';
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdArrowBack,
  MdArrowForward,
} from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { formatPrice } from '~/util/format';

import history from '~/services/history';
import api from '~/services/api';
import Loading from '~/components/Loading';
import Empty from '~/components/Empty';
import Button from '~/components/Button';
import { LabelText, Action } from '~/components/LabelText';

import {
  Container,
  Content,
  TableHeader,
  Pagination,
} from '~/pages/Connected/stylesList';

export default function Plan() {
  const [loading, setLoading] = useState(false);
  const [before, setBefore] = useState(false);
  const [next, setNext] = useState(false);
  const [page, setPage] = useState(1);
  const [plans, setPlans] = useState([]);
  const [newPlans, setNewPlans] = useState([]);

  async function loadPlans() {
    setLoading(true);
    const response = await api.get('/plans', {
      params: {
        page,
      },
    });

    setPlans(response.data);
    setNewPlans(response.data);
    setLoading(false);
  }
  useEffect(() => {
    loadPlans();
    if (page === 1 && plans.length < 10) {
      setNext(false);
      setBefore(false);
    } else if (page === 1 && plans.length >= 10) {
      setNext(true);
      setBefore(false);
    } else if (page > 1 && plans.length < 10) {
      setNext(false);
      setBefore(true);
    } else {
      setNext(true);
      setBefore(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, plans.length]);

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

  async function handleDelete(item) {
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
          await api.delete(`plans/${item.id}`);
          Swal.fire({
            title: 'Deletado!',
            html: `${item.title} saiu lista de cadastros.`,
            type: 'success',
            timer: 3000,
          });
          loadPlans();
        } catch (err) {
          console.log(err.response.data);
          setLoading(false);
          toast.error('Falha ao deletar matrícula.');
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          html: `${item.title} permanece na lista de cadastrados.`,
          type: 'error',
          timer: 3000,
        });
      }
    });
  }

  function search(text) {
    const newData = plans.filter(item => {
      const itemData = `${item.title.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setNewPlans(newData);
  }
  return (
    <Container>
      <TableHeader>
        <strong>Gerenciando planos</strong>
        <aside>
          <Button background="add" onClick={() => history.push('/plan/create')}>
            <MdAdd color="#fff" size={25} /> Cadastrar
          </Button>
          <input
            onChange={e => search(e.target.value)}
            type="text"
            placeholder="Buscar plano"
          />
        </aside>
      </TableHeader>
      <Content>
        {loading && <Loading />}
        {plans.length === 0 && !loading && <Empty />}
        <table>
          <thead>
            <tr>
              <LabelText title="true" alignText="left">
                TÍTULO
              </LabelText>
              <LabelText title="true">DURAÇÃO</LabelText>
              <LabelText title="true">VALOR P/ MÊS</LabelText>
              <LabelText title="true" alignText="right">
                AÇÂO
              </LabelText>
            </tr>
          </thead>
          <tbody>
            {newPlans.map(item => (
              <tr key={item.id}>
                <LabelText alignText="left">{item.title}</LabelText>
                <LabelText>
                  {/*   Colocar essa verificação na hora de buscar os dados da api     */}
                  {`${item.duration}` > 1
                    ? `${item.duration} meses`
                    : `${item.duration} mês`}
                </LabelText>
                <LabelText>{formatPrice(item.price)}</LabelText>
                <Action>
                  <Button
                    background="edit"
                    onClick={() => history.push(`plan/edit/${item.id}`)}
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
        <strong>Quantidade de registros {plans.length}</strong>
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
