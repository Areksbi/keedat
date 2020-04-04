import { authReducers, initialState } from './auth.reducers';

describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = authReducers(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
