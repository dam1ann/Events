import * as EventCreatorActions from '../event-creator/event-creator.actions';

export type Action = EventCreatorActions.All;

export function eventCreatorReducer(state, action: Action) {
  switch (action.type) {
    case EventCreatorActions.CHECK_NAME:
      return {
        ...state,
        ...action.payload,
        loading: true
      };

    case EventCreatorActions.NAME_VALID:
      return {
        ...state,
        loading: false
      };

    case EventCreatorActions.NAME_ERROR:
      return {
        ...state,
        loading: false
      };
  }
}
