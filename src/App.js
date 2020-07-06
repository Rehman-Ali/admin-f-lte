import React from 'react';
import Routes from './routing/Routes';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
function App() {
  return (
    <Provider store={store}>

    <Router>
    {/* <Layout> */}

    <Route component={Routes} />

    {/* </Layout> */}
  </Router>
  </Provider>
  );
}

export default App;
