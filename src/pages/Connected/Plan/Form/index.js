import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdArrowBack, MdCheck } from 'react-icons/md';

import { formatPrice } from '~/util/format';

import history from '~/services/history';
import api from '~/services/api';
import Loading from '~/components/Loading';
import InputField from '~/components/Input';
import Button from '~/components/Button';

import { Container, Content, Header, Hr, Contain } from '../../stylesForm';

export default function FormPlan({ match }) {
  const schema = Yup.object().shape({
    title: Yup.string().required('Título do plano obrigatório.'),
    duration: Yup.string().required('Duração do plano obrigatório.'),
    price: Yup.string().required('Preço mensal obrigatório.'),
  });
  const { id } = match.params;
  const [loading, setLoading] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);

  const [plan, setPlan] = useState({
    title: '',
    price: null,
    duration: null,
  });
  async function handleSubmit({ title, price, duration }) {
    try {
      setLoading(true);
      // eslint-disable-next-line no-unused-vars
      const response = id
        ? await api.put(`plans/${id}`, {
            title,
            price,
            duration,
          })
        : await api.post('plans', {
            title,
            price,
            duration,
          });
      history.push('/plan');
      setLoading(false);
      toast.success(`Plano ${id ? 'editado' : 'cadastrado'} com sucesso !`);
    } catch (err) {
      setLoading(false);
      toast.error(`Falha  ${id ? 'na edição' : 'no cadastro'} do plano.`);
    }
  }

  useEffect(() => {
    try {
      setLoading(true);
      // eslint-disable-next-line no-inner-declarations
      async function loadPlan() {
        const { data } = await api.get(`plans/${id}`);

        setPlan(data);
        setLoading(false);
      }

      if (id) {
        loadPlan();
      }
    } catch (err) {
      toast.error('Falha no carregamento do plano.');
      setLoading(false);
      history.push('/plan');
    }
  }, []);

  useEffect(() => {
    const total = formatPrice(
      plan.duration === null || plan.price === null
        ? 0
        : plan.duration * plan.price
    );
    setFinalPrice(total);
  }, [plan]);

  return (
    <Container>
      <Form schema={schema} initialData={plan} onSubmit={handleSubmit}>
        <Header>
          <strong>Gerenciando plano</strong>
          <aside>
            <Button
              background="back"
              type="button"
              onClick={() => history.push('/plan')}
            >
              <MdArrowBack color="#fff" size={20} /> Voltar
            </Button>
            <Button background="add" type="submit">
              <MdCheck color="#fff" size={20} /> {id ? 'Editar' : 'Cadastrar'}
            </Button>
          </aside>
        </Header>
        {loading && <Loading height={200} left={140} />}
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
                onChange={e => setPlan({ ...plan, duration: e.target.value })}
              />
            </Contain>
            <Contain>
              <label htmlFor="price">PREÇO MENSAL</label>
              <InputField
                size="small"
                name="price"
                onChange={e => setPlan({ ...plan, price: e.target.value })}
              />
            </Contain>
            <Contain>
              <label htmlFor="final_price">PREÇO TOTAL</label>
              <InputField
                readOnly
                size="small"
                name="final_price"
                value={finalPrice}
              />
            </Contain>
          </Hr>
        </Content>
      </Form>
    </Container>
  );
}

FormPlan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

FormPlan.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
