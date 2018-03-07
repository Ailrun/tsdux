import {
  PayloadAction,
  PropsAction,
  action,
  payload,
  props,
} from '../src/action';
import {
  isType,
  union,
} from '../src/actiontype';

//START: Constants for tests
interface Test {
  value: string;
  expected: string;
}

const AddTest = action('app/tests/ADD_TEST', payload<Test>());
const UpdateTest = action('app/tests/UPDATE_TEST', props<{id: number, test: Test}>());
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
//FAIL: The number of arguments is not 2
isType(action0);
isType(action1, RemoveTest, 1);
isType(action1, RemoveTest, AddTest);

//FAIL: First argument is not an action
isType(5, AddTest);
isType([], AddTest);
isType({ test: '1' }, AddTest);

//FAIL: Second argument is not an ActionCreator nor an Array of ActionCreator
isType(action1, 5);
isType(action2, true);
isType(action0, {});
isType(action2, action2);
isType(action2, [5]);
isType(action2, [action1]);
isType(action2, [[AddTest]]);

//FAIL: Use wrong ActionCreators
(a: ActionType): void => {
  // Should use RemoveTest
  if (isType(a, AddTest)) {
    console.log(a.payload + 2);
  }
};
(a: ActionType): void => {
  // Should use AddTest/RemoveTest
  if (isType(a, CheckTest)) {
    console.log(a.payload);
  }
};
(a: ActionType): void => {
  // Should use AddTest/RemoveTest
  if (isType(a, [UpdateTest])) {
    console.log(a.payload);
  }
};

//FAIL: Array second argument only guarantees that
// first argument is a type of union of actions correspond with each ActionCreator
(a: ActionType): void => {
  // Should use RemoveTest only
  if (isType(a, [AddTest, RemoveTest])) {
    console.log(a.payload + 3);
  }
};
(a: ActionType): void => {
  // Should not use CheckTest
  if (isType(a, [AddTest, CheckTest])) {
    console.log(a.payload);
  }
};

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
const _AddTest: PayloadAction<'app/tests/ADD_TEST', Test> = union([AddTest, RemoveTest]);
const _RemoveTest: PayloadAction<'app/tests/REMOVE_TEST', number> = union([AddTest, RemoveTest]);

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
  // Should use a type of PayloadAction
  switch (a.type) {
  case CheckTest.type:
    console.log(a.payload);
  }
};
(a: ActionType): void => {
  // Should discriminate whether `a` is PayloadAction or not
  console.log(a.payload);
};
//END: Tests
