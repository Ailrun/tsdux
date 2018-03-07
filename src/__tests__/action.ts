import { ActionOptType, action, payload, props } from '../action';

test('`props` function should return empty object', () => {
  expect(props<{ abc: boolean }>()).toEqual({ __tsdux_opt__: ActionOptType.PROPS });
  expect(props<{ error?: string }>()).toEqual({ __tsdux_opt__: ActionOptType.PROPS });
  expect(props<{ x: number }>()).toEqual({ __tsdux_opt__: ActionOptType.PROPS });
});

test('`payload` function should return empty object', () => {
  expect(payload<string>()).toEqual({ __tsdux_opt__: ActionOptType.PAYLOAD });
  expect(payload<() => boolean>()).toEqual({ __tsdux_opt__: ActionOptType.PAYLOAD });
  expect(payload<{ x: number }>()).toEqual({ __tsdux_opt__: ActionOptType.PAYLOAD });
});

test('`action` function should throw error when second argument is not created by `props` or `payload`', () => {
  expect(() => {
    action('SomeType', {} as any);
  }).toThrowError(/tsdux error(.|\n)*{}/);
});

test('`action` function should return an `ActionCreator` with `type` and `create`', () => {
  const Test = action('TEST');
  expect(Test).toHaveProperty('type');
  expect(Test).toHaveProperty('create');

  const MoreTest = action('MORE_TEST', props<{ error?: string }>());
  expect(MoreTest).toHaveProperty('type');
  expect(MoreTest).toHaveProperty('create');

  const OtherTest = action('OTHER_TEST', payload<{ condition: RegExp }>());
  expect(OtherTest).toHaveProperty('type');
  expect(OtherTest).toHaveProperty('create');
});

test('`action` function should return an `ActionCreator` with undefined `action`. It is only for type inference', () => {
  const Hello = action('Hello');
  expect(Hello).toHaveProperty('action');
  expect(Hello.action).toBeUndefined();

  const AnNyong = action('AnNyong', props<{ val: number }>());
  expect(AnNyong).toHaveProperty('action');
  expect(AnNyong.action).toBeUndefined();

  const Bonjour = action('Bonjour', payload<string>());
  expect(Bonjour).toHaveProperty('action');
  expect(Bonjour.action).toBeUndefined();
});

test('`ActionCreator` should be callable and return an redux action', () => {
  const SomeAction = action('some/ACTION');
  //tslint:disable-next-line: no-unbound-method
  expect(SomeAction).toBeInstanceOf(Function);
  expect(SomeAction()).toEqual({
    type: 'some/ACTION',
  });

  const NoAction = action('no/ACTION', props<{ action: boolean }>());
  //tslint:disable-next-line: no-unbound-method
  expect(NoAction).toBeInstanceOf(Function);
  expect(NoAction({ action: true })).toEqual({
    type: 'no/ACTION',
    action: true,
  });

  const MayAction = action('may/ACTION', payload<number>());
  //tslint:disable-next-line: no-unbound-method
  expect(MayAction).toBeInstanceOf(Function);
  expect(MayAction(0)).toEqual({
    type: 'may/ACTION',
    payload: 0,
  });
});

test('`create` of `ActionCreator` should be method and return an redux action', () => {
  const SomeAction = action('some/ACTION');
  //tslint:disable-next-line: no-unbound-method
  expect(SomeAction.create).toBeInstanceOf(Function);
  expect(SomeAction.create()).toEqual({
    type: 'some/ACTION',
  });

  const NoAction = action('no/ACTION', props<{ action: boolean }>());
  //tslint:disable-next-line: no-unbound-method
  expect(NoAction.create).toBeInstanceOf(Function);
  expect(NoAction.create({ action: true })).toEqual({
    type: 'no/ACTION',
    action: true,
  });

  const MayAction = action('may/ACTION', payload<number>());
  //tslint:disable-next-line: no-unbound-method
  expect(MayAction.create).toBeInstanceOf(Function);
  expect(MayAction.create(0)).toEqual({
    type: 'may/ACTION',
    payload: 0,
  });
});

test('`action` should works well with `props` with `type` as key', () => {
  const ErrorProne = action('its/OVER/9000', props<{ type: string }>());
  expect(ErrorProne.create({ type: 'safsdbe' })).toEqual({
    type: 'its/OVER/9000',
  });
});

test('`type` of `ActionCreator` should be same with the first argument of `action`', () => {
  const MyHiddenJob = action('my/HIDDEN/Job');
  expect(MyHiddenJob.type).toBe('my/HIDDEN/Job');

  const YourHiddenJob = action('your/HIDDEN/Job', props<{ user: number }>());
  expect(YourHiddenJob.type).toBe('your/HIDDEN/Job');

  const TheirHiddenJob = action('their/HIDDEN/Job', payload<string>());
  expect(TheirHiddenJob.type).toBe('their/HIDDEN/Job');
});
