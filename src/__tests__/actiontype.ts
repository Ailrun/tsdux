import { action, payload } from '../action';
import { union } from '../actiontype';

test('`union` should accept empty array', () => {
  expect(() => {
    union([]);
  }).not.toThrowError();
});

test('`union` should accept action array', () => {
  expect(() => {
    union([action('HI'), action('BYE'), action('THIS IS', payload<number>())]);
  }).not.toThrowError();
});

test('`union` should return `undefined`', () => {
  expect(union([])).toBeUndefined();
});
