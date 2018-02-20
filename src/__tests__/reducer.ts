//tslint:disable: no-magic-numbers
import { action, payload } from '../action';
import { reducer, subreducer } from '../reducer';

test('`subreducer` should accept any kind of action creators', () => {
  expect(() => {
    subreducer(action('hi'), jest.fn());
  }).not.toThrowError();
  expect(() => {
    subreducer(action('number/2312S!', payload<number>()), jest.fn());
  }).not.toThrowError();
  expect(() => {
    subreducer(action('HIHIHI', payload<FocusEvent>()), jest.fn());
  }).not.toThrowError();
});

test('`subreducer` should returns `SingleActionReducer` with `handler` and `type` properties', () => {
  const SomeAction = action('SOEMFE/IM_ACITON', payload<{}>());
  const SomeReducer = subreducer(SomeAction, jest.fn());

  //tslint:disable-next-line: no-unbound-method
  expect(SomeReducer.handler).not.toBeUndefined();
  expect(SomeReducer.type).not.toBeUndefined();

  const OtherAction = action('OTHEREERJW/YOURE_ACTION');
  const OtherReducer = subreducer(OtherAction, jest.fn());

  //tslint:disable-next-line: no-unbound-method
  expect(OtherReducer.handler).not.toBeUndefined();
  expect(OtherReducer.type).not.toBeUndefined();
});

test('`handler` of `SingleActionReducer` should call original handler with its arguments', () => {
  const AddAction = action('add/Action', payload<string>());
  const addHandler = jest.fn();
  const AddReducer = subreducer(AddAction, addHandler);

  AddReducer.handler({}, 'abce');
  expect(addHandler).toHaveBeenLastCalledWith({}, 'abce');

  const RemoveAction = action('remove/Action');
  const removeHandler = jest.fn();
  const RemoveReducer = subreducer(RemoveAction, removeHandler);

  RemoveReducer.handler({});
  expect(removeHandler).toHaveBeenLastCalledWith({});
});

test('`type` of `SingleActionReducer` should match with the type of original action', () => {
  const TypedAction = action('THISISMYOWNTYPE', payload<'AHHH'>());
  const TypedReducer = subreducer(TypedAction, jest.fn());

  expect(TypedReducer.type).toBe('THISISMYOWNTYPE');

  const NewTypeAction = action('NewType_Series');
  const NewTypeReducer = subreducer(NewTypeAction, jest.fn());

  expect(NewTypeReducer.type).toBe('NewType_Series');
});

test('`reducer` should accept any kind of `SingleActionReducer`', () => {
  const TestAction = action('TestAc!tion!');
  const CheckThisAction = action('CheckMyNewTHIS', payload<{ newThis: string }>());

  expect(() => {
    reducer({}, [
      subreducer(CheckThisAction, jest.fn()),
    ]);
  }).not.toThrowError();
  expect(() => {
    reducer({}, [
      subreducer(TestAction, jest.fn()),
    ]);
  }).not.toThrowError();
  expect(() => {
    reducer({}, [
      subreducer(TestAction, jest.fn()),
      subreducer(CheckThisAction, jest.fn()),
    ]);
  }).not.toThrowError();
});

test('`reducer` should return a redux `Reducer`', () => {
  const ExampleAction = action('test/EXAMPLE', payload<boolean>());
  const OrAnotherAction = action('test/ANOTHER');
  const initialState = { x: 5, y: 'abc', kddd: true };
  const testSectionReducer = reducer(initialState, [
    subreducer(ExampleAction, jest.fn()),
    subreducer(OrAnotherAction, jest.fn()),
  ]);

  expect(typeof testSectionReducer).toBe('function');
  expect(testSectionReducer(undefined as any, { type: '' })).toBe(initialState);
});

test('`reducer` should returns a `Reducer` that call each handler when and only when it called', () => {
  const EyeAction = action('body/EYE', payload<number>());
  const HeadAction = action('body/Head');
  const EarAction = action('body/EAR', payload<string>());
  const eyeHandler = jest.fn();
  const headHandler = jest.fn();
  const earHandler = jest.fn();
  const bodySectionReducer = reducer({}, [
    subreducer(EyeAction, eyeHandler),
    subreducer(HeadAction, headHandler),
    subreducer(EarAction, earHandler),
  ]);

  expect(eyeHandler).toHaveBeenCalledTimes(0);
  expect(headHandler).toHaveBeenCalledTimes(0);
  expect(earHandler).toHaveBeenCalledTimes(0);

  bodySectionReducer({ x: 5 }, EyeAction.create(5));
  expect(eyeHandler).toHaveBeenCalledTimes(1);
  expect(eyeHandler).toHaveBeenLastCalledWith({ x: 5 }, 5);

  expect(headHandler).toHaveBeenCalledTimes(0);
  expect(earHandler).toHaveBeenCalledTimes(0);

  bodySectionReducer({ think: { inner: 'abc' } }, HeadAction.create());
  expect(headHandler).toHaveBeenCalledTimes(1);
  expect(headHandler).toHaveBeenLastCalledWith({ think: { inner: 'abc' } });

  expect(earHandler).toHaveBeenCalledTimes(0);

  bodySectionReducer({ k: 'abcd' }, EarAction.create('1234'));
  expect(earHandler).toHaveBeenCalledTimes(1);
  expect(earHandler).toHaveBeenLastCalledWith({ k: 'abcd' }, '1234');

  bodySectionReducer({ wejf: 'asbse' }, { type: 'abef' });
  expect(eyeHandler).toHaveBeenCalledTimes(1);
  expect(headHandler).toHaveBeenCalledTimes(1);
  expect(earHandler).toHaveBeenCalledTimes(1);
});
