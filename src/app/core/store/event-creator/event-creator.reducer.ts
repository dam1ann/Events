import * as EventCreatorActions from '../event-creator/event-creator.actions';
import { IEvent } from '../../models/event.interface';

export type Action = EventCreatorActions.All;

export interface CreatorState {
  event: IEvent;
  loading: boolean;
  finished: boolean;
}

const defaultCreatorState = {
  event: <IEvent>{},
  loading: false,
  finished: false
};


export function creatorReducer(eventState = defaultCreatorState, action: Action): CreatorState {
  switch (action.type) {

    case EventCreatorActions.CHECK_NAME:
      return {
        ...eventState,
        event: <IEvent>{
          ...eventState.event,
          ...action.payload,
        },
        loading: true
      };

    case EventCreatorActions.NAME_VALID:
      return {
        ...eventState,
        loading: false
      };

    case EventCreatorActions.CHECK_MORE_INFO:
      return {
        ...eventState,
        event: <IEvent>{
          ...eventState.event,
          ...action.payload,
        }, loading: true
      };

    case EventCreatorActions.SECOND_STEP_SUCCESS:
      return {
        ...eventState,
        loading: false
      };

    case EventCreatorActions.CREATE_EVENT:
      return {
        ...eventState,
        loading: true
      };

    case EventCreatorActions.CREATE_EVENT_SUCCESS:
      return {
        ...eventState,
        loading: false,
        finished: true
      };

    case EventCreatorActions.HTTP_ERROR:
      return defaultCreatorState;

    case EventCreatorActions.CLEAR_STATE:
      return defaultCreatorState;

    default: {
      return eventState;
    }
  }
}
