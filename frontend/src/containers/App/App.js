import Login from '../Login/Login';
import Notification from '../Notification/Notification'
import Navigationbar from '../../components/Navigationbar/Navigationbar'
import Home from '../Home/Home'
import Services from '../Services/Services'
import Orders from '../Orders/Orders'
import Profile from '../Profile/Profile'
import { Provider } from 'react-redux';
import getStore from '../../state/store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Register from '../Register/Register';
import OrderCreation from '../OrderCreation/OrderCreation';
import PrivateRoute from '../Routes/PrivateRoute';
import PublicRoute from '../Routes/PublicRoute';

function App() {

  return (
    <Provider store={getStore()}>
      <Navigationbar/>
      <Router>
        <Switch>
          <PublicRoute exact path="/">
            <Login/>
          </PublicRoute>
          <PublicRoute exact path="/register">
            <Register/>
          </PublicRoute>
          <PrivateRoute exact path="/home">
            <Home/>
          </PrivateRoute>
          <PrivateRoute exact path="/services">
            <Services/>
          </PrivateRoute>
          <PrivateRoute exact path="/order_creation">
            <OrderCreation/>
          </PrivateRoute>
          <PrivateRoute exact path="/orders">
            <Orders/>
          </PrivateRoute>
          <PrivateRoute exact path="/profile">
            <Profile/>
          </PrivateRoute>
        </Switch>
      </Router>
      <Notification/>
    </Provider>
  );
}

export default App;
