import Login from '../Login/Login';
import Notification from '../Notification/Notification'
import Services from '../Services/Services'
import {Provider} from 'react-redux';
import getStore from '../../state/store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Register from '../Register/Register';

function App() {
  return (
    <Provider store={getStore()}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/services">
            <Services/>
          </Route>
        </Switch>
      </Router>
      <Notification/>
    </Provider>
  );
}

export default App;
