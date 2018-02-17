import {
  ActionCreator,
} from './action';

export function union<AC extends ActionCreator<string, any>>(
  _arg: Array<AC>,
): AC['action'] {
  return undefined as any;
}
