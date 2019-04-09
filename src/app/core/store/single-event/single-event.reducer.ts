import * as singleEventActions from './single-event.actions';
import { IEvent } from '../../models';

export type Action = singleEventActions.All;

export interface SingleEventState {
  event: IEvent;
  loading: boolean;
}

const defaultState: SingleEventState = {
  event: <IEvent>{},
  loading: false
};

export function singleEventReducer(eventState = defaultState, action: Action) {
  switch (action.type) {
    case singleEventActions.GET_EVENT :
      return <SingleEventState>{
        ...eventState,
        loading: true
      };

    case singleEventActions.FETCH_SUCCESS:
      return {
        ...eventState,
        event: <IEvent>action.payload,
        loading: false
      };

    case singleEventActions.FETCH_ERROR:
      return {
        ...eventState,
        event: <IEvent>{},
        loading: false
      };

    case singleEventActions.CLEAR_STATE:
      return {
        ...defaultState,
        loading: false
      };

    default:
      return <SingleEventState>eventState;
  }
}
