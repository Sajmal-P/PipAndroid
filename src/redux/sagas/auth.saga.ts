import { AxiosResponse } from 'axios';
import { put, takeEvery, call, select } from 'redux-saga/effects';
import { LOGIN } from '../actions/auth.actions';

function* login() {
    console.log('Login middleware');
    
  }


  export function* authSaga() {
    yield takeEvery(LOGIN, login);
    
  }
  