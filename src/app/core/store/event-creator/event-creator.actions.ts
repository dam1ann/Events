import { Action } from '@ngrx/store';


export const CHECK_EMAIL = '[Event creator] Check email attempt';
export const EMAIL_VALID = '[Event creator] Email valid';
export const EMAIL_INVALID = '[Event creator] Email invalid';
export const FIRST_STEP_COMPLETED = '[Event creator] First step completed';
export const SECOND_STEP = '[Event creator] Second step';
export const SECOND_STEP_COMPLETED = '[Event creator] Second step';
export const CREATE = '[Event creator] Event create attempt';
export const CREATED = '[Event creator] Created';
export const CREATE_ERROR = '[Event creator] Error';


export class CheckEmail implements Action {
  readonly type = CHECK_EMAIL;

  constructor(public payload?: any) {

  }
}

export class EmailValid implements Action {
  readonly type = EMAIL_VALID;

  constructor(public payload?: any) {
  }
}

export class EmailInvalid implements Action {
  readonly type = EMAIL_INVALID;

  constructor(public payload?: any) {

  }
}


export class FirstStepCompleted implements Action {
  readonly type = FIRST_STEP_COMPLETED;

  constructor(public payload?: any) {
  }
}

export class SecondStep implements Action {
  readonly type = SECOND_STEP;

  constructor(public payload?: any) {

  }
}

export class SecondStepCompleted implements Action {
  readonly type = SECOND_STEP_COMPLETED;

  constructor(public payload?: any) {

  }
}

export class Create implements Action {
  readonly type = CREATE;

  constructor(public payload?: any) {

  }
}

export class Created implements Action {
  readonly type = CREATED;

  constructor(public payload?: any) {

  }
}

export class CreateError implements Action {
  readonly type = CREATE_ERROR;

  constructor(public payload?: any) {
  }
}


export type All =
  CheckEmail
  | EmailValid
  | EmailInvalid
  | FirstStepCompleted
  | SecondStep
  | SecondStepCompleted
  | Create
  | Created
  | CreateError;
