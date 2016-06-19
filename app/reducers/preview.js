const reducer = (state = null, action) => {
  switch (action.type) {
    case 'START_PREVIEW':
      return {
        loc: action.loc,
        index: action.index,
        name: action.name,
      };

    case 'START_PREVIEW_JPG':
      return {
        ...state,
        ...action.info,
      };

    case 'STOP_PREVIEW':
      return null;

    default:
      return state;
  }
};

export default reducer;
