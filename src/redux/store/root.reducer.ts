import {combineReducers} from 'redux';
import {authSlice} from '../slices/auth.slice';
import { loaderSlice } from '../slices/loader.slice';
import {  themeSlice} from '../slices/theme.slice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  loader: loaderSlice.reducer,
  theme: themeSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
