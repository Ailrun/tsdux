import { Reducer } from 'redux';

import {
  ActionCreator, ActionCreatorWithPayload, ActionCreatorWithoutPayload,
} from './action';

export interface SingleActionReducerWithoutPayload<S, T extends string> {
  type: T,
  handler(state: S): S;
}
export interface SingleActionReducerWithPayload<S, T extends string, P = {}> {
  type: T,
  handler(state: S, payload: P): S;
}
export type SingleActionReducer<S, T extends string, P = {}> =
  | SingleActionReducerWithoutPayload<S, T>
  | SingleActionReducerWithPayload<S, T, P>
  ;

export function subreducer<S, T extends string>(
  action: ActionCreatorWithoutPayload<T>, handler: SingleActionReducerWithoutPayload<S, T>['handler'],
): SingleActionReducerWithoutPayload<S, T>;
export function subreducer<S, T extends string, P>(
  action: ActionCreatorWithPayload<T, P>, handler: SingleActionReducerWithPayload<S, T, P>['handler'],
): SingleActionReducerWithPayload<S, T, P>;
export function subreducer<T extends string, P>(action: ActionCreator<T, P>, handler: any) {
  return {
    type: action.type,
    handler,
  };
}

export function reducer<S, T extends string, P, SR extends SingleActionReducer<S, T, P>>(
  initialState: S,
  subreducers: Array<SR>,
): Reducer<S> {
  const reducerMap = subreducers.reduce((map, sr) => {
    return {
      ...map,
      [sr.type]: sr.handler,
    };
  }, {});

  return function (state = initialState, action) {
    type AT = typeof action.type;
    type handler =
      | SingleActionReducer<S, AT, any>['handler']
      | undefined
    ;
    const handler = reducerMap[action.type] as handler;

    if (!handler) {
      return state
    }

    if (!action.payload) {
      type handlerWithoutPayload =
        SingleActionReducerWithoutPayload<S, AT>['handler'];
      return (handler as handlerWithoutPayload)(state);
    } else {
      type handlerWithPayload =
        SingleActionReducerWithPayload<S, AT, any>['handler'];
      return (handler as handlerWithPayload)(state, action.payload);
    }
  };
}
