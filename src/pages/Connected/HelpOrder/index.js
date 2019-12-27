import React, { useEffect, useState } from 'react';

import api from '~/services/api';

import Button from '~/components/Button';
import { LabelText, Action } from '~/components/LabelText';

import { Container, Content, TableHeader } from '~/pages/Connected/stylesList';

export default function HelpOrder() {
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loaHelpOrder() {
      const { data } = await api.get('/admin/help_orders');

      setHelpOrders(data);
    }
    loaHelpOrder();
  }, []);

  async function handleAnswer(id) {
    try {
      await api.delete(`students/${id}`);
    } catch (err) {
      console.tron.log(err);
    }
  }
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
                  <Button
                    background="add"
                    onClick={() => handleAnswer(item.id)}
                  >
                    Responder
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
