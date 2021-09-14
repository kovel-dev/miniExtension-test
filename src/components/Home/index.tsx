import * as React from 'react';
import { useDispatch } from 'react-redux';
import style from './Home.module.css';
import { logout as logoutActions } from '../../store/actions/auth';
import { Auth } from '../../utils/resources/auth';
import useAuth from '../../store/hooks/auth';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { errorMessage, user, isLoading } = useAuth();

  const handleClick = async () => {
    await dispatch(logoutActions());
  };

  return (
    <div className={style.home}>
      <button
        type="button"
        className={style.logoutButton}
        onClick={handleClick}
      >
        Logout
      </button>
      <div className={style.container}>
        {isLoading && <p>Loading...</p>}
        {!isLoading && (errorMessage.length > 0 ? (
          <p className={style.errorMessage}>{errorMessage}</p>
        ) : (
          user.map((record: Auth) => (
            <div key={record.id} style={{ width: '28rem' }} className={style.card}>
              <div>
                <p id="classLabel" className={style.classTitle}>Name</p>
                <p>{record.name}</p>
                <p id="namesLabel" className={style.studentsTitle}>Students</p>
                <p>{record.studentName && record.studentName.join(', ')}</p>
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default Home;
