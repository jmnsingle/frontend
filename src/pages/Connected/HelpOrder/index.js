import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '~/services/api';

import Button from '~/components/Button';
import { LabelText, Action } from '~/components/LabelText';

import { Container, Content, TableHeader } from '~/pages/Connected/stylesList';
import { ContainerModal, ContainerAnswer, ActionModal } from './styles';

export default function HelpOrder() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState({});

  async function loaHelpOrder() {
    setLoading(true);
    const { data } = await api.get('/admin/help_orders');

    setHelpOrders(data);
    setLoading(false);
  }
  useEffect(() => {
    loaHelpOrder();
  }, []);

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
        toast.error('Falha ao responder.');
      }
    } else {
      toast.error('Prencha com uma resposta válida.');
    }
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
          <input type="text" placeholder="Buscar por aluno" />
        </aside>
      </TableHeader>
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
            {helpOrders.map(item => (
              <tr key={item.id}>
                <LabelText alignText="left">{item.student.name}</LabelText>
                <Action>
                  {item.answer === null ? (
                    <Button background="add" onClick={() => handleAnswer(item)}>
                      Responder
                    </Button>
                  ) : (
                    <Button
                      background="default"
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
