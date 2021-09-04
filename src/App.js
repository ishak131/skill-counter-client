import { BrowserRouter } from 'react-router-dom';
import './App.css';
import HandleAuthentication from './HandleAuthentication';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducers from './Redux/reducers/index'
import ViewAlert from './components/ViewAlert';



// STORE

const store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);




function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <ViewAlert />
          <HandleAuthentication />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;