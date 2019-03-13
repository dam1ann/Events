import { Action } from '@ngrx/store';

export const GET_EVENTS = '[Dashboard] Fetching data';
export const FETCH_SUCCESS = '[Dashboard] Fetch success';
export const FETCH_ERROR = '[Dashboard] Fetch error';
export const FILTER_EVENTS = '[Dashboard] Filtering events';


export class GetEvents implements Action {
  readonly type = GET_EVENTS;

  constructor(public payload?: any) {
  }
}

export class FetchError implements Action {
  readonly type = FETCH_ERROR;

  constructor(public payload?: any) {
  }
}

export class FetchSuccess implements Action {
  readonly type = FETCH_SUCCESS;

  constructor(public payload?: any) {

  }
}

export class FilterEevnts implements Action {
  readonly type = FILTER_EVENTS;

  constructor(public payload?: any) {

  }
}


export type All = GetEvents | FetchError | FetchSuccess | FilterEevnts;
