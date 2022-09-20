import React from 'react'
import Routing from './Routing/Routing'
import store from './Store/Store'
import { Provider } from 'react-redux'
import './responsive.css'
import "@stripe/stripe-js"

function App() {

  store.subscribe(() => {
    localStorage.setItem('reduxStore', JSON.stringify(store.getState()))
  })

  return (
    <>
      <Provider store={store}>
        <Routing />
      </Provider>
    </>
  );
}

export default App;
