import { Action } from '@ngrx/store';

export const CHECK_NAME = '[Event creator] Check event title';
export const NAME_ERROR = '[Event creator] Event title already exist';
export const NAME_VALID = '[Event creator] Correct event title';
export const SECOND_STEP_SUCCESS = '[Event creator] Second step success';
export const SECOND_STEP_ERROR = '[Event creator] Second step success';

export class CheckName implements Action {
  readonly type = CHECK_NAME;

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

export class SecondStepSuccess implements Action {
  readonly type = SECOND_STEP_SUCCESS;

  constructor(public payload?: any) {

  }
}

export class SecondStepError implements Action {
  readonly type = SECOND_STEP_ERROR;

  constructor(public payload?: any) {

  }
}


export type All =
  CheckName |
  NameError |
  NameValid |
  SecondStepError |
  SecondStepSuccess;
