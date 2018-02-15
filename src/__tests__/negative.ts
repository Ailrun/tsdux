import { compileTs as compile } from '../test-utilities';

test('action', () => {
  expect(compile('./fail-tests/action.ts')).toMatchSnapshot();
});

test('actiontype', () => {
  expect(compile('./fail-tests/actiontype.ts')).toMatchSnapshot();
});

test('reducer', () => {
  expect(compile('./fail-tests/reducer.ts')).toMatchSnapshot();
});
