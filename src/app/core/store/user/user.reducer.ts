import { IUser, User } from '../../models/user.interface';
import * as userActions from './user.actions';

export type Action = userActions.All;

export interface UserState {
  data: IUser;
  loading: boolean;
}

const defaultUserState = {
  data: new User(null, 'Guest'),
  loading: false
};

export function userReducer(userState = defaultUserState, action: Action): UserState {
  switch (action.type) {

    case userActions.GET_USER:
      return {...userState, loading: true};

    case userActions.AUTHENTICATED:
      return {
        ...userState,
        data: <IUser>{
          ...userState.data,
          ...action.payload
        },
        loading: false
      };

    case userActions.NOT_AUTHENTICATED:
      return {
        data: defaultUserState.data,
        loading: false
      };

    case userActions.FACEBOOK_LOGIN:
      return {...userState, loading: true};

    case userActions.GOOGLE_LOGIN:
      return {...userState, loading: true};

    case userActions.AUTH_ERROR:
      return {
        ...userState,
        data: <IUser>{
          ...userState.data,
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

