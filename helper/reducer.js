export const initialState = {version: 0, preview:null};

export function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return {...state, version: state.version + 1};
    case 'preview':
      return {...state, preview: action.payload}
    default:
      throw new Error();
  }
}