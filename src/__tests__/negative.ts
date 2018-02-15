import { compileTs as compile } from '../test-utilities';

test('action', () => {
  expect(compile('./ts-tests/action.ts')).toMatchSnapshot();
});

test('actiontype', () => {
  expect(compile('./ts-tests/actiontype.ts')).toMatchSnapshot();
});

test('reducer', () => {
  expect(compile('./ts-tests/reducer.ts')).toMatchSnapshot();
});
