import { store } from './store';

describe('Redux store', () => {
  test('initial state should match reducer', () => {
    const expectedInitialState = {
      home: {
        selectedContinent: "Europe",
      },
    };
    const initialState = store.getState();
    expect(initialState).toEqual(expectedInitialState);
  });
});