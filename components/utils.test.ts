import { addFields_Reducer, mutateQuestionAtPath } from './utils';

describe('utils', () => {
  describe('addFields_Reducer', () => {
    it('should add fields to the input', () => {
      const input = [{
        item: 'anything'
      }, {
        nested: {
          array: [{
            deeper: true
          }]
        },
        override: 'not overridden'
      }];

      const add = [{ add: 'field' }, { some: { thing: 'else' }, override: 'test change' }, { extra: 'added' }];

      const expected = [{
        item: 'anything',
        add: 'field'
      }, {
        nested: {
          array: [{
            deeper: true
          }]
        },
        some: {
          thing: 'else'
        },
        override: 'not overridden'
      }, {
        extra: 'added'
      }];

      const result = input.reduce(addFields_Reducer('boolean'), add);
      
      expect(result).toEqual(expected)
    });
  });});
