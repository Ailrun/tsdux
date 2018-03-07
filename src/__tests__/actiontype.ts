import { action, payload, props } from '../action';
import { isType, union } from '../actiontype';

test('`isType` should accept any actions created by `action` and any action creators', () => {
  const TestAction0 = action('test/ACTION/0');
  const TestAction1 = action('test/ACTION/1', payload<string>());
  const TestAction2 = action('test/ACTION/2', props<{ t: number }>());

  const action0 = TestAction0.create();
  const action1 = TestAction1.create('abde');
  const action2 = TestAction2.create({ t: 0 });

  expect(() => {
    isType(action0, TestAction0);
  }).not.toThrowError();
  expect(() => {
    isType(action0, TestAction1);
  }).not.toThrowError();
  expect(() => {
    isType(action0, TestAction2);
  }).not.toThrowError();
  expect(() => {
    isType(action1, TestAction0);
  }).not.toThrowError();
  expect(() => {
    isType(action1, TestAction1);
  }).not.toThrowError();
  expect(() => {
    isType(action1, TestAction2);
  }).not.toThrowError();
  expect(() => {
    isType(action2, TestAction0);
  }).not.toThrowError();
  expect(() => {
    isType(action2, TestAction1);
  }).not.toThrowError();
  expect(() => {
    isType(action2, TestAction2);
  }).not.toThrowError();
});

test('`isType` should accept any objects with type property and any action creators', () => {
  expect(() => {
    isType({ type: 'MY GOD' }, action('OH'));
  }).not.toThrowError();
});

test('`isType` should return true for a action created by the action creator at second argument', () => {
  const OtherAction = action('other/WORLD', payload<undefined>());

  const otherAction = OtherAction.create(undefined);

  expect(isType(otherAction, OtherAction)).toBe(true);
});

test('`isType` should return false for a action have different type with the action creator', () => {
  const FirstAction = action('World-Is-Mine', payload<{ m: string, k: string }>());
  const SecondAction = action('ASDF', props<{ m: string, k: string }>());
  const ThirdAction = action('D&D', payload<number>());

  const fa = FirstAction.create({ m: 'i', k: 'u' });

  expect(isType(fa, SecondAction)).toBe(false);
  expect(isType(fa, ThirdAction)).toBe(false);
});

test('`isType` should return true for a action created by one of the action creators', () => {
  const TestAction0 = action('test/ACTION/0');
  const TestAction1 = action('test/ACTION/1', payload<string>());
  const TestAction2 = action('test/ACTION/2', props<{ key: number }>());
  const TestAction3 = action('test/ACTION/3', payload<RegExp>());

  const action0 = TestAction0.create();
  const action1 = TestAction1.create('abe');
  const action2 = TestAction2.create({ key: 103113124 });
  const action3 = TestAction3.create(/afefe/);

  expect(isType(action0, [TestAction0, TestAction2])).toBe(true);
  expect(isType(action1, [TestAction0, TestAction1, TestAction2, TestAction3])).toBe(true);
  expect(isType(action2, [TestAction1, TestAction2])).toBe(true);
  expect(isType(action3, [TestAction2, TestAction3])).toBe(true);
});

test('`isType` should return false for a action have type not same with any one of action creators', () => {
  const TestAction0 = action('test/ACTION/0');
  const TestAction1 = action('test/ACTION/1', payload<string>());
  const TestAction2 = action('test/ACTION/2', props<{ key: number }>());
  const TestAction3 = action('test/ACTION/3', payload<RegExp>());

  const action0 = TestAction0.create();
  const action1 = TestAction1.create('agwe');
  const action2 = TestAction2.create({ key: 963295 });
  const action3 = TestAction3.create(/x?.*ddd/);

  expect(isType(action0, [TestAction1, TestAction2])).toBe(false);
  expect(isType(action1, [TestAction0, TestAction0, TestAction2, TestAction3])).toBe(false);
  expect(isType(action2, [TestAction1, TestAction3, TestAction0])).toBe(false);
  expect(isType(action3, [TestAction1, TestAction1])).toBe(false);
  expect(isType({ type: 'abcd' }, [TestAction1, TestAction0, TestAction2, TestAction3])).toBe(false);
});

test('`union` should accept empty array', () => {
  expect(() => {
    union([]);
  }).not.toThrowError();
});

test('`union` should accept action array', () => {
  expect(() => {
    union([
      action('HI'),
      action('BYE'),
      action('THIS IS', payload<number>()),
      action('SOMETHING', props<{ v: object[] }>()),
    ]);
  }).not.toThrowError();
});

test('`union` should return `undefined`', () => {
  expect(union([])).toBeUndefined();
});
