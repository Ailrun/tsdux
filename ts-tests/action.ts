import {
  Action,
  ActionCreator,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  ActionWithPayload,
  ActionWithoutPayload,
  action, payload,
} from '../src/action';

//START: Constants for tests
const ActionWithoutPayload0 = action('action/W/O/PL0');
const ActionWithoutPayload1: ActionCreator<'action/W/O/PL1'> = action('action/W/O/PL1');
const ActionWithoutPayload2: ActionCreatorWithoutPayload<'action/W/O/PL1'> = ActionWithoutPayload1;

const ActionWithPayload0 = action('action/WITH_PL0', payload());
const ActionWithPayload1 = action('action/WITH_PL1', payload<number>());
const ActionWithPayload2 = action('action/WITH_PL2', payload<string>());
const ActionWithPayload3 = action('action/WITH_PL3', payload<string[]>());
const ActionWithPayload4 = action('action/WITH_PL4', payload<{ name: string, age: number }>());
const ActionWithPayload5 = action('action/WITH_PL5', payload<Function>());
const ActionWithPayload6 = action('action/WITH_PL6', payload<() => boolean>());
const ActionWithPayload7: ActionCreator<'action/WITH_PL7', { value: number }> = action('action/WITH_PL7', payload<{ value: number }>());
const ActionWithPayload8: ActionCreatorWithPayload<'action/WITH_PL7', { value: number }> = ActionWithPayload7;

const actionWithoutPayload0: Action<'action/W/O/PL0'> = ActionWithoutPayload0.create();
const actionWithoutPayload1: ActionWithoutPayload<'action/W/O/PL1'> = ActionWithoutPayload1.create();
const actionWithoutPayload2 = ActionWithoutPayload2.create();

const actionWithPayload0: Action<'action/WITH_PL0', {}> = ActionWithPayload0.create({});
const actionWithPayload1: Action<'action/WITH_PL1', number> = ActionWithPayload1.create(2);
const actionWithPayload2: ActionWithPayload<'action/WITH_PL2', string> = ActionWithPayload2.create('abcf wef');
const actionWithPayload3 = ActionWithPayload3.create([]);
const actionWithPayload4 = ActionWithPayload4.create({ name: 'Ailrun', age: 9000 });
//END: Constants for tests



//START: Tests
//FAIL: First argument has wrong type. It should be a string
const _ActionWithoutPayload0 = action(5);
const _ActionWithoutPayload1 = action(true);
const _ActionWithoutPayload2 = action([]);
const _ActionWithoutPayload3 = action({});

//FAIL: Assign ActionCreatorWithoutPayload to ActionCreatorWithPayload
const _ActionWithoutPayload4: ActionCreatorWithPayload<'action/FAILED'> = action('action/FAILED');
const _ActionWithoutPayload5: ActionCreatorWithPayload<'action/W/O/PL1'> = ActionWithoutPayload1;

//FAIL: First argument has wrong type. It should be a string
const _ActionWithPayload0 = action(5, payload());
const _ActionWithPayload1 = action(/RegExp/, payload<string>());
const _ActionWithPayload2 = action([], payload<number>());

//FAIL: Assign ActionCreatorWithPayload to ActionCreatorWithoutPayload
const _ActionWithPayload3: ActionCreatorWithoutPayload<'action/FAILED'> = action('action/FAILED', payload<number>());
const _ActionWithPayload4: ActionCreatorWithoutPayload<'action/WITH_PL2'> = ActionWithPayload2;

//FAIL: ActionCreatorWithoutPayload.create does not accept any arguments
const _actionWithoutPayload0 = ActionWithoutPayload0.create(5);
const _actionWithoutPayload1 = ActionWithoutPayload0.create('adsf', []);

//FAIL: Assign ActionWithoutPayload to ActionWithoutPayload with some other type
const _actionWithoutPayload2: ActionWithoutPayload<'IDK'> = ActionWithoutPayload1.create();
const _actionWithoutPayload3: ActionWithoutPayload<'GEWFEWK'> = ActionWithoutPayload0.create();

//FAIL: Assign ActionWithoutPayload to ActionWithPayload
const _actionWithoutPayload4: ActionWithPayload<'action/W/O/PL2'> = ActionWithoutPayload2.create();
const _actionWithoutPayload5: ActionWithPayload<'action/W/O/PL1'> = ActionWithoutPayload1.create();

//FAIL: ActionCreatorWithPayload.create accept exactly one argument
const _actionWithPayload0 = ActionWithPayload0.create();
const _actionWithPayload1 = ActionWithPayload0.create({}, 2);
const _actionWithPayload2 = ActionWithPayload0.create({}, 2, 4);

//INFO: Assign ActionWithPayload to ActionWithoutPayload has no problems
const __actionWithoutPayload0: ActionWithoutPayload<'action/WITH_PL0'> = ActionWithPayload0.create({});

//FAIL: Assign ActionWithPayload to ActionWithPayload with some other type
const _actionWithPayload3: ActionWithPayload<'gwer', {}> = ActionWithPayload0.create({});
const _actionWithPayload4: ActionWithPayload<'aciton/WITH_PL2', Array<string>> = ActionWithPayload3.create(['afwd']);

//FAIL: Assign ActionWithPayload to ActionWithPayload with some other payload
const _actionWithPayload5: ActionWithPayload<'action/WITH_PL1', string> = ActionWithPayload1.create(320);
const _actionWithPayload6: ActionWithPayload<'action/WITH_PL0', { value: number }> = ActionWithPayload0.create({});

//INFO: Assign ActionWithPayload to ActionWithPayload with payload of supertype of original payload makes no errors.
const __actionWithPayload0: ActionWithPayload<'action/WITH_PL7', {}> = ActionWithPayload7.create({
  value: 9,
});

//FAIL: Try to set a value of payload
actionWithPayload2.payload = 'afe';
actionWithPayload3.payload = [];

//INFO: Set the property of payload is not blocked
actionWithPayload3.payload[0] = '1';
//END: Tests
