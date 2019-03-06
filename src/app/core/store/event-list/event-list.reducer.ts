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
      return {
        ...listState,
        list: <Array<IEvent>>{},
        loading: true
      };

    case eventListActions.FETCH_SUCCESS:
      return {
        ...listState,
        list: <Array<IEvent>>{
          ...defaultListState.list
        },
        loading: false
      };

    case eventListActions.FETCH_ERROR:
      return {
        ...listState,
        list: <Array<IEvent>>{},
        loading: false
      };

  }

}
