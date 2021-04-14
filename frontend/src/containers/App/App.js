import HelloApp from '../HelloApp/HelloApp';
import Login from '../Login/Login';
import {Provider} from 'react-redux';
import getStore from '../../state/store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Provider store={getStore()}>
      <Router>
        <Switch>
          <Route exact path="/">
            <HelloApp/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
