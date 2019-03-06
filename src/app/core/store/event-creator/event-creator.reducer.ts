import * as EventCreatorActions from '../event-creator/event-creator.actions';
import { IEvent } from '../../models/event.interface';

export type Action = EventCreatorActions.All;

export interface CreatorState {
  event: IEvent;
  loading: boolean;
}

const defaultCreatorState = {
  event: <IEvent>{},
  loading: false
};


export function creatorReducer(state = defaultCreatorState, action: Action): CreatorState {
  switch (action.type) {

    case EventCreatorActions.CHECK_NAME:
      console.log(state, action);
      return {
        ...state,
        event: <IEvent>{
          ...state.event,
          ...action.payload,
        },
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

    case EventCreatorActions.CHECK_MORE_INFO:
      return {
        ...state,
        event: <IEvent>{
          ...state.event,
          ...action.payload,
        }, loading: true
      };

    case EventCreatorActions.SECOND_STEP_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case EventCreatorActions.SECOND_STEP_ERROR:
      return {
        ...state,
        loading: false
      };

    case EventCreatorActions.CREATE_EVENT:
      return {
        ...state,
        loading: true
      };

    case EventCreatorActions.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case EventCreatorActions.CREATE_EVENT_ERROR:
      return {
        ...state,
        loading: false
      };

    default: {
      return state;
    }
  }
}
