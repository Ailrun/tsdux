import {
  Action,
  TypeOnlyActionCreator,
  PayloadActionCreator,
  PropsActionCreator,
  Payload,
  PayloadAction,
  PropsAction,
  action, payload, props,
} from '../src/action';

//START: Constants for tests
const TypeOnlyAction0 = action('action/W/O/PL0');
const TypeOnlyAction1 = action('action/W/O/PL1');
const TypeOnlyAction2: TypeOnlyActionCreator<'action/W/O/PL1'> = TypeOnlyAction1;

const PropsAction0 = action('action/with?!PROPS0', props());
const PropsAction1 = action('action/with?!PROPS1', props<{ x: number }>());
const PropsAction2 = action('action/with?!PROPS2', props<{ error?: string }>());
const PropsAction3: PropsActionCreator<'action/with?!PROPS3', Payload<number>> = action('action/with?!PROPS3', props<Payload<number>>());

const PayloadAction0 = action('action/WITH_PL0', payload());
const PayloadAction1 = action('action/WITH_PL1', payload<number>());
const PayloadAction2 = action('action/WITH_PL2', payload<string>());
const PayloadAction3 = action('action/WITH_PL3', payload<string[]>());
const PayloadAction4 = action('action/WITH_PL4', payload<{ name: string, age: number }>());
const PayloadAction5 = action('action/WITH_PL5', payload<Function>());
const PayloadAction6 = action('action/WITH_PL6', payload<() => boolean>());
const PayloadAction7: PayloadActionCreator<'action/WITH_PL7', { value: number }> = action('action/WITH_PL7', payload<{ value: number }>());
const PayloadAction8 = PayloadAction7;

const typeOnlyAction0: Action<'action/W/O/PL0'> = TypeOnlyAction0.create();
const typeOnlyAction1: Action<'action/W/O/PL1'> = TypeOnlyAction1.create();
const typeOnlyAction2 = TypeOnlyAction2.create();

const propsAction0: Action<'action/with?!PROPS0', {}> = PropsAction0.create({});
const propsAction1: PropsAction<'action/with?!PROPS1', { x: number }> = PropsAction1.create({ x: 5 });
const propsAction2 = PropsAction2.create({ error: 'adsf' });
const propsAction3: Action<'action/with?!PROPS3', Payload<number>> = PropsAction3.create({ payload: 5213 });

const payloadAction0: Action<'action/WITH_PL0', {}> = PayloadAction0.create({});
const payloadAction1: Action<'action/WITH_PL1', Payload<number>> = PayloadAction1.create(2);
const payloadAction2: PayloadAction<'action/WITH_PL2', string> = PayloadAction2.create('abcf wef');
const payloadAction3 = PayloadAction3.create([]);
const payloadAction4 = PayloadAction4.create({ name: 'Ailrun', age: 9000 });
//END: Constants for tests



//START: Tests
//FAIL: Type parameter of props should be a subtype of {}
props<1>();
props<number>();
props<boolean>();

//FAIL: There are more than zero arguments for props function
props<{}>(1);
props<{}>({});
props<{}>(true, {});
props<{}>([], "abc");

//FAIL: There are more than zero arguments for payload function
payload<number>(1);
payload<boolean>(2);
payload<boolean>(true, {});
payload<boolean>(true, 3);

//FAIL: First argument has wrong type. It should be a string
action(5);
action(true);
action([]);
action({});

//FAIL: Assign TypeOnlyActionCreator to PropsActionCreator
const _TypeOnlyAction0: PropsActionCreator<'action/FAILED'> = action('action/FAILED');
const _TypeOnlyAction1: PropsActionCreator<'action/W/O/PL1'> = TypeOnlyAction1;

//FAIL: Assign TypeOnlyActionCreator to PayloadActionCreator
const _TypeOnlyAction2: PayloadActionCreator<'action/FAILED'> = action('action/FAILED');
const _TypeOnlyAction3: PayloadActionCreator<'action/W/O/PL1'> = TypeOnlyAction1;

//FAIL: First argument has wrong type. It should be a string
action(5, payload());
action(/RegExp/, payload<string>());
action([], payload<number>());

//FAIL: Second argument is not created from props or payload function.
action('123', {});
action('adg', { x: 5 });
action('ewkl', undefined);

//FAIL: Assign PropsActionCreator to TypeOnlyActionCreator
const _PropsAction0: TypeOnlyActionCreator<'action/FAILED'> = action('action/FAILED', props<{ x: number }>());
const _PropsAction1: TypeOnlyActionCreator<'action/WITH_PL2'> = PropsAction0;

//FAIL: Assign PropsActionCreator to PayloadActionCreator
const _PropsAction2: PayloadActionCreator<'action/FAILED', Payload<string>> = action('action/FAILED', props<{ payload: string }>());
const _PropsAction3: PayloadActionCreator<'action/WITH_PL2', Payload<number>> = PropsAction3;

//FAIL: Assign PayloadActionCreator to TypeOnlyActionCreator
const _PayloadAction0: TypeOnlyActionCreator<'action/FAILED'> = action('action/FAILED', payload<number>());
const _PayloadAction1: TypeOnlyActionCreator<'action/WITH_PL2'> = PayloadAction2;

//FAIL: Assign PayloadActionCreator to PropsActionCreator
const _PayloadAction2: PropsActionCreator<'action/FAILED', Payload<number>> = action('action/FAILED', payload<number>());
const _PayloadAction3: PropsActionCreator<'action/WITH_PL2', Payload<string>> = PayloadAction2;

//FAIL: TypeOnlyActionCreator.create does not accept any arguments
TypeOnlyAction0.create(5);
TypeOnlyAction0.create('adsf', []);

//FAIL: Assign Action to Action with some other type
const _action0: Action<'IDK'> = TypeOnlyAction1.create();
const _action1: Action<'GEWFEWK'> = TypeOnlyAction0.create();

//FAIL: Assign TypeOnlyAction to PropsAction with non-{} props
const _action2: PayloadAction<'action/W/O/PL1', { v: string }> = TypeOnlyAction2.create();
const _action3: PayloadAction<'action/W/O/PL1', { world: 'peace' }> = TypeOnlyAction1.create();

//FAIL: Assign TypeOnlyAction to PayloadAction
const _typeOnlyAction0: PayloadAction<'action/W/O/PL1'> = TypeOnlyAction2.create();
const _typeOnlyAction1: PayloadAction<'action/W/O/PL1'> = TypeOnlyAction1.create();

//INFO: Assigning TypeOnlyAction to PropsAction with {} props works
const __typeOnlyAction0: PropsAction<'action/W/O/PL0'> = TypeOnlyAction0.create();
const __typeOnlyAction1: PropsAction<'action/W/O/PL1'> = TypeOnlyAction2.create();

//FAIL: PropsActionCreator.create accept exactly one argument
PropsAction1.create();
PropsAction1.create(2, 'ads');
PropsAction1.create(false, {}, 3, 4);

//FAIL: PropsActionCreator.create accept an argument of specific type
PropsAction3.create(5);
PropsAction3.create(true);
PropsAction3.create([1, 2, 3]);
PropsAction3.create({ y: 5 });

//FAIL: Assign PropsAction to PropAction with some other type
const _propsAction0: PropsAction<'heheheheh', {}> = PropsAction0.create({});
const _propsAction1: PropsAction<'OHMY/GOD', Payload<number>> = PropsAction3.create({
  payload: 5,
});

//FAIL: Assign PropsAction to PropsAction with some other props
const _propsAction2: PropsAction<'action/with?!PROPS2', { error: number }> = PropsAction2.create({
  error: 'asd',
});

//INFO: Assigning PropsAction to TypeOnlyAction has no problems
const __typeOnlyAction2: Action<'action/with?!PROPS1'> = PropsAction1.create({ x: 2058188 });

//INFO: Assign PropsAction to PropsAction with props of supertype of original props makes no errors.
const __propsAction0: PropsAction<'action/with?!PROPS1', {}> = PropsAction1.create({
  x: 492,
});

//FAIL: PayloadActionCreator.create accept exactly one argument
PayloadAction0.create();
PayloadAction0.create({}, 2);
PayloadAction0.create({}, 2, 4);

//FAIL: PayloadActionCreator.create accept an argument of specific type
PayloadAction1.create('as');
PayloadAction1.create({});
PayloadAction1.create(new Date());

//FAIL: Assign PayloadAction to PayloadAction with some other type
const _payloadAction0: PayloadAction<'gwer', {}> = PayloadAction0.create({});
const _payloadAction1: PayloadAction<'aciton/WITH_PL2', Array<string>> = PayloadAction3.create(['afwd']);

//FAIL: Assign PayloadAction to PayloadAction with some other payload
const _payloadAction2: PayloadAction<'action/WITH_PL1', string> = PayloadAction1.create(320);
const _payloadAction3: PayloadAction<'action/WITH_PL0', { value: number }> = PayloadAction0.create({});

//INFO: Assigning PayloadAction to TypeOnlyAction has no problems
const __typeOnlyAction3: Action<'action/WITH_PL0'> = PayloadAction0.create({});

//INFO: Assign PayloadAction to PayloadAction with payload of supertype of original payload makes no errors.
const __payloadAction0: PayloadAction<'action/WITH_PL7', {}> = PayloadAction7.create({
  value: 9,
});

//FAIL: Try to set a value of payload
payloadAction2.payload = 'afe';
payloadAction3.payload = [];

//INFO: Set the property of payload is not blocked
payloadAction3.payload[0] = '1';
//END: Tests
