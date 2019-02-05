import { Action } from '@ngrx/store';

export const CHECK_NAME = '[Event creator] Check event name';
export const NAME_ERROR = '[Event creator] Event name already exist';
export const NAME_VALID = '[Event creator] Correct event name';


export class CheckName implements Action {
  readonly type = CHECK_NAME;
  readonly name: string;

  constructor(public payload?: any) {
  }
}


export class NameError implements Action {
  readonly type = NAME_ERROR;

  constructor(public payload?: any) {

  }
}

export class NameValid implements Action {
  readonly type = NAME_VALID;

  constructor(public payload?: any) {

  }
}


export type All =
  CheckName |
  NameError |
  NameValid;
