import {
  Reducer,
} from 'redux';

import {
  Action,
  ActionCreator,
} from './action';

export interface Subreducer<S, T extends string, P extends object = {}> {
  readonly type: T,
  handler(state: S, action: Action<T, P>): S;
}

export function subreducer<S, T extends string, P extends object>(
  action: ActionCreator<T, P>, handler: Subreducer<S, T, P>['handler'],
): Subreducer<S, T, P> {
  return {
    type: action.type,
    handler,
  };
}

export function reducer<S, SR extends Subreducer<S, string, any>>(
  initialState: S,
  subreducers: Array<SR>,
): Reducer<S> {
  const reducerMap = subreducers.reduce((map, { type, handler }) => {
    return {
      ...map,
      [type]: handler,
    };
  }, {});

  return function (state = initialState, action) {
    type AT = typeof action.type;
    type handler =
      | Subreducer<S, AT, any>['handler']
      | undefined
    ;
    const handler = reducerMap[action.type] as handler;

    if (!handler) {
      return state
    }

    return handler(state, action);
  };
}
