import React from 'react';
import Routes from './routes';

import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <div>
      <Provider store={store}>
        <Routes/>
      </Provider>
    </div>
  );
}

export default App;
