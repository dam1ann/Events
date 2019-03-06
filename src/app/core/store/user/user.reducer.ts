import { IUser, User } from '../../models/user.interface';
import * as userActions from './user.actions';
import { createSelector } from '@ngrx/store';

export type Action = userActions.All;

export interface UserState {
  user: IUser;
  loading: boolean;
}

const defaultUserState = {
  user: new User(null, 'Guest'),
  loading: false
};

export function userReducer(userState = defaultUserState, action: Action): UserState {
  switch (action.type) {

    case userActions.GET_USER:
      return {...userState, loading: true};

    case userActions.AUTHENTICATED:
      return {
        ...userState,
        user: <IUser>{
          ...userState.user,
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
      return {...userState, loading: true};

    case userActions.GOOGLE_LOGIN:
      return {...userState, loading: true};

    case userActions.AUTH_ERROR:
      return {
        ...userState,
        user: <IUser>{
          ...userState.user,
          ...action.payload
        },
        loading: false
      };

    case userActions.LOGOUT:
      return {...userState, loading: true};

    default: {
      return userState;
    }
  }
}

