import Login from '../Login/Login';
import Notification from '../Notification/Notification'
import Navigationbar from '../../components/Navigationbar/Navigationbar'
import Home from '../Home/Home'
import Services from '../Services/Services'
import Orders from '../Orders/Orders'
import { Provider } from 'react-redux';
import getStore from '../../state/store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Register from '../Register/Register';
import OrderCreation from '../OrderCreation/OrderCreation';

function App() {

  return (
    <Provider store={getStore()}>
      <Navigationbar/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/services">
            <Services/>
          </Route>
          <Route exact path="/order_creation">
            <OrderCreation/>
          </Route>
          <Route exact path="/orders">
            <Orders/>
          </Route>
        </Switch>
      </Router>
      <Notification/>
    </Provider>
  );
}

export default App;
