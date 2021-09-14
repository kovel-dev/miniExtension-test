import React from 'react';
import { Provider } from 'react-redux';
import ME from '../ME';
import store from '../../store';
import AuthProvider from '../../components/Auth/AuthProvider';

const App: React.FC = () => (
  <Provider store={store}>
    <AuthProvider>
      <ME />
    </AuthProvider>
  </Provider>
);

export default App;
