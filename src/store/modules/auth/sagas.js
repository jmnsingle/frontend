import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { sigInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    yield put(sigInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    yield put(signFailure());

    toast.error('Falha na autenticação, verifique seus dados');
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
