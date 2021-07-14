import { BrowserRouter } from 'react-router-dom';
import './App.css';
import HandleAuthentication from './HandleAuthentication';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducers from './Redux/reducers/index'
require('dotenv/config');
console.log(process.env.TOKEN_NAME);
console.log(process.env);
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
          <HandleAuthentication />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
