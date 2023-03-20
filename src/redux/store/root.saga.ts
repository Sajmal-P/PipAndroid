import {all} from 'redux-saga/effects';
import {authSaga} from '../sagas/auth.saga';
import {themeSaga} from '../sagas/theme.saga';

function* rootSaga() {
  yield all([authSaga()]);
  yield all([themeSaga()]);
}

export {rootSaga};
