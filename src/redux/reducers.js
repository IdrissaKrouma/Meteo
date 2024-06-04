import { combineReducers } from 'redux';

const initialInputState = {
  inputValue: '',
};

const initialColorState = {
  nativeColor: 'blue',
};

const inputReducer = (state = initialInputState, action) => {
  switch (action.type) {
    case 'SET_INPUT_VALUE':
      return { ...state, inputValue: action.payload };
    default:
      return state;
  }
};

const colorReducer = (state = initialColorState, action) => {
  switch (action.type) {
    case 'SET_NATIVE_COLOR':
      return { ...state, nativeColor: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  input: inputReducer,
  color: colorReducer,
});

export default rootReducer;
