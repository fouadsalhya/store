import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'

import Navbar from './navbar/Navbar';
import Home from './home/Home';
import Cart from './cart/Cart';
import Signup from './signup/Signup';
import Signin from './signin/Signin'
import Dashbord from './Dashbord/Dashbord';
import AdminDashbord from './Dashbord/AdminDashbord';
import PrivateRoute from './user/PrivateRoute';
import AdminRoute from './user/AdminRoute';
import Detail from './detail/Detail';
const  App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <PrivateRoute path='/cart' exact component={Cart} />
          <Route path='/detail/:id' exact component={Detail} />
          <PrivateRoute path='/dashbord' exact component={Dashbord} />
          <AdminRoute path='/admin/dashbord' exact component={AdminDashbord} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/signin' exact component={Signin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
