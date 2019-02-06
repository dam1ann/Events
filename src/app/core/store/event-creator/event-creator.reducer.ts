import * as EventCreatorActions from '../event-creator/event-creator.actions';

export type Action = EventCreatorActions.All;

const defaultState = {
  name: '',
  loading: false
};

export function eventCreatorReducer(state = defaultState, action: Action) {
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
        ...action.payload,
        loading: false
      };

    case EventCreatorActions.CHECK_MORE_INFO:
      return {
        ...state,
        ...action.payload,
        loading: true
      };

    case EventCreatorActions.SECOND_STEP_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false
      };

    case EventCreatorActions.SECOND_STEP_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
  }
}
