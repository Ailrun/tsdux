import { Payload, action, payload, props } from '../src/action';
import { Subreducer, reducer, subreducer } from '../src/reducer';

//START: Constants for tests
interface History {
  content: string;
  userId: string;
  created: Date;
}

interface State {
  histories: {
    id: number,
    history: History,
  }[];
}

const AddHistory = action('app/history/ADD_HISTORY', payload<History>());
const UpdateHistory = action('app/history/UPDATE_HISTORY', props<{id: number, updated: History}>());
const RemoveHistory = action('app/history/REMOVE_HISTORY', payload<number>());
const ResetHistory = action('app/history/RESET_HISTORY');

const action0 = AddHistory.create({
  content: '123',
  userId: 'useruser',
  created: new Date(Date.UTC(2018, 10, 4)),
});
const action1 = RemoveHistory.create(5);
const action2 = UpdateHistory.create({
  id: 23,
  updated: {
    content: 'abce',
    userId: 'useraint',
    created: new Date(Date.UTC(2011, 5, 30)),
  },
});
const action3 = AddHistory.create({
  content: 'HIHIHIQ!!!',
  userId: 'fwefewuil',
  created: new Date(Date.UTC(2015, 1, 20)),
});
const action4 = ResetHistory.create();

const initialState: State = {
  histories: [{
    id: 4,
    history: {
      content: 'fewf',
      userId: 'pphperpter',
      created: new Date(Date.UTC(2025, 11, 7)),
    },
  }],
};

const subreducer0 = subreducer(AddHistory, (s: State, { payload: history }) => {
  const newId = s.histories.map(h => h.id)
    .reduce((max, id) => id > max ? id : max, 0) + 1;

  return {
    histories: [
      ...s.histories,
      {
        id: newId,
        history,
      },
    ],
  };
});
const subreducer1 = subreducer(RemoveHistory, (s: State, { payload: removeId }) => {
  const newHistories = s.histories.filter(({ id }) => id != removeId);

  return {
    histories: newHistories,
  };
});
const subreducer2 = subreducer(UpdateHistory, (s: State, { id, updated }) => {
  const newHistories = s.histories.map(history => {
    if (history.id !== id) {
      return history;
    }

    return {
      id,
      history: updated,
    };
  });

  return {
    histories: newHistories,
  };
});
const subreducer3 = subreducer(ResetHistory, () => {
  return {
    histories: [],
  };
});

const weirdSubreducer0 = subreducer(AddHistory, (s: { x: number, y: number }) => s);

const historyReducer = reducer(initialState, [
  subreducer0,
  subreducer1,
  subreducer2,
  subreducer3
]);
//END: Constants for tests

//START: Tests
//FAIL: The number of arguments is not 2
subreducer();
subreducer(AddHistory);
subreducer(UpdateHistory, (s: {}) => { return s }, 5);

//FAIL: First argument is not an `ActionCreator`
subreducer(5, (s: {}) => s);
subreducer({}, (s: {}) => s);
subreducer([], (s: {}) => s);
subreducer(action0, (s: {}) => s);
subreducer([action0], (s: {}) => s);

//FAIL: Second argument is not an handler function
subreducer(UpdateHistory, 5);
subreducer(RemoveHistory, []);
subreducer(ResetHistory, {});
subreducer(AddHistory, (s: {}) => {});
subreducer(AddHistory, (s: State, v) => v);
subreducer(AddHistory, (s: State, v: History, x: any) => s);

//FAIL: Second argument is not an appropriate handler for first argument.
subreducer(UpdateHistory, (s: State, v: History) => s);
subreducer(ResetHistory, (s: State, v: undefined) => s);
subreducer(ResetHistory, (s: State, v: number) => s);
subreducer(AddHistory, (s: State, v: { id: number }) => s);

//FAIL: Second argument of handler is not a supertype of action.
subreducer(UpdateHistory, (s: State, v: { id: string }) => s);
subreducer(UpdateHistory, (s: State, v: { id: number, updated: History, world: boolean }) => s);

//INFO: If second argument of handler is a supertype of action, it is allowed.
subreducer(UpdateHistory, (s: State, v: { id: number }) => s);

//FAIL: Assign Subreducer to Subreducer with different payload
const _subreducer0: Subreducer<any, 'app/history/UPDATE_HISTORY', { x: number }> = subreducer(UpdateHistory, (s: State, v: { id: number, updated: History }): any => s);
const _subreducer1: Subreducer<any, 'a', { result: number }> = subreducer(action('a', props<{ result: boolean }>()), (s: {}, { result }): any => s);
const _subreducer2: Subreducer<any, 'a', Payload<string>> = subreducer(action('a', payload<number>()), (...args: any[]): any => ({}));

//FAIL: The number of arguments is not 2
reducer();
reducer(initialState);
reducer(initialState, [], 5);
reducer(initialState, [subreducer0], 1);

//FAIL: Second argument is not an array of subreducers (or `Subreducer`s)
reducer(initialState, 5);
reducer(initialState, {});
reducer(initialState, true);
reducer(initialState, 'asdaw');
reducer(initialState, [5]);
reducer(initialState, [subreducer]);
reducer(initialState, [AddHistory]);

//FAIL: First argument does not match with state of second argument
reducer(initialState, [weirdSubreducer0]);
reducer({ x: number, y: number }, [subreducer0]);
//END: Tests
