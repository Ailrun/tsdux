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
  TYPE_ONLY = 'TYPE_ONLY',
  PROPS = 'PROPS',
  PAYLOAD = 'PAYLOAD',
}

export interface ActionCreator<T extends string, P extends object = {}> {
  readonly __tsdux_action__: ActionCreatorType;
  readonly type: T;
  readonly action: Action<T, P>;
  create(...args: Array<never>): Action<T, P>;
}

export interface TypeOnlyActionCreatorProperties<T extends string> extends ActionCreator<T> {
  readonly __tsdux_action__: ActionCreatorType.TYPE_ONLY;
  create(): TypeOnlyAction<T>;
}
export interface TypeOnlyActionCreator<T extends string> extends TypeOnlyActionCreatorProperties<T> {
  (): TypeOnlyAction<T>;
}

export interface PropsActionCreatorProperties<T extends string, P extends object = {}> extends ActionCreator<T, P> {
  readonly __tsdux_action__: ActionCreatorType.PROPS;
  create(props: P): PropsAction<T, P>;
}
export interface PropsActionCreator<T extends string, P extends object = {}> extends PropsActionCreatorProperties<T, P> {
  (props: P): PropsAction<T, P>;
}

export interface PayloadActionCreatorProperties<T extends string, P = {}> extends ActionCreator<T, Payload<P>> {
  readonly __tsdux_action__: ActionCreatorType.PAYLOAD;
  create(payload: P): PayloadAction<T, P>;
}
export interface PayloadActionCreator<T extends string, P = {}> extends PayloadActionCreatorProperties<T, P> {
  (payload: P): PayloadAction<T, P>;
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

function extend<O extends object, P extends object>(obj: O, p: P): O & P {
  const result: object = obj;

  for (const key of Object.keys(p)) {
    result[key] = p[key];
  }

  return result as O & P;
}

export function action<T extends string>(type: T): TypeOnlyActionCreator<T>;
export function action<T extends string, P extends object = {}>(type: T, p: PropsOpt<P>): PropsActionCreator<T, P>;
export function action<T extends string, P = {}>(type: T, p: PayloadOpt<P>): PayloadActionCreator<T, P>;
export function action<T extends string, P extends object>(
  type: T, pType?: PropsOpt<P> | PayloadOpt<P>,
): TypeOnlyActionCreator<T> | PropsActionCreator<T, P> | PayloadActionCreator<T, P> {
  if (pType) {
    switch (pType.__tsdux_opt__) {
    case ActionOptType.PROPS: {
      //tslint:disable-next-line: no-shadowed-variable
      const create = (props: P) => extend(extend({}, props), { type });
      const properties: PropsActionCreatorProperties<T, P> = {
        __tsdux_action__: ActionCreatorType.PROPS,
        type: type,
        //tslint:disable-next-line: no-shadowed-variable
        create(props: P) {
          return create(props);
        },
        action: undefined as any,
      };
      //tslint:disable-next-line: no-shadowed-variable
      const creator: PropsActionCreator<T, P> = extend(create, properties);

      return creator;
    }
    case ActionOptType.PAYLOAD: {
      //tslint:disable-next-line: no-shadowed-variable
      const create = (payload: P) => ({ type, payload });
      const properties: PayloadActionCreatorProperties<T, P> = {
        __tsdux_action__: ActionCreatorType.PAYLOAD,
        type: type,
        //tslint:disable-next-line: no-shadowed-variable
        create(payload: P) {
          return create(payload);
        },
        action: undefined as any,
      };
      const creator = extend(create, properties);

      return creator;
    }
    default:
      const x: never = pType;
      const jsonIndent = 2;
      const rep = JSON.stringify(x, undefined, jsonIndent);

      throw new Error(`tsdux error: use \`props\` or \`payload\` function when make an action creator\n    ${rep} is not created by \`props\` nor \`payload\``);
    }
  } else {
    const create = () => {
      return { type };
    };
    const properties: TypeOnlyActionCreatorProperties<T> = {
      __tsdux_action__: ActionCreatorType.TYPE_ONLY,
      type: type,
      create() {
        return create();
      },
      action: undefined as any,
    };
    const creator: TypeOnlyActionCreator<T> = extend(create, properties);

    return creator;
  }
}

export function props<P extends object = {}>(): PropsOpt<Omit<P, 'type'>> {
  return { __tsdux_opt__: ActionOptType.PROPS } as any;
}

export function payload<P = {}>(): PayloadOpt<P> {
  return { __tsdux_opt__: ActionOptType.PAYLOAD } as any;
}
