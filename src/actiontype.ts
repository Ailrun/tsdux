import {
  AnyAction,
} from 'redux';

import {
  ActionCreator,
} from './action';

export function isType<AC extends ActionCreator<string, any>>(
  action: AnyAction, actionCreators: AC | Array<AC>,
): action is AC['action'] {
  if (actionCreators instanceof Array) {
    return actionCreators
      .map(actionCreator => actionCreator.type)
      .some(type => action.type === type);
  } else {
    return action.type === actionCreators.type;
  }
}

export function union<AC extends ActionCreator<string, any>>(
  _arg: Array<AC>,
): AC['action'] {
  return undefined as any;
}
