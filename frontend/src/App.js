import React from 'react'
import Routing from './Routing/Routing'
import store from './Store/Store'
import { Provider } from 'react-redux'
import './responsive.css'
import "@stripe/stripe-js"
import { ToastContainer } from 'react-toastify'

function App() {

  store.subscribe(() => {
    localStorage.setItem('reduxStore', JSON.stringify(store.getState()))
  })

  return (
    <>
      <Provider store={store}>
        <Routing />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          // hideProgressBar
          newestOnTop
          closeOnClick
          draggable
          pauseOnHover={true} />
      </Provider>
    </>
  );
}

export default App;
