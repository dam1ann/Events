import { IUser, User } from '../../models/user.interface';
import * as userActions from './user.actions';

export type Action = userActions.All;

export interface UserState {
  user: IUser;
  loading: boolean;
}

const defaultUserState = {
  user: new User(null, 'Guest'),
  loading: false
};

export function userReducer(state = defaultUserState, action: Action): UserState {
  switch (action.type) {

    case userActions.GET_USER:
      return {...state, loading: true};

    case userActions.AUTHENTICATED:
      return {
        ...state,
        user: <IUser>{
          ...state.user,
          ...action.payload
        },
        loading: false
      };

    case userActions.NOT_AUTHENTICATED:
      return {
        user: defaultUserState.user,
        loading: false
      };

    case userActions.FACEBOOK_LOGIN:
      return {...state, loading: true};

    case userActions.GOOGLE_LOGIN:
      return {...state, loading: true};

    case userActions.AUTH_ERROR:
      return {
        ...state,
        user: <IUser>{
          ...state.user,
          ...action.payload
        },
        loading: false
      };

    case userActions.LOGOUT:
      return {...state, loading: true};
  }
}
