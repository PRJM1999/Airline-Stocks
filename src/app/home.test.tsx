import homeReducer, { selectContinent } from './home';

describe('homeSlice', () => {
  it('should return the initial state', () => {
    expect(homeReducer(undefined, {type: 'unknown'})).toEqual({
      selectedContinent: 'Europe',
    });
  });

  it('should update the selectedContinent when selectContinent is called', () => {
    const selectedContinent = 'Asia';
    const action = selectContinent(selectedContinent);
    const newState = homeReducer(undefined, action);
    expect(newState.selectedContinent).toEqual(selectedContinent);
  });
});
