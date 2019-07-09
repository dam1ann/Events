import * as EventCreatorActions from './creator.actions';
import { IEvent } from '../../models';

export type Action = EventCreatorActions.All;

export interface CreatorState {
  data: IEvent;
  loading: boolean;
  finished: boolean;
  step: string;
}

const defaultCreatorState = {
  data: <IEvent>{},
  loading: false,
  finished: false,
  step: 'first'
};


export function creatorReducer(eventState = defaultCreatorState, action: Action): CreatorState {
  switch (action.type) {

    case EventCreatorActions.CHECK_NAME:
      return {
        ...eventState,
        data: <IEvent>{
          ...eventState.data,
          ...action.payload,
        },
        loading: true
      };

    case EventCreatorActions.NAME_VALID:
      return {
        ...eventState,
        loading: false,
        step: 'second'
      };

    case EventCreatorActions.CHECK_MORE_INFO:
      return {
        ...eventState,
        data : <IEvent>{
          ...eventState.data,
          ...action.payload,
        }, loading: true
      };

    case EventCreatorActions.SECOND_STEP_SUCCESS:
      return {
        ...eventState,
        loading: false,
        step: 'third'
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
      return eventState;

    case EventCreatorActions.CLEAR_STATE:
      return {
        ...defaultCreatorState,
        step: 'first'
      };

    default: {
      return eventState;
    }
  }
}
