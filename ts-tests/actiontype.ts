import {
  ActionWithPayload,
  action,
  payload,
} from '../src/action';
import { union } from '../src/actiontype';

//START: Constants for tests
interface Test {
  value: string;
  expected: string;
}

const AddTest = action('app/tests/ADD_TEST', payload<Test>());
const UpdateTest = action('app/tests/UPDATE_TEST', payload<{id: number, test: Test}>());
const RemoveTest = action('app/tests/REMOVE_TEST', payload<number>());
const CheckTest = action('app/tests/CHECK_TEST');

const ActionType = union([
  AddTest,
  UpdateTest,
  RemoveTest,
  CheckTest,
]);
type ActionType = typeof ActionType;
const action0: ActionType = AddTest.create({
  value: '123',
  expected: '333',
});
const action1: ActionType = RemoveTest.create(5);
const action2: ActionType = UpdateTest.create({
  id: 23,
  test: {
    value: 'abce',
    expected: '!!!@#',
  },
});
const action3: ActionType = AddTest.create({
  value: 'gwe123gf',
  expected: 'fwe1111111',
});
const action4: ActionType = CheckTest.create();
//END: Constants for tests

//START: Tests
//FAIL: There are no arguments
union();

//FAIL: First argument is not an array
union(12);
union('fweweglu');
union({});
union(AddTest);

//FAIL: There are more than one arguments
union([], 5);
union([], {});
union([], AddTest);

//FAIL: More than one slots of the first argument are not a ActionCreator
union([AddTest, UpdateTest, []]);
union(['', AddTest, RemoveTest]);

//FAIL: Assign union of actions to specific action
const _AddTest: ActionWithPayload<'app/tests/ADD_TEST', Test> = union([AddTest, RemoveTest]);
const _RemoveTest: ActionWithPayload<'app/tests/REMOVE_TEST', number> = union([AddTest, RemoveTest]);

//INFO: Assigning specific action to union of actions is perfectly fine
const __Action: ActionType = CheckTest.create();

//FAIL: Use wrong action types
(a: ActionType): void => {
  // Should use `'app/tests/REMOVE_TEST'`
  if (a.type === 'app/tests/ADD_TEST') {
    console.log(a.payload.toFixed(4));
  }
};
(a: ActionType): void => {
  // Should use `AddTest.type`
  if (a.type === RemoveTest.type) {
    console.log(a.payload.expected);
  }
};
(a: ActionType): void => {
  // Should use a type of ActionWithPayload
  switch (a.type) {
  case CheckTest.type:
    console.log(a.payload);
  }
};
(a: ActionType): void => {
  // Should discriminate whether `a` is ActionWithPayload or not
  console.log(a.payload);
};
//END: Tests
