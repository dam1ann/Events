import { Action } from '@ngrx/store';

export const GET_EVENT = '[Event page] Fetching event data';
export const FETCH_SUCCESS = '[Event page] Fetch success';
export const FETCH_ERROR = '[Event page] Fetch error';
export const CLEAR_STATE = '[Event page] Clear state';

export class GetEvent implements Action {
  readonly type = GET_EVENT;

  constructor(public payload?: any) {

  }
}

export class FetchSuccess implements Action {
  readonly type = FETCH_SUCCESS;

  constructor(public payload?: any) {

  }
}

export class FetchError implements Action {
  readonly type = FETCH_ERROR;

  constructor(public payload?: any) {

  }
}

export class ClearState implements Action {
  readonly type = CLEAR_STATE;

  constructor(public payload?: any) {
  }
}

export type All =
  GetEvent |
  FetchSuccess |
  FetchError |
  ClearState;
