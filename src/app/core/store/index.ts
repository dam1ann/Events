import { ActionReducerMap } from '@ngrx/store';
import { userReducer, UserState } from './user/user.reducer';

export interface AppState {
  userState: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  userState: userReducer,
};
