import { useReducer } from 'react';

type InputState = {
  value: string;
  isTouched: boolean;
};

type InputAction = {
  type: string;
  value?: string;
};

type InputValidator = (value: string) => boolean;

const initialInputState: InputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (
  state: InputState,
  action: InputAction
): InputState => {
  if (action.type === 'INPUT') {
    return { value: action.value || '', isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value };
  }
  return state;
};

const useInput = (validateValue: InputValidator) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'INPUT', value: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  return {
    value: inputState.value,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
