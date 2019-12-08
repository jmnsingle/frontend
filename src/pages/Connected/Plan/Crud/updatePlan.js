import React, { useEffect, useState, useMemo } from 'react';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdArrowBack, MdCheck } from 'react-icons/md';

import { differenceInCalendarYears, parseISO } from 'date-fns';
import { formatPrice } from '~/util/format';

import history from '~/services/history';
import api from '~/services/api';

import InputField from '~/components/Input';
import Button from '~/components/Button';

import { LabelText, Action } from '~/components/LabelText';

import { Container, Content, Header, Hr, Contain } from './styles';

export default function Plan({ location }) {
  console.log(location.state.response);
  const schema = Yup.object().shape({
    title: Yup.string().required('Título do plano obrigatório.'),
    duration: Yup.string().required('Duração do plano obrigatório.'),
    price: Yup.string().required('Preço mensal obrigatório.'),
  });

  const [price, setPrice] = useState(location.state.response.price);
  const [duration, setDuration] = useState(location.state.response.duration);
  const [finalPrice, setFinalPrice] = useState(
    location.state.response.duration * location.state.response.price
  );

  async function handleUpdate({ title, price, duration }) {
    try {
      const response = await api.put(`plans/${location.state.response.id}`, {
        title,
        price,
        duration,
      });

      history.push('/plan');
    } catch (err) {
      console.log(err);
    }
  }

  const handlePrice = useMemo(() => {
    console.log(price);
    console.log(duration);
    setFinalPrice(price * duration);
  }, [price, duration]);

  return (
    <Container>
      <Form
        schema={schema}
        initialData={location.state.response}
        onSubmit={handleUpdate}
      >
        <Header>
          <strong>Gerenciando plano</strong>
          <aside>
            <Button
              background="back"
              type="button"
              onClick={() => history.push('/student')}
            >
              <MdArrowBack color="#fff" size={20} /> Voltar
            </Button>
            <Button background="add" type="submit">
              <MdCheck color="#fff" size={20} /> Salvar
            </Button>
          </aside>
        </Header>
        <Content>
          <Hr>
            <Contain>
              <label htmlFor="name">TÍTULO DO PLANO</label>
              <InputField size="large" name="title" placeholder="Diamond" />
            </Contain>
          </Hr>
          <Hr>
            <Contain>
              <label htmlFor="duration">DURAÇÃO EM MESES</label>
              <InputField
                size="small"
                name="duration"
                type="number"
                onChange={e => setDuration(e.target.value)}
              />
            </Contain>
            <Contain>
              <label htmlFor="price">PREÇO MENSAL</label>
              <InputField
                size="small"
                name="price"
                onChange={e => setPrice(e.target.value)}
              />
            </Contain>
            <Contain>
              <label htmlFor="final_price">PREÇO TOTAL</label>
              <InputField
                readOnly
                size="small"
                value={formatPrice(finalPrice)}
                name="final_price"
              />
            </Contain>
          </Hr>
        </Content>
      </Form>
    </Container>
  );
}
