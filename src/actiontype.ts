import {
  ActionCreator
} from './action';

export const union = <AC extends ActionCreator<any, any>>(
  _arg: Array<AC>,
): AC['action'] => {
  return undefined as any;
}
