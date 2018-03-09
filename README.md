# tsdux #

[![npm latest version](https://img.shields.io/npm/v/tsdux/latest.svg)](https://www.npmjs.com/package/tsdux)
[![npm total download](https://img.shields.io/npm/dt/tsdux.svg)](https://www.npmjs.com/package/tsdux)
[![github license](https://img.shields.io/github/license/Ailrun/tsdux.svg)](https://github.com/Ailrun/tsdux/blob/master/LICENSE)
[![github latest tag](https://img.shields.io/github/tag/Ailrun/tsdux.svg)](https://github.com/Ailrun/tsdux/tags)
[![github commit from latest](https://img.shields.io/github/commits-since/Ailrun/tsdux/latest.svg)](https://github.com/Ailrun/tsdux)
[![travis status](https://travis-ci.org/Ailrun/tsdux.svg?branch=master)](https://travis-ci.org/Ailrun/tsdux)
[![codecov coverage](https://img.shields.io/codecov/c/github/ailrun/tsdux.svg)](https://codecov.io/gh/Ailrun/tsdux)

Type-safe Redux Utils for TypeScript!

## Table of Contents ##

- [How To Install](#how-to-install)
- [How To Use](#how-to-use)
- [Prior Arts](#prior-arts)
- [API](#api)
- [Author](#author)

## How To Install ##

```
npm install --save redux tsdux
```

If you use [redux-observable](https://redux-observable.js.org/) or use [RxJS](http://reactivex.io/rxjs/) with [redux](https://redux.js.org/introduction), you also might have interest in [tsdux-observable](https://github.com/Ailrun/tsdux-observable) which includes some basic utilities to use TSdux with `Observable`s.

```
npm install --save rxjs tsdux-observable
```

## How To Use ##

``` typescript
// mysection.ts
import { action, payload, union } from 'tsdux';

interface MySectionState {
  log?: string;
  id: number;
}

// Make action creators
export const MyAction = action('myapp/mysection/MY_ACTION', props<{ error?: string }>());
export const YourAction = action('myapp/mysection/YOUR_ACTION', payload<{ id: number }>());

const Action = union([
  MyAction,
  YourAction,
]);
type Action = typeof Action;

const initialState: MySectionState = {
  id: 0,
};
export default function reducer(state: MySectionState = initialState, action: ActionType): MySectionState {
  switch(action.type) {
  case MyAction.type:
    return {
      ...state,
      log: action.error,
    };
  case YourAction.type:
    return {
      ...state,
      id: action.payload.id,
    };
  default:
    return state;
  }
}
```

``` typescript
// At other part that uses redux
import { MyAction, YourAction } from './mysection';
import { store } from './store';

store.dispatch(MyAction('abcd'));
store.dispatch(YourAction({ id: 5 }));
```

## Prior Arts ##

This library is highly inspired by [ts-action](https://github.com/cartant/ts-action).
However, it uses `Object.setPrototypeOf` in its code, and it is really, really bad to performace (see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)) and have some runtime overheads on the `ActionCtor` instances.
This library is intended to be more fast, and be more lighter (therefore, have less APIs...) than ts-action (At least this **does not** use `Object.setPrototypeOf`!). If you find any codes those hurt performance, please [report an issue](https://github.com/Ailrun/tsdux/issues).

## API ##

- [API Types](#api-types)
    - [TypeOnlyAction](#typeonlyaction)
    - [PropsAction](#propsaction)
    - [PayloadAction](#payloadaction)
    - [TypeOnlyActionCreator](#typeonlyactioncreator)
    - [PropsActionCreator](#propsactioncreator)
    - [PayloadActionCreator](#payloadactioncreator)
- [Action util functions](#action-util-functions)
    - [action](#action)
    - [payload](#payload)
    - [props](#props)
- [Action type util functions](#action-type-util-functions)
    - [union](#union)
    - [isType](#istype)
- [Reducer util functions](#reducer-util-functions)
    - [subreducer](#subreducer)
    - [reducer](#reducer)

### API Types ###

Types used in this library.

#### TypeOnlyAction ####

Action without any extra properties.

``` typescript
type TypeOnlyAction<T extends string> = {
  type: T;
}
```

#### PropsAction ####

Action with extra properties.

``` typescript
type PropsAction<T extends string, P extends object = {}> = {
  type: T;
} & P;
```

#### PayloadAction ####

Action with `payload` property. This action is easier to create than `PropsAction`, although this also has its own cons.

``` typescript
type PayloadAction<T extends string, P = {}> = {
  type: T;
  payload: P;
}
```

#### TypeOnlyActionCreator ####

ActionCreator made by [`action`](#action) function. This ActionCreator creates `TypeOnlyAction`.

``` typescript
interface TypeOnlyActionCreator<T extends string> {
  (): TypeOnlyAction<T>;
  type: T;
  action: TypeOnlyAction<T>;
  create(): TypeOnlyAction<T>;
}
```

#### PropsActionCreator ####

This ActionCreator creates `PropsAction`.

``` typescript
interface PropsActionCreator<T extends string, P extends object = {}> {
  (props: P): PropsAction<T, P>;
  type: T;
  action: PropsAction<T, P>;
  create(props: P): PropsAction<T, P>;
}
```

#### PayloadActionCreator ####

This ActionCreator creates `PayloadAction`.

``` typescript
interface PayloadActionCreator<T extends string, P = {}> {
  (payload: P): PayloadAction<T, P>;
  type: T;
  action: PayloadAction<T, P>;
  create(payload: P): PayloadAction<T, P>;
}
```

### Action util functions ###

Functions for defining an action (or rather an action creator). Defined action creators are used to define reducer.

#### action ####

``` typescript
function action<T extends string>(type: T): TypeOnlyActionCreator<T>;
function action<T extends string, P extends object = {}>(type: T, p: PropsOpt<P>): PropsActionCreator<T, P>;
function action<T extends string, P = {}>(type: T, p: PayloadOpt<P>): PayloadActionCreator<T, P>;
```
`action` is for creating an `ActionCreator`. `ActionCreator` is object used for this library. You can create action by calling `ActionCreator` itself or calling `actionCreator.create` method.

``` typescript
const FixNote = action('FixNote');
const fixNote0 = FixNote.create();
const fixNote1 = FixNote();
console.log(fixNote0); // { type: 'FixNote' }
console.log(fixNote1); // { type: 'FixNote' }
```

``` typescript
switch (action.type) {
case FixNote.type:
  // ... fix note
default:
  return state;
}
```

However, if you cannot define payload, this action is useless. You can define it using [`payload`](#payload) function.

#### payload ####

``` typescript
function payload<P = {}>(): PayloadOpt<P>
```

`payload` is for creating a `payload` argument (second argument) of [`action`](#action) function.

``` typescript
const AddNote = action('AddNote', payload<string>());
const addNote = AddNote('This is a new note');
console.log(addNote); // { type: 'AddNote', payload: 'This is a new note' }
```

#### props ####

``` typescript
function props<P extends object = {}>(): PropsOpt<Omit<P, 'type'>>
```

`props` is for creating a `props` argument (second argument) of [`action`](#action) function.  
The difference between `props` and `payload` is that `props` injects additional data to action as property, where `payload` set additional data to `payload` of action. To get more clear understanding, see following example.

``` typescript
const ActionFromProps = action('Example0', props<{ x: number }>());
const ActionFromPayload = action('Example1', payload<{ x: number }>());

console.log(ActionFromProps({ x: 5 })); // { type: 'Example0', x: 5 }
console.log(ActionFromPayload({ x: 5 })); // { type: 'Example1', payload: { x: 5 } }

const OnlyForPayload = action('Example2', payload<string>());
// Following codes emit an error.
const ThisDoesNotWork = action('Example3', props<string>()); // There's no way to inject 'string' into action.

console.log(OnlyForPayload('abc')); // { type: 'Example2', payload: 'abc' }
```

``` typescript
const AddError = action('AddError', props<{ error?: string }>());
const addError0 = AddError({});
const addError1 = AddError({ error: 'New error' });
console.log(addError0); // { type: 'AddError' }
console.log(addError1); // { type: 'AddError', error: 'New error' }
```

### Action type util functions ###

Functions to define union type (or to do other type-related things).

#### union ####

``` typescript
function union<AC extends ActionCreator<string, any>>(arg: Array<AC>): AC['action'];
```

To define the type including all actions, you need to use this function. This *union type* is useful when you define a reducer without [`subreducer`](#subreducer) and [`reducer`](#reducer) functions.

``` typescript
const NoteActions = union([FixNote, AddNote]);

function reducer(state: State = { notes: [] }, action: NoteActions) {
  switch(action.type) {
  case FixNote.type:
    // ...
  case AddNote.type:
    // ...
  }
}
```

#### isType ####

``` typescript
function isType<AC extends ActionCreator<string, any>>(
  action: AnyAction, actionCreators: AC | Array<AC>,
): action is AC['action']
```

To check an action is specific type or not, you can use this function.

``` typescript
function reducer(state: State = { notes: [] }, action: NoteActions) {
  if (isType(action, FixNote)) {
    // ...
  } eles if (isType(action, AddNote)) {
    // ...
  } // ...
}
```

### Reducer util functions ###

Functions for define redux reducer.

#### subreducer ####

``` typescript
function subreducer<S, T extends string, P extends object>(
  action: ActionCreator<T, P>, handler: Subreducer<S, T, P>['handler'],
): Subreducer<S, T, P>
```

Function to define a reducer for specific action.

``` typescript
const fixNoteReducer = subreducer(FixNote, function (state) {
  return {
    ...state,
  });
});

const addNoteReducer = subreducer(AddNote, function (state, payload) {
  return {
    ...state,
    notes: [...state.notes, payload],
  });
});
```

These `Subreducer`s can be merged using [`reducer`](#reducer) function.

#### reducer ####

``` typescript
function reducer<S, SR extends Subreducer<S, string, any>>(
  initialState: S, subreducers: Array<SR>,
): Reducer<S>
```

Function to define a reducer by merging `Subreducer` cases.

``` typescript
export reducer({ notes: [] }, [fixNoteReducer, addNoteReducer]);
```

Code above is similar with

``` typescript
export function reducer(state = { notes: [] }, action) {
  switch (action.type) {
  case FixNote.type:
    //...
  case AddNote.type:
    //...
  // Code above includes following default case too.
  default:
    return state;
  }
}
```

## Author ##

Junyoung Clare Jang [@Ailrun]

[@Ailrun]: https://github.com/Ailrun
