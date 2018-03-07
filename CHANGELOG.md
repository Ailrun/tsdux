# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
[1.2.0]: https://github.com/Ailrun/tsdux/tree/v1.2.0
[1.1.0]: https://github.com/Ailrun/tsdux/tree/v1.1.0
[1.0.2]: https://github.com/Ailrun/tsdux/tree/v1.0.2
[1.0.1]: https://github.com/Ailrun/tsdux/tree/v1.0.1
[1.0.0]: https://github.com/Ailrun/tsdux/tree/v1.0.0
