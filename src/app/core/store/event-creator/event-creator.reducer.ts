import * as EventCreatorActions from '../event-creator/event-creator.actions';

export type Action = EventCreatorActions.All;

export function eventCreatorReducer(state, action: Action) {
  switch (action.type) {
    case EventCreatorActions.CHECK_EMAIL:
      return {...state, ...action.payload, loading: true};

    case EventCreatorActions.EMAIL_VALID:
      return {...state, loading: false};

    case EventCreatorActions.EMAIL_INVALID:
      return {...state, ...action.payload, loading: false};
  }
}
