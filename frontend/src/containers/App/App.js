import HelloApp from '../HelloApp/HelloApp';
import Login from '../Login/Login';
import Notification from '../Notification/Notification'
import {Provider} from 'react-redux';
import getStore from '../../state/store';
import Container from 'react-bootstrap/Container'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Provider store={getStore()}>
      <Container>
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
        <Notification/>
      </Container>
    </Provider>
  );
}

export default App;
