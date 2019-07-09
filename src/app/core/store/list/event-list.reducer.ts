import * as eventListActions from './event-list.actions';
import { IEvent } from '../../models';

export type Action = eventListActions.All;

export interface ListState {
  data: Array<IEvent>;
  loading: boolean;
}

const defaultListState: ListState = {
  data: [],
  loading: false
};


export function listReducer(listState = defaultListState, action: Action): ListState {
  switch (action.type) {
    case eventListActions.GET_EVENTS:
      return <ListState>{
        ...listState,
        loading: true
      };

    case eventListActions.FETCH_SUCCESS:
      return <ListState>{
        ...listState,
        data: <Array<IEvent>>action.payload,
        loading: false
      };

    case eventListActions.FETCH_ERROR:
      return <ListState>{
        ...listState,
        data: <Array<IEvent>>[],
        loading: false
      };

    case eventListActions.FILTER_EVENTS:
      return <ListState>{
        ...listState,
        data: <Array<IEvent>>[],
        loading: true
      };

    case eventListActions.CLEAR_STATE:
      return <ListState>{
        ...defaultListState
      };

    default: {
      return <ListState>listState;
    }
  }

}
