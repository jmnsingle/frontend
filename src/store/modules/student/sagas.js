import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { studentRegisterSuccess, studentRegisterFailure } from './actions';

export function* register({ payload }) {
  console.tron.log('entrou no saga');
  const { name, email, age, height, weight } = payload;

  try {
    const response = yield call(api.post, 'students', {
      name,
      email,
      birth_date: age,
      height,
      weight,
    });

    yield put(studentRegisterSuccess(response.data));

    history.push('/student');
  } catch (err) {
    yield put(studentRegisterFailure());
    toast.error('Falha na autenticação, verifique seus dados');
  }
}

export default all([takeLatest('@student/STUDENT_REQUEST', register)]);
