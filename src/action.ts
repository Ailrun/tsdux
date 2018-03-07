import {
  Omit,
} from './type-utilities';

export type Action<T extends string, P extends object = {}> =
  & { readonly type: T }
  & P
;

export interface Payload<P = {}> {
  readonly payload: P;
}

export type TypeOnlyAction<T extends string> = Action<T>;
export type PropsAction<T extends string, P extends object = {}> = Action<T, P>;
export type PayloadAction<T extends string, P = {}> = Action<T, Payload<P>>;

export enum ActionCreatorType {
  WITHOUT_EXTRAS = 'WITHOUT_EXTRAS',
  WITH_PROPS = 'WITH_PROPS',
  WITH_PAYLOAD = 'WITH_PAYLOAD',
}

export interface ActionCreator<T extends string, P extends object = {}> {
  readonly __tsdux_action__: ActionCreatorType;
  readonly type: T;
  readonly action: Action<T, P>;
  create(...args: Array<never>): Action<T, P>;
}
export interface TypeOnlyActionCreator<T extends string> extends ActionCreator<T> {
  readonly __tsdux_action__: ActionCreatorType.WITHOUT_EXTRAS;
  create(): TypeOnlyAction<T>;
}
export interface PropsActionCreator<T extends string, P extends object = {}> extends ActionCreator<T, P> {
  readonly __tsdux_action__: ActionCreatorType.WITH_PROPS;
  create(props: P): PropsAction<T, P>;
}
export interface PayloadActionCreator<T extends string, P = {}> extends ActionCreator<T, Payload<P>> {
  readonly __tsdux_action__: ActionCreatorType.WITH_PAYLOAD;
  create(payload: P): PayloadAction<T, P>;
}

export enum ActionOptType {
  PROPS = 'PROPS',
  PAYLOAD = 'PAYLOAD',
}

export interface PropsOpt<P extends object = {}> {
  readonly __tsdux_opt__: ActionOptType.PROPS;
  readonly props: P;
}
export interface PayloadOpt<P = {}> {
  readonly __tsdux_opt__: ActionOptType.PAYLOAD;
  readonly payload: P;
}

export function action<T extends string>(type: T): TypeOnlyActionCreator<T>;
export function action<T extends string, P extends object = {}>(type: T, p: PropsOpt<P>): PropsActionCreator<T, P>;
export function action<T extends string, P = {}>(type: T, p: PayloadOpt<P>): PayloadActionCreator<T, P>;
export function action<T extends string, P extends object>(
  type: T, pType?: PropsOpt<P> | PayloadOpt<P>,
): TypeOnlyActionCreator<T> | PropsActionCreator<T, P> | PayloadActionCreator<T, P> {
  if (pType) {
    switch (pType.__tsdux_opt__) {
    case ActionOptType.PROPS:
      return {
        __tsdux_action__: ActionCreatorType.WITH_PROPS,
        type,
        //tslint:disable-next-line: no-shadowed-variable
        create(props: P) {
          //tslint:disable-next-line: no-shadowed-variable
          const action = { type };
          for (const key of Object.keys(props)) {
            if (key !== 'type') {
              action[key] = props[key];
            }
          }

          return action as Action<T, P>;
        },
        action: undefined as any,
      };
    case ActionOptType.PAYLOAD:
      return {
        __tsdux_action__: ActionCreatorType.WITH_PAYLOAD,
        type,
        //tslint:disable-next-line: no-shadowed-variable
        create(payload: P) {
          return {
            type,
            payload
          };
        },
        action: undefined as any,
      };
    default:
      const x: never = pType;
      const jsonIndent = 2;
      const rep = JSON.stringify(x, undefined, jsonIndent);

      throw new Error(`tsdux error: use \`props\` or \`payload\` function when make an action creator\n    ${rep} is not created by \`props\` nor \`payload\``);
    }
  } else {
    return {
      __tsdux_action__: ActionCreatorType.WITHOUT_EXTRAS,
      type,
      create() {
        return { type };
      },
      action: undefined as any,
    };
  }
}

export function props<P extends object = {}>(): PropsOpt<Omit<P, 'type'>> {
  return { __tsdux_opt__: ActionOptType.PROPS } as any;
}

export function payload<P = {}>(): PayloadOpt<P> {
  return { __tsdux_opt__: ActionOptType.PAYLOAD } as any;
}
