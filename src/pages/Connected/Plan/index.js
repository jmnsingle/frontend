import React, { useEffect, useState } from 'react';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { formatPrice } from '~/util/format';

import history from '~/services/history';
import api from '~/services/api';
import Loading from '~/components/Loading';
import Button from '~/components/Button';
import { LabelText, Action } from '~/components/LabelText';

import { Container, Content, TableHeader } from '~/pages/Connected/stylesList';

export default function Plan() {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [newPlans, setNewPlans] = useState([]);

  async function loadPlans() {
    setLoading(true);
    const response = await api.get('/plans');

    setPlans(response.data);
    setNewPlans(response.data);
    setLoading(false);
  }
  useEffect(() => {
    loadPlans();
  }, []);

  async function handleDelete(id) {
    try {
      setLoading(true);
      await api.delete(`plans/${id}`);
      loadPlans();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
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
