export interface ActionWithoutPayload<T extends string> {
  readonly type: T;
}
export interface ActionWithPayload<T extends string, P = {}> extends ActionWithoutPayload<T> {
  readonly payload: P;
}
export type Action<T extends string, P = {}> =
  | ActionWithoutPayload<T>
  | ActionWithPayload<T, P>
  ;

export interface ActionCreatorWithoutPayload<T extends string> {
  readonly type: T;
  readonly action: ActionWithoutPayload<T>;
  create(): ActionWithoutPayload<T>;
}
export interface ActionCreatorWithPayload<T extends string, P = {}> {
  readonly type: T;
  readonly action: ActionWithPayload<T, P>;
  create(payload: P): ActionWithPayload<T, P>;
}
export type ActionCreator<T extends string, P = {}> =
  | ActionCreatorWithoutPayload<T>
  | ActionCreatorWithPayload<T, P>
  ;

//@ts-ignore: P is used for type inference
//tslint:disable-next-line: no-unused-variable
export interface Payload<P = {}> {
}

export interface ActionBuilder {
  <T extends string>(
    type: T,
  ): ActionCreatorWithoutPayload<T>;
  <T extends string, P>(
    type: T, p: Payload<P>,
  ): ActionCreatorWithPayload<T, P>;
}
export const action: ActionBuilder = <T extends string, P>(type: T, pType?: Payload<P>) => {
  if (pType) {
    return {
      type,
      //tslint:disable-next-line: no-shadowed-variable
      create(payload: P) {
        return { type, payload: payload };
      },
    } as any;
  } else {
    return {
      type,
      create() {
        return { type };
      },
    } as any;
  }
}

export const payload = <P>(): Payload<P> => ({});
