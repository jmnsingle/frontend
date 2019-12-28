import React, { useEffect, useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import Modal from 'react-modal';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '~/services/api';

import Button from '~/components/Button';
import { LabelText, Action } from '~/components/LabelText';
import Loading from '~/components/Loading';
import Empty from '~/components/Empty';
import {
  Container,
  Content,
  TableHeader,
  Pagination,
} from '~/pages/Connected/stylesList';
import { ContainerModal, ContainerAnswer, ActionModal } from './styles';

export default function HelpOrder() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [before, setBefore] = useState(false);
  const [next, setNext] = useState(false);
  const [page, setPage] = useState(1);
  const [helpOrders, setHelpOrders] = useState([]);
  const [newHelpOrders, setNewHelpOrders] = useState([]);
  const [answer, setAnswer] = useState({});

  async function loaHelpOrder() {
    setLoading(true);
    const { data } = await api.get('/admin/help_orders', {
      params: {
        page,
      },
    });

    setHelpOrders(data);
    setNewHelpOrders(data);
    setLoading(false);
  }
  useEffect(() => {
    loaHelpOrder();
    if (page === 1 && helpOrders.length < 5) {
      setNext(false);
      setBefore(false);
    } else if (page === 1 && helpOrders.length >= 5) {
      setNext(true);
      setBefore(false);
    } else if (page > 1 && helpOrders.length < 5) {
      setNext(false);
      setBefore(true);
    } else {
      setNext(true);
      setBefore(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, helpOrders.length]);

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

  async function handleAnswer(item) {
    setAnswer({
      question: item.question,
      id: item.id,
      answer: item.answer,
      answer_at: item.answer_at,
      name: item.student.name,
    });
    setShowModal(true);
  }

  async function handleSubmit() {
    if (answer.answer && answer.answer !== '') {
      try {
        setLoading(true);
        await api.put(`/help-orders/${answer.id}/answer`, {
          answer: answer.answer,
        });
        toast.success('Pergunta respondida com sucesso !');
        loaHelpOrder();
        setShowModal(false);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setShowModal(false);
        toast.error('Falha ao responder.');
      }
    } else {
      toast.error('Prencha com uma resposta válida.');
    }
  }

  function search(text) {
    const newData = helpOrders.filter(item => {
      const itemData = `${item.student.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setNewHelpOrders(newData);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      height: '450px',
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.6)',
    },
  };
  return (
    <Container>
      <TableHeader>
        <strong>Pedidos de auxílio</strong>
        <aside>
          <input
            onChange={e => search(e.target.value)}
            type="text"
            placeholder="Buscar por aluno"
          />
        </aside>
      </TableHeader>
      {loading && <Loading />}
      {helpOrders.length === 0 && !loading && <Empty />}
      <Content>
        <table>
          <thead>
            <tr>
              <LabelText title="true" alignText="left">
                ALUNO
              </LabelText>
              <LabelText title="true" alignText="right">
                AÇÂO
              </LabelText>
            </tr>
          </thead>
          <tbody>
            {newHelpOrders.map(item => (
              <tr key={item.id}>
                <LabelText alignText="left">{item.student.name}</LabelText>
                <Action>
                  {item.answer === null ? (
                    <Button background="add" onClick={() => handleAnswer(item)}>
                      Responder
                    </Button>
                  ) : (
                    <Button
                      background="back"
                      onClick={() => handleAnswer(item)}
                    >
                      Respondido
                    </Button>
                  )}
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
        <strong>Quantidade de registros {helpOrders.length}</strong>
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
      <Modal
        ariaHideApp={false}
        isOpen={showModal}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <ContainerModal>
          <Form onSubmit={handleSubmit}>
            <strong>
              PERGUNTA DO ALUNO<p> {answer.name}</p>
            </strong>
            <p>{answer.question}</p>
            <ContainerAnswer>
              <strong>SUA RESPOSTA</strong>
              <textarea
                name={answer}
                rows="10"
                placeholder={
                  answer.answer !== null ? answer.answer : 'Querido aluno ...'
                }
                readOnly={answer.answer !== null}
                onBlur={e => setAnswer({ ...answer, answer: e.target.value })}
              />
            </ContainerAnswer>
            <ActionModal>
              {answer.answer_at === null ? (
                <Button type="submit" background="add">
                  Responder
                </Button>
              ) : (
                <Button
                  background="default"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Fechar
                </Button>
              )}
            </ActionModal>
          </Form>
        </ContainerModal>
      </Modal>
    </Container>
  );
}
