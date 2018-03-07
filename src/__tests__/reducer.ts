//tslint:disable: no-magic-numbers
import { action, payload, props } from '../action';
import { reducer, subreducer } from '../reducer';

test('`subreducer` should accept any kind of action creators', () => {
  expect(() => {
    subreducer(action('hi'), jest.fn());
  }).not.toThrowError();
  expect(() => {
    subreducer(action('WORLD/Begin', props<{ err: boolean }>()), jest.fn());
  }).not.toThrowError();
  expect(() => {
    subreducer(action('GIVE_DAMAGE', props<{ critical: boolean, val: number }>()), jest.fn());
  }).not.toThrowError();
  expect(() => {
    subreducer(action('number/2312S!', payload<number>()), jest.fn());
  }).not.toThrowError();
  expect(() => {
    subreducer(action('HIHIHI', payload<FocusEvent>()), jest.fn());
  }).not.toThrowError();
});

test('`subreducer` should returns `Subreducer` with `handler` and `type` properties', () => {
  const SomeAction = action('SOEMFE/IM_ACITON', payload<{}>());
  const SomeReducer = subreducer(SomeAction, jest.fn());

  //tslint:disable-next-line: no-unbound-method
  expect(SomeReducer.handler).not.toBeUndefined();
  expect(SomeReducer.type).not.toBeUndefined();

  const NoAction = action('NOFJWEIO/HES_ACITON', props<number[]>());
  const NoReducer = subreducer(NoAction, jest.fn());

  //tslint:disable-next-line: no-unbound-method
  expect(NoReducer.handler).not.toBeUndefined();
  expect(NoReducer.type).not.toBeUndefined();

  const OtherAction = action('OTHEREERJW/YOURE_ACTION');
  const OtherReducer = subreducer(OtherAction, jest.fn());

  //tslint:disable-next-line: no-unbound-method
  expect(OtherReducer.handler).not.toBeUndefined();
  expect(OtherReducer.type).not.toBeUndefined();
});

test('`handler` of `Subreducer` should call original handler with its arguments', () => {
  const AddAction = action('add/Action', payload<string>());
  const addHandler = jest.fn();
  const AddReducer = subreducer(AddAction, addHandler);

  AddReducer.handler({}, AddAction.create('abce'));
  expect(addHandler).toHaveBeenLastCalledWith({}, AddAction.create('abce'));

  const RemoveAction = action('remove/Action');
  const removeHandler = jest.fn();
  const RemoveReducer = subreducer(RemoveAction, removeHandler);
  RemoveReducer.handler({}, RemoveAction.create());
  expect(removeHandler).toHaveBeenLastCalledWith({}, RemoveAction.create());
});

test('`type` of `Subreducer` should match with the type of original action', () => {
  const TypedAction = action('THISISMYOWNTYPE', payload<'AHHH'>());
  const TypedReducer = subreducer(TypedAction, jest.fn());

  expect(TypedReducer.type).toBe('THISISMYOWNTYPE');

  const UnTypedAction = action('OHMYWENEEDTYPE', props<{ work: false }>());
  const UnTypedReducer = subreducer(UnTypedAction, jest.fn());

  expect(UnTypedReducer.type).toBe('OHMYWENEEDTYPE');

  const NewTypeAction = action('NewType_Series');
  const NewTypeReducer = subreducer(NewTypeAction, jest.fn());

  expect(NewTypeReducer.type).toBe('NewType_Series');
});

test('`reducer` should accept any kind of `Subreducer`', () => {
  const TestAction = action('TestAc!tion!');
  const CheckThisAction = action('CheckMyNewTHIS', payload<{ newThis: string }>());
  const CheckThatAction = action('CheckMyNewTHAT', props<{ newThat: number }>());

  expect(() => {
    reducer({}, [
      subreducer(CheckThisAction, jest.fn()),
    ]);
  }).not.toThrowError();
  expect(() => {
    reducer({}, [
      subreducer(CheckThatAction, jest.fn()),
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
  expect(() => {
    reducer({}, [
      subreducer(TestAction, jest.fn()),
      subreducer(CheckThatAction, jest.fn()),
    ]);
  }).not.toThrowError();
  expect(() => {
    reducer({}, [
      subreducer(CheckThatAction, jest.fn()),
      subreducer(CheckThisAction, jest.fn()),
    ]);
  }).not.toThrowError();
  expect(() => {
    reducer({}, [
      subreducer(CheckThatAction, jest.fn()),
      subreducer(TestAction, jest.fn()),
      subreducer(CheckThisAction, jest.fn()),
    ]);
  }).not.toThrowError();
});

test('`reducer` should return a redux `Reducer` that returns initialState when it called with undefined state', () => {
  const ExampleAction = action('test/EXAMPLE', payload<boolean>());
  const OrAnotherAction = action('test/ANOTHER');
  const AndMoreAction = action('test/MORE', props<{ world: true }>());
  const initialState = { x: 5, y: 'abc', kddd: true };
  const testSectionReducer = reducer(initialState, [
    subreducer(ExampleAction, jest.fn()),
    subreducer(AndMoreAction, jest.fn()),
    subreducer(OrAnotherAction, jest.fn()),
  ]);

  expect(typeof testSectionReducer).toBe('function');
  expect(testSectionReducer(undefined as any, { type: '' })).toBe(initialState);
});

test('`reducer` should returns a `Reducer` that call each handler when and only when it called', () => {
  const EyeAction = action('body/EYE', payload<number>());
  const HeadAction = action('body/Head');
  const EarAction = action('body/EAR', props<{ sound: string }>());
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
  expect(eyeHandler).toHaveBeenLastCalledWith({ x: 5 }, EyeAction.create(5));

  expect(headHandler).toHaveBeenCalledTimes(0);
  expect(earHandler).toHaveBeenCalledTimes(0);

  bodySectionReducer({ think: { inner: 'abc' } }, HeadAction.create());
  expect(headHandler).toHaveBeenCalledTimes(1);
  expect(headHandler).toHaveBeenLastCalledWith({ think: { inner: 'abc' } }, HeadAction.create());

  expect(earHandler).toHaveBeenCalledTimes(0);

  bodySectionReducer({ k: 'abcd' }, EarAction.create({ sound: '1234' }));
  expect(earHandler).toHaveBeenCalledTimes(1);
  expect(earHandler).toHaveBeenLastCalledWith({ k: 'abcd' }, EarAction.create({ sound: '1234' }));

  bodySectionReducer({ wejf: 'asbse' }, { type: 'abef' });
  expect(eyeHandler).toHaveBeenCalledTimes(1);
  expect(headHandler).toHaveBeenCalledTimes(1);
  expect(earHandler).toHaveBeenCalledTimes(1);
});
