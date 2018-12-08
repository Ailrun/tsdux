# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Now tsdux supports `ts@>=2.9` better.

### Miscellaneous
- Update dev dependencies

## [2.2.1] - 2018-05-06

### Changed
- Add supports for `redux@^4`

## [2.2.0] - 2018-05-06

## [2.1.0] - 2018-03-08

### Added
- Now ActionCreator itself is callable.

### Changed
- Values and keys of `ActionCreatorType` are changed.
- `redux` is now peerDependencies instead of dependencies.

### Miscellaneous
- Add type documents to README.md

## [2.0.1] - 2018-03-07

### Miscellaneous
- Update README.md.

## [2.0.0] - 2018-03-07

### Added
- Add `props` function.
- Add `PropsOpt` type.
- Add `Payload` type.

### Changed
- **LOGIC BREAKING CHANGE** Now second argument of handler of `subreducer` accepts  
  `state` and `action`. Originally it accepted `state` and `payload`.
- **TYPE BREAKING CHANGE** Almost all types related with `Action` is changed.  
  Namely,
    - `Action` type is changed.
    - `ActionCreator` type is no longer exported from `index.ts`.
    - `ActionWithoutPayload` type is renamed to `TypeOnlyAction`.
    - `ActionWithPayload` type is renamed to `PayloadAction`.
    - `TypeOnlyAction` and `PayloadAction` are now exported.
    - `ActionCreatorWithoutPayload` type is renamed to `TypeOnlyActionCreator`.
    - `ActionCreatorWithPayload` type is renamed to `PayloadActionCreator`.
    - `TypeOnlyActionCreator` and `PayloadActionCreator` are not exported.
    - `SingleActionReducer` type is renamed to `Subreducer`.
    - `Payload` type is renamed to `PayloadOpt`, and new `Payload` type is added.
- **TYPE BREAKING CHANGE** `isType` now accepts `AnyAction` of redux.
- `action` function now accepts second argument of `PropsOpt` too.

### Miscellaneous
- Update tests for `props` function and new types.

## [1.2.0] - 2018-02-20

### Fixed
- **BREAKING** Fix type of `subreducer` to use 4 type parameters.  
  It used originally 3 type parameters.
    - Following type is fixed.
        ```typescript
        subreducer(action('a', payload<number>()), (...args: any[]): any => ({}));
        // Type before fixed: SingleActionReducer<any, 'a', any>
        // Type after fixed: SingleActionReducer<any, 'a', number>
        ```
- **BREAKING** Fix unnecessary type parameter of `reducer` function.  
  Now it accepts only 3 type parameters.

### Miscellaneous
- Add tests
    - positive/negative tests for reducer functions.
- Add travis supports
- Add codecov supports

## [1.1.0] - 2018-02-17

### Added
- Add `isType` function.

### Fixed
- **BREAKING** Fix top-type (most general type) of generic parameter `T` of `union`.
    - It is originally `any`, but since `T` should be a subtype of `string`,  
      so more valid top-type is `string`.

### Miscellaneous
- Fix tests style.

## [1.0.2] - 2018-02-17

### Fixed
- Now library uses function types instead of interface type.

### Miscellaneous
- Add tests
    - positive/negative tests for action functions.
    - positive/negative tests for action type functions.

## [1.0.1] - 2018-02-10

### Miscellaneous
- Add [LICENSE](https://github.com/Ailrun/tsdux/blob/master/LICENSE) file.
- Fix publish script.

## [1.0.0] - 2018-02-10

### Added
- Add `action` function.
- Add `payload` function.
- Add `union` function.
- Add `reducer` function.
- Add `subreducer` function.

### Miscellaneous
- Add documentations for functions.

[Unreleased]: https://github.com/Ailrun/tsdux
[2.2.1]: https://github.com/Ailrun/tsdux/tree/v2.2.1
[2.2.0]: https://github.com/Ailrun/tsdux/tree/v2.2.0
[2.1.0]: https://github.com/Ailrun/tsdux/tree/v2.1.0
[2.0.1]: https://github.com/Ailrun/tsdux/tree/v2.0.1
[2.0.0]: https://github.com/Ailrun/tsdux/tree/v2.0.0
[1.2.0]: https://github.com/Ailrun/tsdux/tree/v1.2.0
[1.1.0]: https://github.com/Ailrun/tsdux/tree/v1.1.0
[1.0.2]: https://github.com/Ailrun/tsdux/tree/v1.0.2
[1.0.1]: https://github.com/Ailrun/tsdux/tree/v1.0.1
[1.0.0]: https://github.com/Ailrun/tsdux/tree/v1.0.0
