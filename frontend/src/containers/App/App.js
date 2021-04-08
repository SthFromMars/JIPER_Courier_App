import HelloApp from '../HelloApp/HelloApp';
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
          <Route path="/">
            <HelloApp />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
