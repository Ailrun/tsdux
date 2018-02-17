import {
  ActionCreator,
} from './action';

export function union<AC extends ActionCreator<any, any>>(
  _arg: Array<AC>,
): AC['action'] {
  return undefined as any;
}
