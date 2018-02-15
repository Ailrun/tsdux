import { action, payload } from '../action';

test('`payload` function should return empty object', () => {
  expect(payload<string>()).toEqual({});
  expect(payload<() => boolean>()).toEqual({});
  expect(payload<{ x: number }>()).toEqual({});
});

test('`action` function should return an `ActionCreator` with `type` and `create`', () => {
  const Test = action('TEST');
  expect(Test).toHaveProperty('type');
  expect(Test).toHaveProperty('create');

  const OtherTest = action('OTHER_TEST', payload<{ condition: RegExp }>());
  expect(OtherTest).toHaveProperty('type');
  expect(OtherTest).toHaveProperty('create');
});

test('`action` function should return an `ActionCreator` without `action`. It is only for type inference', () => {
  const Hello = action('Hello');
  expect(Hello).not.toHaveProperty('action');

  const Bonjour = action('Bonjour', payload<string>());
  expect(Bonjour).not.toHaveProperty('action');
});

test('`create` of `ActionCreator` should be method and return an redux action', () => {
  const SomeAction = action('some/ACTION');

  expect(SomeAction.create).toBeInstanceOf(Function);
  expect(SomeAction.create()).toEqual({
    type: 'some/ACTION',
  });
});

test('`type` of `ActionCreator` should be same with the first argument of `action`', () => {
  const MyHiddenJob = action('my/HIDDEN/Job');

  expect(MyHiddenJob.type).toBe('my/HIDDEN/Job');
});
