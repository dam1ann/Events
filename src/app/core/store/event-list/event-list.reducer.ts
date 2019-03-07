import * as eventListActions from './event-list.actions';
import { IEvent } from '../../models/event.interface';

export type Action = eventListActions.All;

export interface ListState {
  list: Array<IEvent>;
  loading: boolean;
}

const defaultListState = {
  list: <IEvent>[],
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
        list: <Array<IEvent>>action.payload,
        loading: false
      };

    case eventListActions.FETCH_ERROR:
      return <ListState>{
        ...listState,
        list: <Array<IEvent>>[],
        loading: false
      };

    default: {
      return <ListState>listState;
    }
  }

}
