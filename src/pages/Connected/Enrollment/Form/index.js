import React, { useState, useEffect, useMemo } from 'react';
import { format, addMonths, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import Select from 'react-select';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/format';
import Loading from '~/components/Loading';
import InputField from '~/components/Input';
import Button from '~/components/Button';

import { Container, Content, Header, Hr, Contain } from '../../stylesForm';

export default function FormEnrollment({ match }) {
  const { id } = match.params;
  const [loading, setLoading] = useState(false);

  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollment, setEnrollment] = useState({
    start_date: '',
    end_date: '',
    price: '',
    student_id: '',
    name: '',
    plan_id: '',
    title: '',
  });

  useEffect(() => {
    try {
      setLoading(true);
      // eslint-disable-next-line no-inner-declarations
      async function loadEnrolment() {
        const { data } = await api.get(`enrollments/${id}`);
        const [start] = data.start_date.split('T');
        const [end] = data.end_date.split('T');

        setEnrollment({
          ...data,
          start_date: format(parseISO(start), 'yyyy-MM-dd'),
          end_date: format(parseISO(end), 'yyyy-MM-dd'),
        });

        setLoading(false);
      }
      if (id) {
        loadEnrolment();
      }
    } catch (err) {
      toast.error('Falha ao carregar dados.');
      history.push('/enrolment');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function handleData() {
      const { data: studentData } = await api.get('students');
      setStudents(studentData);

      const { data: planData } = await api.get('Plans');

      setPlans(planData);
    }

    handleData();
  }, []);

  async function handleRegister() {
    setLoading(true);
    if (
      enrollment.plan_id === '' ||
      enrollment.student_id === '' ||
      enrollment.start_date === ''
    ) {
      setLoading(false);
      toast.error('Complete todos os campos para cadastrar!');
    } else {
      try {
        setLoading(true);
        // eslint-disable-next-line no-unused-vars
        const response = id
          ? await api.put(`enrollments/${id}`, {
              start_date: enrollment.start_date,
              plan_id: enrollment.plan_id,
            })
          : await api.post(
              `enrollments/${enrollment.plan_id}/${enrollment.student_id}`,
              {
                start_date: enrollment.start_date,
              }
            );

        history.push('/enrollment');
        setLoading(false);
        toast.success(`Usuário ${id ? 'editado' : 'cadastrado'} com sucesso !`);
      } catch (err) {
        setLoading(false);
        toast.error(
          `Falha ${
            id ? 'na edição' : 'no cadastro'
          } do usuário. Verifique se os dados estão corretos.`
        );
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  const formatDate = useMemo(() => {
    // eslint-disable-next-line eqeqeq
    if (enrollment.start_date != '' && enrollment.price != '') {
      setEnrollment({
        ...enrollment,
        end_date: format(
          addMonths(parseISO(enrollment.start_date), enrollment.duration),
          'dd/MM/yyyy'
        ),
      });
    }
  }, [enrollment.start_date, enrollment.price]);

  return (
    <Container>
      <Form onSubmit={handleRegister}>
        <Header>
          <strong>Gerenciando matrículas</strong>
          <aside>
            <Button
              background="back"
              type="button"
              onClick={() => history.push('/enrollment')}
            >
              <MdArrowBack color="#fff" size={20} /> Voltar
            </Button>
            <Button background="add" type="submit">
              <MdCheck color="#fff" size={20} /> {id ? 'Editar' : 'Cadastrar'}
            </Button>
          </aside>
        </Header>
        {loading && <Loading height={200} />}
        <Content>
          <Hr>
            <Contain large>
              <label htmlFor="aluno">ALUNO</label>

              <Select
                value={students.find(item => {
                  return item.name === enrollment.name;
                })}
                isDisabled={!!id}
                options={students}
                getOptionLabel={student => student.name}
                getOptionValue={student => student.id}
                onChange={value =>
                  setEnrollment({
                    ...enrollment,
                    student_id: value.id,
                    name: value.name,
                  })
                }
              />
            </Contain>
          </Hr>
          <Hr>
            <Contain>
              <label htmlFor="plano">PLANO</label>
              <Select
                value={plans.find(item => {
                  return item.title === enrollment.title;
                })}
                options={plans}
                getOptionLabel={plan => plan.title}
                getOptionValue={plan => plan.id}
                onChange={value =>
                  setEnrollment({
                    ...enrollment,
                    price: value.price,
                    title: value.title,
                    duration: value.duration,
                    plan_id: value.id,
                  })
                }
              />
            </Contain>
            <Contain>
              <label htmlFor="data_inicio">DATA DE INÍCIO</label>
              <InputField
                min={format(new Date(), 'yyyy-MM-dd')}
                value={enrollment.start_date}
                size="short"
                name="birth_date"
                type="date"
                onChange={e =>
                  setEnrollment({ ...enrollment, start_date: e.target.value })
                }
              />
            </Contain>
            <Contain>
              <label htmlFor="data_termino">DATA DE TÉRMINO</label>
              <InputField
                name="date_end"
                readOnly
                size="short"
                value={enrollment.end_date}
              />
            </Contain>
            <Contain>
              <label htmlFor="valor_final">VALOR FINAL</label>
              <InputField
                name="final_price"
                value={formatPrice(enrollment.price || 0)}
                readOnly
                size="short"
              />
            </Contain>
          </Hr>
        </Content>
      </Form>
    </Container>
  );
}

FormEnrollment.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

FormEnrollment.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
