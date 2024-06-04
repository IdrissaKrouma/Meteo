const setInputValue = (inputValue) => ({
  type: 'SET_INPUT_VALUE',
  payload: inputValue,
});

const setNativeColor = (nativeColor) => ({
  type: 'SET_NATIVE_COLOR',
  payload: nativeColor,
});

export {setInputValue,setNativeColor};

