import React from 'react';
import { useDispatch } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import style from './Auth.module.css';
import { login as loginActions } from '../../store/actions/auth';
import { actions as authActions } from '../../store/slices/auth';
import useAuth from '../../store/hooks/auth';

const Auth: React.FC = () => {
  const dispatch = useDispatch();

  const { isLoading, errorMessage, studentName } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target) {
      dispatch(
        authActions.updateInputActions({
          studentName: e.target.value,
        }),
      );
    }
  };

  const handleClick = async () => {
    await dispatch(loginActions(studentName));
  };

  return (
    <div className={style.container}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={style.student}>
            <h4 className={style.studentLabel}>Student Name:</h4>
            <DebounceInput
              id="studentNameInput"
              className={style.studentInput}
              onChange={handleChange}
              debounceTimeout={500}
            />
          </div>
          {errorMessage.length > 0 && (
            <p id="errorMessage" className={style.errorMessage}>{errorMessage}</p>
          )}
          <div>
            <button id="loginButton" type="button" onClick={handleClick}>
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Auth;
